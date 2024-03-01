import { mergeProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

const statusClassNames = {
    error: 'text-rose-400 bg-rose-400/10',
    warning: 'text-orange-400 bg-orange-400/10',
    success: 'text-emerald-400 bg-emerald-400/10',
};

export default function StatusIndicator(_props) {
    const props = mergeProps(
        {
            status: 'error',
        },
        _props
    );

    return (
        <div class={twMerge(statusClassNames[props.status], 'flex-none rounded-full p-1')}>
            <div class="h-1.5 w-1.5 rounded-full bg-current" />
        </div>
    );
}
