import { ClipboardDocumentIcon } from '@/assets/icons';
import { Show, createSignal } from 'solid-js';
import Tooltip from '../Tooltip';

export default function CopyToClipboardButton(props) {
    const [copied, setCopied] = createSignal(false);
    const [error, setError] = createSignal(null);

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(props.text);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch (err) {
            setError('Failed to copy to clipboard');
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };

    return (
        <div>
            <Tooltip content={copied() ? 'Copied! ✔ ' : 'Copy'} show={copied() || error()}>
                <button class="rounded-full p-2 transition-colors hover:bg-gray-200 text-gray-700" onClick={handleCopyToClipboard}>
                    <ClipboardDocumentIcon />
                </button>
            </Tooltip>
            <Show when={error()}>
                <Tooltip content={error()}>
                    <div class="absolute -bottom-10 left-0 right-0 rounded-lg bg-red-500 py-2 text-center text-white">
                        <span>{error()}</span>
                    </div>
                </Tooltip>
            </Show>
        </div>
    );
}
