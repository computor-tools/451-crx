import { Modal } from '@/components/ui';
import { formatQubicTx } from '@/utils/units';
import { Show, createMemo, mergeProps } from 'solid-js';
import TxStatusBadge from './TxStatusBadge';

const TxDetailItem = (props) => {
    const displayValue = createMemo(() => {
        if (props.value.length > 56 && props.sliceValue) {
            return [props.value.slice(0, 56), <br />, props.value.slice(56)];
        }
        return props.value;
    });

    return (
        <li class="flex justify-between gap-4 items-baseline">
            <span class="text-zinc-700 text-sm">{props.label}:</span>
            <span class="text-xs font-mono text-zinc-400 break-words max-w-[28rem]">{displayValue()}</span>
        </li>
    );
};

export default function TxDetailsModal(_props) {
    const props = mergeProps(
        {
            digest: '',
            tick: '',
            amount: '',
            sourceId: '',
            destinationId: '',
            signature: '',
            executedContractIndex: '',
            executed: undefined,
            isOpen: false,
        },
        _props
    );

    return (
        <Modal isOpen={props.isOpen}>
            <Modal.Header onClose={() => props.onClose(false)}>
                <div class="grid mx-auto place-items-center pt-10 gap-4">
                    <Show when={props.isOpen}>
                        <h3 class="flex self-center mx-auto text-4xl">{formatQubicTx(props.amount, props.txType)}</h3>
                    </Show>
                    <TxStatusBadge executed={props.executed} txTick={props.tick} />

                    <div>
                        <div class="text-xxs font-medium font-mono text-center space-x-1">
                            <span class="text-zinc-700">Tick:</span>
                            <span class="text-zinc-400">{props.tick}</span>
                        </div>
                        {/* TODO: Add correct timestamp */}
                        {/* <span class="text-xxs text-zinc-400 mt-1">{new Date().toLocaleString()}</span> */}
                    </div>
                </div>
            </Modal.Header>
            <hr class="mx-10" />
            <Modal.Body class="px-10">
                <ul class="grid gap-8 p-2">
                    <TxDetailItem label="Source" value={props.sourceId} />
                    <TxDetailItem label="Destination" value={props.destinationId} />
                    <TxDetailItem label="Contract Index" value={props.executedContractIndex} />
                    <TxDetailItem label="Input" value="0" />
                    <TxDetailItem label="Digest" value={props.digest} />
                    <TxDetailItem label="Signature" value={props.signature} sliceValue />
                </ul>
            </Modal.Body>
            <Modal.Footer />
        </Modal>
    );
}
