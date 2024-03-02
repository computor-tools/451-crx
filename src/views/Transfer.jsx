import { createEffect, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import { FormActions, Input } from '@/components/ui';
import { BackButton } from '@/components/ui/buttons';

import networkStatus from '@/signals/network-status';
import entity from '@/signals/entity';
import { TICK_OFFSET } from '@/signals/constants';

export default function Transfer() {
	const navigate = useNavigate();

	const [destinationId, setDestinationId] = createSignal('');
	const [amount, setAmount] = createSignal(0n);
	const [executionTickOffset, setExecutionTickOffset] = createSignal(TICK_OFFSET);
	const [executionTick, setExecutionTick] = createSignal(0);
	const [executionTickErrorMessage, setExecutionTickErrorMessage] = createSignal('');
	const [errorMessage, setErrorMessage] = createSignal('');

	createEffect(() => {
		if (networkStatus.tick()?.tick) {
			setExecutionTick(networkStatus.tick().tick + executionTickOffset());
		}
	});

	// TODO: Implement the EnergyTransfer view funcionality
	// This could be trasnfer page and have tabs for different types of transfer (QUs, Assets,...)
	return (
		<section class="grid place-items-center gap-6">
			<BackButton />
			<div class="grid place-items-center gap-2">
				<h1 class="text-2xl">Energy Transfer (QUs)</h1>

				<div class="grid place-items-center gap-1">
					<h2 class="text-xs">Source ID</h2>
					<span class="text-xxs border p-2 rounded-lg">{entity()?.id || ''}</span>
				</div>
			</div>

			<form class="grid gap-6 border-t border-gray-200 pt-10 mt-4" onSubmit={function  (event) {
                event.preventDefault();

				navigator.serviceWorker.addEventListener('message', function redirect(event) {
					if (event.data.command === 'TRANSACTION') {
						if (event.data.transaction) {
							navigate('/', { replace: true });
							navigator.serviceWorker.removeEventListener('message', redirect);
						} else {
							setErrorMessage(event.data.errorMessage);
						}
					}
				});

				console.log({
					sourceId: entity().id,
					destinationId: destinationId(),
					amount: amount(),
					tick: executionTick(),
				});
				// eslint-disable-next-line solid/reactivity
				navigator.serviceWorker.ready.then(() => navigator.serviceWorker.controller.postMessage({
					command: 'TRANSACTION',
					sourceId: entity().id,
					destinationId: destinationId(),
					amount: amount(),
					tick: executionTick(),
				}));
            }}>
				<div>{errorMessage()}</div>
				<Input
					label="Destination ID"
					color="secondary"
					onInput={(event) => {
						setDestinationId(event.target.value);
					}}
				/>
				<div class="grid grid-cols-8 gap-4">
					<div class="col-span-3">
						<Input
							label="Amount (in Qus)"
							color="secondary"
							onInput={(event) => {
								setAmount(BigInt(event.target.value));
							}}
						/>
					</div>
					<div class="col-span-2">
						<Input
							label="Execution offset"
							color="secondary"
							type="number"
							value={executionTickOffset()}
							errorMessage={executionTickErrorMessage()}
							onInput={(event) => {
								if (event.target.value) {
									const offset = parseInt(event.target.value)
									if (offset >= TICK_OFFSET) {
										setExecutionTickOffset(offset);
										setExecutionTickErrorMessage('');
									} else {
										setExecutionTickErrorMessage(`Use at least ${TICK_OFFSET} ticks`);
									}
								}
							}}
						/>
					</div>
					<div class="col-span-3">
						<Input
							disabled={true}
							label="Execution tick"
							color="secondary"
							value={`+ ${executionTickOffset()} = ${executionTick().toLocaleString()}`}
						/>
					</div>
				</div>
				<FormActions />
			</form>
		</section>
	);
}
