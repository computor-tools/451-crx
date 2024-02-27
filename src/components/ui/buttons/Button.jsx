import { children, mergeProps, Show } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import LoadingSpinner from '../LoadingSpinner';

const sizeClasses = {
	'x-small': 'px-2 py-1 text-xs',
	small: 'px-2 py-1.5 text-sm',
	medium: 'px-2 py-1.5 text-base',
	large: 'px-2.5 py-1.5 text-lg',
};

const colorVariantClasses = {
	primary: {
		filled: 'text-white bg-primary border-primary-container focus:ring-primary focus:border-primary hover:opacity-80',
		outlined:
			'text-primary border-primary focus:ring-primary focus:border-primary bg-transparent hover:bg-primary hover:opacity-70 hover:text-white',
		text: 'text-primary focus:ring-primary bg-transparent border-transparent ring-0 hover:bg-primary hover:opacity-70 hover:text-white',
	},
	secondary: {
		filled: 'text-white bg-black border-secondary-container focus:ring-secondary focus:border-secondary hover:opacity-80 focus:ring-zinc-500 focus:border-zinc-500',
		outlined:
			'text-black border-black focus:ring-black focus:border-black bg-transparent ring-black hover:bg-zinc-100',
		text: 'text-black ring-0 bg-transparent border-transparent hover:bg-zinc-100 focus:ring-zinc-500 focus:border-zinc-500',
	},
	tertiary: {
		filled: 'text-black bg-white border-white focus:ring-zinc-500 focus:border-zinc-500 ring-0 hover:bg-zinc-100',
		outlined:
			'text-white border-white focus:ring-zinc-500 focus:border-white bg-transparent ring-white hover:bg-zinc-700',
		text: 'text-white bg-transparent border-transparent hover:bg-zinc-700 ring-0 focus:ring-zinc-500 focus:border-zinc-500',
	},
};

/**
 * Button component props documentation
 * @param {Object} _props - Component props
 * @param {string} [_props.type='button'] - The button type (e.g., 'button', 'submit').
 * @param {string} [_props.class=''] - Additional CSS classes for styling the button.
 * @param {string} [_props.size='medium'] - The size of the button ('x-small', 'small', 'medium', 'large').
 * @param {string} [_props.color='primary'] - The color theme of the button ('primary', 'secondary', 'tertiary').
 * @param {string} [_props.variant='filled'] - The variant of the button ('filled', 'outlined', 'text').
 * @param {Solid.Children} [_props.children] - The children nodes of the button, typically text or icons.
 * @param {boolean} [_props.isLoading=false] - Indicates if the button is in a loading state.
 * @param {string} [_props.loadingText='Loading...'] - Text to display when the button is in a loading state.
 * @param {boolean} [_props.disabled=false] - Whether the button is disabled.
 * @param {Function} [_props.icon] - Optional icon to display inside the button.
 */
export default function Button(_props) {
	const props = mergeProps(
		{
			type: 'button',
			class: '',
			size: 'medium',
			color: 'primary',
			variant: 'filled',
			children,
			isLoading: false,
			loadingText: 'Loading...',
			disabled: false,
		},
		_props
	);
	const IconComponent = () => props.icon;

	const safeChildren = children(() => props.children);

	const getButtonClassNames = () =>
		twMerge(
			'block w-full rounded-md border-0 ring-1 ring-inset disabled:cursor-not-allowed disabled:opacity-50 transition-opacity duration-200',
			sizeClasses[props.size],
			colorVariantClasses[props.color][props.variant],
			props.class
		);

	return (
		<button
			id={props.id}
			type={props.type}
			name={props.name}
			class={getButtonClassNames()}
			placeholder={props.placeholder}
		>
			<Show when={props.isLoading}>
				<div class="flex items-center justify-center gap-2">
					<LoadingSpinner />
					{props.loadingText}
				</div>
			</Show>
			<Show when={!props.isLoading}>
				{props.icon && <IconComponent />}
				{safeChildren()}
			</Show>
		</button>
	);
}
