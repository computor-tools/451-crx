import { mergeProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { Button } from './buttons';

/**
 * FormActions component props documentation
 * @param {Object} _props - Component props
 * @param {string} [_props.class=''] - CSS classes for styling the component.
 * @param {string} [_props.size='medium'] - Size of the buttons.
 * @param {Function} [_props.onCancel=() => {}] - Function to call on cancel action.
 * @param {Function} [_props.onConfirm=() => {}] - Function to call on confirm action.
 * @param {string} [_props.cancelLabel='Cancel'] - Label for the cancel button.
 * @param {string} [_props.confirmLabel='Transfer'] - Label for the confirm button.
 * @param {string} [_props.cancelVariant='outlined'] - Variant for the cancel button.
 * @param {string} [_props.confirmVariant] - Variant for the confirm button.
 * @param {string} [_props.cancelColor='secondary'] - Color for the cancel button.
 * @param {string} [_props.confirmColor='secondary'] - Color for the confirm button.
 * @param {boolean} [_props.showDivider=true] - Whether to show a divider above the buttons.
 * @param {boolean} [_props.isLoadingConfirm=false] - Loading state for the confirm button.
 * @param {boolean} [_props.isLoadingCancel=false] - Loading state for the cancel button.
 * @param {boolean} [_props.disableConfirm=false] - Whether the confirm button is disabled.
 * @param {boolean} [_props.disableCancel=false] - Whether the cancel button is disabled.
 * @param {string} [_props.loadingTextConfirm=''] - Loading text for the confirm button.
 * @param {string} [_props.loadingTextCancel=''] - Loading text for the cancel button.
 */
export default function FormActions(_props) {
    const props = mergeProps(
        {
            class: '',
            size: 'medium',
            showDivider: true,
            onCancel: () => {},
            onConfirm: () => {},
            cancelLabel: 'Cancel',
            confirmLabel: 'Transfer',
            cancelVariant: 'outlined',
            confirmVariant: 'filled',
            cancelColor: 'secondary',
            confirmColor: 'secondary',
        },
        _props
    );

    return (
        <>
            {props.showDivider && <hr class="border-t border-gray-200 my-6 dark:border-zinc-700" />}
            <div class={twMerge('flex justify-end gap-4', props.class)}>
                <Button
                    color={props.cancelColor}
                    variant={props.cancelVariant}
                    size={props.size}
                    onClick={props.onCancel}
                    isLoading={props.isLoadingCancel}
                    loadingText={props.loadingTextCancel}
                    disabled={props.disableCancel}
                >
                    {props.cancelLabel}
                </Button>
                <Button
                    color={props.confirmColor}
                    variant={props.confirmVariant}
                    size={props.size}
                    onClick={props.onConfirm}
                    isLoading={props.isLoadingConfirm}
                    loadingText={props.loadingTextConfirm}
                    disabled={props.disableConfirm}
                    type="submit"
                >
                    {props.confirmLabel}
                </Button>
            </div>
        </>
    );
}
