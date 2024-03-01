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
        filled: 'text-white bg-emerald-500 border-emerald-500 focus:ring-emerald-500 focus:border-emerald-500 ring-0 hover:bg-emerald-600',
        outlined: 'text-emerald-500 border-emerald-500 focus:ring-emerald-500 focus:border-emerald-500 bg-transparent ring-emerald-500 hover:bg-emerald-100',
        text: 'text-emerald-500 bg-transparent border-transparent ring-0 hover:bg-emerald-100 focus:ring-emerald-500 focus:border-emerald-500',
    },
};

export default function Badge(_props) {
    const props = mergeProps(
        {
            class: '',
            size: 'medium',
            color: 'green',
            variant: 'filled',
            children,
        },
        _props
    );

    const getBadgeClassNames = () =>
        twMerge(
            'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800',
            sizeClasses[props.size],
            colorVariantClasses[props.color][props.variant],
            props.class
        );

    return <span class={getBadgeClassNames()}>{props.children}</span>;
}
