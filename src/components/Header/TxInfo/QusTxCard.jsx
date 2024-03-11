import { ArrowDownLeftIcon, ArrowUpRightIcon } from '@/assets/icons';
import { formatQubicTx } from '@/utils/units';
import { createMemo, mergeProps } from 'solid-js';
import TxHead from './TxHead';

import entity from '@/signals/entity';

export default function QusTxCard(_props) {
    const props = mergeProps(
        {
            amount: '',
            sourceId: '',
            destinationId: '',
        },
        _props
    );

    const getTxType = createMemo(() => (props.sourceId === entity()?.id ? 'Sent' : 'Received'));

    return (
        <TxHead>
            <div class="space-y-3 space-x-3 py-4">
                <div class="flex justify-between items-start">
                    <div class="flex gap-3 items-start">
                        {props.sourceId === entity()?.id ? (
                            <ArrowUpRightIcon class="w-8 h-8 text-red-500" stroke-width={2} />
                        ) : (
                            <ArrowDownLeftIcon class="w-8 h-8 text-emerald-500" />
                        )}
                        <div class="grid gap-1">
                            <span class="text-2xl">{formatQubicTx(props.amount, getTxType())}</span>
                            {/* TODO: Put correct timestamp once it's implemented on tx*/}
                            {/* <span class="text-xxs text-zinc-400 mt-1">{new Date().toLocaleString()}</span> */}
                            <div>
                                <span class="font-light text-xs">{props.sourceId === entity()?.id ? 'Sent to: ' : 'Received from: '}</span>
                                <span class="text-[11px] text-zinc-400 font-mono">{props.sourceId === entity()?.id ? props.destinationId : props.sourceId}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TxHead>
    );
}
