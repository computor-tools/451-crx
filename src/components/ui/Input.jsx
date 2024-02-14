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
		outlined:
			'text-gray-900 border-primary focus:ring-primary focus:border-primary bg-transparent',
		standard:
			'text-gray-900 bg-gray-100 border-none focus:ring-primary border-b-primary',
	},
	secondary: {
		outlined: 'text-gray-400 bg-transparent',
		standard:
			'text-gray-400 bg-gray-100 border-none focus:ring-secondary border-b-secondary',
	},
};

export default function Input(_props) {
	const props = mergeProps(
		{
			type: 'text',
			placeholder: '',
			defaultValue: '',
			class: '',
			size: 'medium',
			color: 'primary',
			variant: 'outlined',
			errorMessage: '',
			icon: ExclamationCircleIcon,
		},
		_props
	);

	const IconComponent = () => props.icon;

	const getInputClassNames = () =>
		twMerge(
			baseClassNames,
			sizeClasses[props.size],
			colorVariantClasses[props.color][props.variant],
			props.class
		);

	return (
		<div>
			{props.label && (
				<label
					for={props.id}
					class="block text-sm font-medium leading-6 text-gray-400 mb-1"
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
					defaultValue={props.defaultValue}
					aria-invalid={!!props.errorMessage}
					aria-describedby={
						props.errorMessage ? `${props.id}-error` : undefined
					}
				/>
				{props.errorMessage && (
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						{props.icon && (
							<IconComponent
								class="h-5 w-5 text-red-500"
								aria-hidden="true"
							/>
						)}
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
