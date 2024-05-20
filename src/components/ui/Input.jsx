import { ExclamationCircleIcon } from '@/assets/icons';
import { mergeProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

const baseClassNames =
    'flex w-full rounded-md border border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

const sizeClasses = {
    small: 'py-1.5 text-sm',
    medium: 'py-1.75 text-base',
    large: 'py-3 text-lg',
};

const colorVariantClasses = {
    primary: {
        outlined: 'text-gray-900 border-primary focus:ring-primary focus:border-primary bg-transparent dark:text-white dark:focus:border-zinc-600',
        standard: 'text-gray-900 bg-gray-100 border-none focus:ring-primary border-b-primary dark:text-white dark:border-zinc-700',
    },
    secondary: {
        outlined: 'text-gray-800 bg-transparent focus:ring-black border-black focus:border-black dark:text-white dark:border-zinc-700 dark:focus:border-zinc-400',
        standard: 'text-gray-800 bg-gray-100 border-none focus:ring-black border-b-black dark:text-white',
    },
    tertiary: {
        outlined: 'text-gray-400 bg-transparent focus:ring-white focus:border-white dark:text-white',
        standard: 'text-gray-400 bg-gray-100 border-none focus:ring-white border-b-secondary dark:text-white',
    },
};

/**
 * Input component props documentation
 * @param {Object} _props - Component props
 * @param {string} [_props.type='text'] - The HTML input type (e.g., 'text', 'password').
 * @param {string} [_props.placeholder=''] - Placeholder text for the input.
 * @param {string} [_props.defaultValue=''] - Default value for the input.
 * @param {string} [_props.class=''] - Additional CSS classes for custom styling.
 * @param {string} [_props.size='medium'] - Size of the input ('small', 'medium', 'large').
 * @param {string} [_props.color='primary'] - Color theme of the input ('primary', 'secondary', 'tertiary').
 * @param {string} [_props.variant='outlined'] - Visual style variant of the input ('outlined', 'standard').
 * @param {string} [_props.errorMessage=''] - Error message to display when the input is in an error state.
 * @param {Function} [_props.icon=ExclamationCircleIcon] - Icon to display in case of an error.
 * @param {string} [_props.label] - Optional label text for the input.
 * @param {string} [_props.id] - Optional id attribute for the input and label.
 * @param {string} [_props.name] - Optional name attribute for the input.
 */
export default function Input(_props) {
    const props = mergeProps(
        {
            type: 'text',
            placeholder: '',
            value: '',
            class: '',
            size: 'medium',
            color: 'primary',
            variant: 'outlined',
            errorMessage: '',
            icon: ExclamationCircleIcon,
            disabled: false,
            onInput: () => {},
            onChange: () => {},
        },
        _props
    );

    const IconComponent = () => props.icon;

    const getInputClassNames = () => twMerge(baseClassNames, sizeClasses[props.size], colorVariantClasses[props.color][props.variant], props.class);

    return (
        <div>
            {props.label && (
                <label
                    for={props.id}
                    class={`block text-sm font-medium leading-6 mb-1 ${props.color === 'primary' ? 'text-gray-400 dark:text-gray-200' : 'text-zinc-900 dark:text-zinc-400'}`}
                >
                    {props.label}
                </label>
            )}
            <div class="relative rounded-md shadow-sm">
                <input
                    type={props.type}
                    name={props.name}
                    id={props.id}
                    class={getInputClassNames()}
                    placeholder={props.placeholder}
                    value={props.value}
                    aria-invalid={!!props.errorMessage}
                    aria-describedby={props.errorMessage ? `${props.id}-error` : undefined}
                    disabled={props.disabled}
                    onInput={(...args) => props.onInput(...args)}
                    onChange={(...args) => props.onChange(...args)}
                />
                {props.errorMessage && (
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {props.icon && <IconComponent class="h-5 w-5 text-red-500" aria-hidden="true" />}
                    </div>
                )}
            </div>
            {props.errorMessage && (
                <p class="mt-2 text-sm text-red-600" id={`${props.id}-error`}>
                    {props.errorMessage}
                </p>
            )}
        </div>
    );
}
