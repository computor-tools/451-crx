import { createSignal, createRoot } from 'solid-js';

export default createRoot(function () {
    const [broadcastedComputors,  setBroadcastedComputors] = createSignal();
    const [tick, setTick] = createSignal();

    navigator.serviceWorker.addEventListener('message', (event) => {
        switch (event.data.command) { 
            case 'EPOCH':
                setBroadcastedComputors(event.data.broadcastedComputors);
                break;
            case 'TICK':
                setTick(event.data.tick);
                break;
        }
    });

    navigator.serviceWorker.ready.then(() => navigator.serviceWorker.controller.postMessage({
        command: 'INIT',
    }));

    return {
        broadcastedComputors,
        tick,
    };
});