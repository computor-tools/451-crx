import { createSignal, Show } from 'solid-js';

export default function Tooltip(props) {
    const [show, setShow] = createSignal(false);

    const shouldShowTooltip = () => props.show ?? show();

    return (
        <div class="relative inline-block">
            <div class="self-end" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                {props.children}
            </div>
            <Show when={shouldShowTooltip()}>
                <div class="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform">
                    <div class="whitespace-nowrap rounded-lg bg-gray-700 px-2 py-1 text-sm text-white">{props.content}</div>
                    <svg class="absolute left-1/2 top-full h-3 w-full -translate-x-1/2 transform text-gray-700" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
                        <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
                    </svg>
                </div>
            </Show>
        </div>
    );
}
