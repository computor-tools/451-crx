import { CONTRACT_DESCRIPTIONS } from '@/constants';
import { Match, Show, Switch } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import QusTxCard from './QusTxCard';
import ScIpoBidCard from './ScIpoBidCard';

import entity from '@/signals/entity';

export default function TxInfo(props) {
    return (
        <Show when={entity()?.outgoingTransaction && !entity()?.outgoingTransaction.executed}>
            <div class={twMerge('space-y-3 px-6 py-5 border-y-2 border-warning w-full  bg-warning/20 mt-10 -mb-10', props.class)}>
                <div class="space-y-5">
                    <Switch>
                        <Match when={entity().outgoingTransaction.executedContractIndex === 0}>
                            {/* Qu transfer */}
                            <QusTxCard {...entity().outgoingTransaction} />
                        </Match>

                        <Match when={entity().outgoingTransaction.executedContractIndex > 0}>
                            <Switch>
                                <Match when={entity().outgoingTransaction.contractIPO_BidAmount}>
                                    {/* SC IPO bid */}
                                    <ScIpoBidCard />
                                </Match>

                                <Match when={!entity().outgoingTransaction.contractIPO_BidAmount}>
                                    {/* SC execution */}
                                    <Switch>
                                        <Match when={entity().outgoingTransaction.executedContractIndex === CONTRACT_DESCRIPTIONS[1].index}>{/* Qx case */}</Match>

                                        <Match
                                            when={
                                                entity().outgoingTransaction.executedContractIndex > CONTRACT_DESCRIPTIONS[1].index &&
                                                entity().outgoingTransaction.executedContractIndex <= CONTRACT_DESCRIPTIONS[CONTRACT_DESCRIPTIONS.length - 1].index
                                            }
                                        >
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
