import { mergeProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

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
				<span>94|12,641,572</span>
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
