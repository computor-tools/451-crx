import { Button } from '@/components/ui/buttons';
import { createSignal, Show, Switch, Match } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { Badge } from '../ui';

import networkStatus from '@/signals/network-status';
import entity from '@/signals/entity';
import { TICK_OFFSET } from '@/signals/constants';

const CONTRACT_DESCRIPTIONS = [
    {
        name: '',
        index: 0,
        constructionEpoch: 0,
        destructionEpoch: 0,
    },
    {
        name: 'Qx',
        index: 1,
        constructionEpoch: 66,
        destructionEpoch: 10000,
    },
    {
        name: 'QTRY',
        index: 2,
        constructionEpoch: 72,
        destructionEpoch: 10000,
    },
    {
        name: 'RANDOM',
        index: 3,
        constructionEpoch: 88,
        destructionEpoch: 10000,
    },
    {
        name: 'QUTIL',
        index: 4,
        constructionEpoch: 97,
        destructionEpoch: 10000,
    },
];

const broadcastChannel = new BroadcastChannel('user-control');

const TxActions = function(props) {
    return (
        <Show when={entity().outgoingTransaction.executed === false} fallback={
            <Show when={entity().outgoingTransaction.executed === undefined}>
                <span>Pending... <Show when={networkStatus.tick()?.tick}>({Math.max(0, entity().outgoingTransaction.tick - networkStatus.tick().tick)} ticks)</Show></span>
            </Show>
        }>
            <div class="flex w-2/4 gap-4">
                <Button disabled={!networkStatus.tick()} size="x-small" color={props.accentColor} onClick={() => {
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
                        navigator.serviceWorker.ready.then(() => navigator.serviceWorker.controller.postMessage({
                            command: 'TRANSACTION',
                            sourceId: entity().id,
                            destinationId: entity().outgoingTransaction.destinationId,
                            amount: entity().outgoingTransaction.amount,
                            tick: networkStatus.tick().tick + TICK_OFFSET,
                        }));
                    }
                }}>
                    {props.retryText}
                </Button>
                <Button size="x-small" color="red" variant="outlined" class="w-2/4" onClick={() => {
                    broadcastChannel.postMessage({
                        command: 'DISCARD_TRANSACTION',
                    });
                }}>
                    Discard
                </Button>
            </div>
        </Show>
    );
};

const TxHead = function (props) {
    const [errorMessage, setErrorMessage] = createSignal('');

    return (
        <div>
            <Show when={errorMessage()}>
                <span>{errorMessage()}</span>
            </Show>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    {props.children}
                </div>

                <TxActions retryText={props.retryText} accentColor={props.accentColor} setErrorMessage={(message) => setErrorMessage(message)} />
            </div>
        </div>
    )
};

export default function TxInfo(props) {
    return (
        <Show when={entity()?.outgoingTransaction && !entity()?.outgoingTransaction.executed}>
            <div class={twMerge('pace-y-3 px-6 py-5 border-y-2 border-orange-300 w-full  bg-[rgba(230,121,0,0.2)] mt-10', props.class)}>
                <div class="space-y-5">

                    <Switch>
                        <Match when={entity().outgoingTransaction.executedContractIndex === 0}>
                            {/* Qu transfer */}
                            <TxHead retryText="Retry transfer" accentColor="green">
                                <span class="text-xxs border p-2 rounded-lg">{entity().outgoingTransaction.destinationId}</span>
                            </TxHead>

                            <div>
                                <span class="text-red-500">-{entity().outgoingTransaction.amount.toLocaleString()} Qus</span>
                            </div>
                        </Match>

                        <Match when={entity().outgoingTransaction.executedContractIndex > 0}>

                            <Switch>
                                <Match when={entity().outgoingTransaction.contractIPO_BidAmount}>
                                    {/* SC IPO bid */}
                                    <TxHead retryText="Retry bid" accentColor="green">
                                        <h2>SC {CONTRACT_DESCRIPTIONS[entity().outgoingTransaction.executedContractIndex].name} ({entity().outgoingTransaction.executedContractIndex})</h2>
                                        <Badge size="x-small">by QUORUM</Badge>
                                    </TxHead>

                                    <div>
                                        <div class="flex">
                                            <table class="w-full text-xs">
                                                <thead>
                                                    <tr>
                                                        <th class="p-2 text-left">Quantity</th>
                                                        <th class="p-2 text-left">Energy</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="border-t">
                                                        <td class="p-2 align-top text-green-500">
                                                            +{entity().outgoingTransaction.contractIPO_BidQuantity.toLocaleString()} {CONTRACT_DESCRIPTIONS[entity().outgoingTransaction.executedContractIndex].name} shares
                                                        </td>
                                                        <td class="p-2 align-top">
                                                            <div class="grid gap-1">
                                                                <span class="text-red-500">-{entity().outgoingTransaction.contractIPO_BidAmount.toLocaleString()} Qus</span>
                                                                <span class="text-xxs -ml-3">
                                                                    {entity().outgoingTransaction.contractIPO_BidPrice.toLocaleString()} Qus / share
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Match>

                                <Match when={!entity().outgoingTransaction.contractIPO_BidAmount}>
                                    {/* SC execution */}
                                    <Switch>
                                        <Match when={entity().outgoingTransaction.executedContractIndex === CONTRACT_DESCRIPTIONS[1].index}>
                                            {/* Qx case */}
                                        </Match>

                                        <Match when={entity().outgoingTransaction.executedContractIndex > CONTRACT_DESCRIPTIONS[1].index && entity().outgoingTransaction.executedContractIndex <= CONTRACT_DESCRIPTIONS[CONTRACT_DESCRIPTIONS.length - 1].index}>
                                            {/* Arbitrary, other than Qx case */}
                                        </Match>
                                    </Switch>
                                </Match>
                            </Switch>
                        </Match>
                    </Switch>
                </div>
            </div>
        </Show>
    );
}
