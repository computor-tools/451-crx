import { CopyToClipboardButton } from '@/components/ui/buttons';
import { createMemo } from 'solid-js';

export default function CopyIdClipboard(props) {
    const parseId = createMemo(() => ({
        id: props.entityId?.slice(0, -4),
        checksum: props.entityId?.slice(-4),
    }));

    return (
        <div class="flex text-xs items-center border rounded-lg pl-2 shadow-xs bg-white dark:bg-surface-container-lowest dark:border-zinc-700">
            <div class="py-2 space-x-2">
                <span class="dark:text-zinc-300">{parseId().id}</span>
                <span class="text-emerald-500"> {parseId().checksum}</span>
            </div>
            <CopyToClipboardButton text={props.entityId} />
        </div>
    );
}
