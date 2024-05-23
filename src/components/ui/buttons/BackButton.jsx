import { ArrowLeftIcon } from '@/assets/icons';
import { A } from '@solidjs/router';
import { twMerge } from 'tailwind-merge';

/**
 * BackButton component props documentation
 * @param {Object} props - Component props
 * @param {string} [props.class=''] - Additional CSS classes for custom styling.
 */
export default function BackButton(props) {
	return (
		<A href="/" class={twMerge('absolute left-10 top-16', props.class)}>
			<ArrowLeftIcon class="h-6 w-6 dark:text-white" />
		</A>
	);
}
