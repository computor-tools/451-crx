import { mergeProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

import { createSignal } from 'solid-js';


const [broadcastedComputors, setBroadcastedComputors] = createSignal({ epoch: 0 });
const [tick, setTick] = createSignal({ tick: 0 });

const appendTickAndEpoch = function (epoch, tick) {
	return epoch === 0 ? '' : `${epoch}${tick === 0 ? '' : `|${new Intl.NumberFormat().format(tick)}`}`;
};

navigator.serviceWorker.addEventListener('message', (event) => {
	console.log(`The service worker sent me a message: ${event.data}`);

	switch (event.data.command) {
		case 'EPOCH':
			setBroadcastedComputors((current) => current.epoch < event.data.broadcastedComputors.epoch ? event.data.broadcastedComputors : current);
			break;
		case 'TICK':
			setTick((current) => current.tick < event.data.tick.tick ? event.data.tick : current);
			break;
	}
 });

navigator.serviceWorker.ready.then((registration) => registration.active.postMessage({
	command: 'INIT',
}));


const statusClassNames = {
	Disconnected: 'text-rose-400 bg-rose-400/10',
	Syncing: 'text-orange-400 bg-orange-400/10',
	Synced: 'text-emerald-400 bg-emerald-400/10',
};

export default function ConnectionStatus(_props) {
	const props = mergeProps(
		{
			status: 'Disconnected',
		},
		_props
	);

	return (
		<div class="flex items-center justify-end gap-2">
			<div class="text-xxs grid place-items-end">
				<span>3/4 peers</span>
				<span>{appendTickAndEpoch(broadcastedComputors().epoch, tick().tick)}</span>
			</div>
			<div
				class={twMerge(
					statusClassNames[props.status],
					'flex-none rounded-full p-1'
				)}
			>
				<div class="h-1.5 w-1.5 rounded-full bg-current" />
			</div>
		</div>
	);
}
