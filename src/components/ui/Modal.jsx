import { CloseIcon } from '@/assets/icons';
import { Show, onCleanup, onMount } from 'solid-js';
import { twMerge } from 'tailwind-merge';

function Modal(props) {
    onMount(() => {
        if (props.isOpen) {
            document.body.style.overflow = 'hidden';
        }
    });

    onCleanup(() => {
        document.body.style.overflow = 'auto';
    });

    return (
        <Show when={props.isOpen}>
            <div class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden">
                <div class="relative my-6 mx-auto w-auto">
                    {/* content */}
                    <section role="dialog" class="relative flex w-full min-w-[400px] flex-col rounded-xl border-0 bg-white shadow-lg outline-none focus:outline-none">
                        {props.children}
                    </section>
                </div>
            </div>
            <div class="fixed inset-0 z-40 bg-black opacity-25" />
        </Show>
    );
}

Modal.Header = function (props) {
    return (
        <div class={twMerge('flex items-start rounded-t p-5 relative', props.border && 'border-b border-solid border-slate-200', props.class)}>
            {props.children}
            {props.onClose && (
                <button type="button" class="absolute top-4 right-4 h-8 w-8 text-black opacity-50" onClick={props.onClose}>
                    <CloseIcon />
                </button>
            )}
        </div>
    );
};

Modal.Body = function (props) {
    return <div class={twMerge('relative my-4 flex-auto p-6 text-lg leading-relaxed text-slate-500', props.class)}>{props.children}</div>;
};

Modal.Footer = function (props) {
    return <div class={twMerge('p-4', props.border && 'border-t border-gray-200', props.class)}>{props.children}</div>;
};

export default Modal;
