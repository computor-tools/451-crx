import { ArrowDownLeftIcon, ArrowUpRightIcon } from '@/assets/icons';
import { TxStatusBadge } from '@/components';
import { formatQubicTx } from '@/utils/units';
import { createMemo, mergeProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

import entity from '@/signals/entity';

export default function TxItem(_props) {
    const props = mergeProps(
        {
            digest: '',
            tick: '',
            amount: '',
            sourceId: '',
            destinationId: '',
            executed: undefined,
            class: '',
        },
        _props
    );

    const getTxType = createMemo(() => (props.sourceId === entity()?.id ? 'Sent' : 'Received'));

    return (
        <li
            class={twMerge('space-y-3 space-x-3 px-6 py-6 border-t hover:cursor-pointer dark:border-zinc-700 hover:bg-gray-100/30 dark:hover:bg-gray-300/20', props.class)}
            onClick={() => props.onShowTxDetails(props.digest, getTxType())}
        >
            <div class="flex justify-between items-start">
                <div class="flex gap-3 items-start">
                    {props.sourceId === entity()?.id ? <ArrowUpRightIcon class="w-8 h-8 text-red-500" stroke-width={2} /> : <ArrowDownLeftIcon class="w-8 h-8 text-emerald-500" />}
                    <div class="grid gap-1">
                        <span class="text-2xl dark:text-gray-100">{formatQubicTx(props.amount, getTxType())}</span>
                        {/* TODO: Put correct timestamp once it's implemented on tx*/}
                        {/* <span class="text-xxs text-zinc-400 mt-1">{new Date().toLocaleString()}</span> */}
                        <div>
                            <span class="font-light text-xs dark:text-white">{props.sourceId === entity()?.id ? 'Sent to: ' : 'Received from: '}</span>
                            <span class="text-[11px] text-zinc-400 font-mono">{props.sourceId === entity()?.id ? props.destinationId : props.sourceId}</span>
                        </div>
                    </div>
                </div>

                <div class="px-4 grid gap-3 py-1 place-items-end">
                    <TxStatusBadge executed={props.executed} txTick={props.tick} />
                    <span class="space-x-1 text-zinc-400 text-xxs font-mono">Tick: {props.tick}</span>
                </div>
            </div>
        </li>
    );
}
