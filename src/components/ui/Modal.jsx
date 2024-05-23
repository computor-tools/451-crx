import { CloseIcon } from '@/assets/icons';
import { Show, onCleanup, onMount } from 'solid-js';
import { Portal } from 'solid-js/web';
import { twMerge } from 'tailwind-merge';

function ModalOverlayWrapper(props) {
    onMount(() => {
        document.getElementById('root').classList.add('overflow-hidden');
    });

    onCleanup(() => {
        document.getElementById('root').classList.remove('overflow-hidden');
    });

    return (
        <>
            <div class="fixed inset-0 z-40 bg-black opacity-50" />

            <div class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
                <div class="relative my-6 mx-auto w-auto">
                    {/* content */}
                    <section
                        role="dialog"
                        class="relative flex w-full min-w-[400px] flex-col rounded-xl border-0 bg-white dark:bg-surface-container-lowest-container-lowest shadow-lg outline-none focus:outline-none"
                    >
                        {props.children}
                    </section>
                </div>
            </div>
        </>
    );
}

function Modal(props) {
    return (
        <Show when={props.isOpen}>
            <Portal mount={document.getElementById('root')}>
                <ModalOverlayWrapper>{props.children}</ModalOverlayWrapper>
            </Portal>
        </Show>
    );
}

Modal.Header = function (props) {
    return (
        <div class={twMerge('flex items-start rounded-t p-5 relative', props.border && 'border-b border-solid border-slate-200', props.class)}>
            {props.children}
            {props.onClose && (
                <button type="button" class="absolute top-4 right-4 h-8 w-8 text-black opacity-50" onClick={props.onClose}>
                    <CloseIcon class="w-6 h-6 dark:text-white" />
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
