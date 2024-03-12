import { TxStatusBadge } from '@/components';
import { Button } from '@/components/ui/buttons';
import { Show } from 'solid-js';

import { TICK_OFFSET } from '@/signals/constants';
import entity from '@/signals/entity';
import networkStatus from '@/signals/network-status';

const broadcastChannel = new BroadcastChannel('user-control');

export default function TxActions(props) {
    const handleRetryTx = () => {
        if (entity().outgoingTransaction.executed === false) {
            props.setErrorMessage('');

            navigator.serviceWorker.addEventListener('message', function setErrorMessageIfAny(event) {
                if (event.data.command === 'TRANSACTION') {
                    if (!event.data.transaction) {
                        props.setErrorMessage(event.data.errorMessage);
                    } else {
                        navigator.serviceWorker.removeEventListener('message', setErrorMessageIfAny);
                    }
                }
            });

            console.log('retry', {
                sourceId: entity().id,
                destinationId: entity().outgoingTransaction.destinationId,
                amount: entity().outgoingTransaction.amount,
                tick: networkStatus.tick().tick + TICK_OFFSET,
            });
            // eslint-disable-next-line solid/reactivity
            navigator.serviceWorker.ready.then(() =>
                navigator.serviceWorker.controller.postMessage({
                    command: 'TRANSACTION',
                    sourceId: entity().id,
                    destinationId: entity().outgoingTransaction.destinationId,
                    amount: entity().outgoingTransaction.amount,
                    tick: networkStatus.tick().tick + TICK_OFFSET,
                })
            );
        }
    };

    const handleDiscardTx = () => {
        broadcastChannel.postMessage({
            command: 'DISCARD_TRANSACTION',
        });
    };

    return (
        <Show
            when={entity().outgoingTransaction.executed === false}
            fallback={
                <div class="px-4 grid gap-3 py-1 place-items-end">
                    <TxStatusBadge executed={entity().outgoingTransaction.executed} txTick={entity().outgoingTransaction.tick} />
                    <span class="space-x-1 text-zinc-400 text-xxs font-mono">Tick: {entity().outgoingTransaction.tick}</span>
                </div>
            }
        >
            <div class="flex w-2/4 gap-4">
                <Button disabled={!networkStatus.tick()} size="x-small" color={props.accentColor} onClick={handleRetryTx}>
                    {props.retryText}
                </Button>
                <Button size="x-small" color="red" variant="outlined" class="w-2/4" onClick={handleDiscardTx}>
                    Discard
                </Button>
            </div>
        </Show>
    );
}
