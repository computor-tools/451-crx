import { children, mergeProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

const sizeClasses = {
    'x-small': 'px-2 py-1 text-xs',
    small: 'px-2 py-1.5 text-sm',
    medium: 'px-2 py-1.5 text-base',
    large: 'px-2.5 py-1.5 text-lg',
};

const colorVariantClasses = {
    green: {
        filled: 'text-white bg-emerald-500 border-emerald-500',
        outlined: 'text-emerald-500 border-emerald-500 bg-transparent ring-emerald-500',
        text: 'text-emerald-500 bg-transparent border-transparent',
    },
    success: { filled: 'bg-emerald-500/20 border-emerald-500 text-emerald-500' },
    warning: { filled: 'bg-warning/20 border-warning text-warning' },
    error: { filled: 'bg-error/20 border-error text-error' },
};

export default function Badge(_props) {
    const props = mergeProps(
        {
            class: '',
            size: 'medium',
            color: 'green',
            variant: 'filled',
            rounded: false,
            children,
        },
        _props
    );

    const getBadgeClassNames = () =>
        twMerge(
            'w-fit inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800',
            sizeClasses[props.size],
            colorVariantClasses[props.color][props.variant],
            props.rounded && 'rounded-full',
            props.class
        );

    return <span class={getBadgeClassNames()}>{props.children}</span>;
}
