import { createSignal } from 'solid-js';
import { StatusIndicator } from '../ui';

const [broadcastedComputors, setBroadcastedComputors] = createSignal({
    epoch: 0,
});
const [tick, setTick] = createSignal({ tick: 0 });

navigator.serviceWorker.addEventListener('message', (event) => {
    switch (event.data.command) {
        case 'EPOCH':
            setBroadcastedComputors((current) => (current.epoch < event.data.broadcastedComputors.epoch ? event.data.broadcastedComputors : current));
            break;
        case 'TICK':
            setTick((current) => (current.tick < event.data.tick.tick ? event.data.tick : current));
            break;
    }
});

navigator.serviceWorker.ready.then((registration) =>
    registration.active.postMessage({
        command: 'INIT',
    })
);

const appendTickAndEpoch = function (epoch, tick) {
    return epoch === 0 ? '' : `${epoch}${tick === 0 ? '' : `|${new Intl.NumberFormat().format(tick)}`}`;
};

export default function NetworkStatus() {
    return (
        <div class="flex items-center justify-end gap-2">
            <div class="text-xxs grid place-items-end">
                <span>3/4 peers</span>
                <span>{appendTickAndEpoch(broadcastedComputors().epoch, tick().tick)}</span>
            </div>
            <StatusIndicator status="success" />
        </div>
    );
}
