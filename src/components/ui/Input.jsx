import { ExclamationCircleIcon } from '@/assets/icons';

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

export default function Input({
	id,
	name,
	label,
	type = 'text',
	placeholder = '',
	defaultValue = '',
	className = '',
	size = 'medium',
	color = 'primary',
	variant = 'outlined',
	errorMessage = '',
	icon: IconComponent = ExclamationCircleIcon,
}) {
	const inputClassNames = `${baseClassNames} ${sizeClasses[size]} ${colorVariantClasses[color][variant]} ${className}`;

	return (
		<div>
			{label && (
				<label
					htmlFor={id}
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					{label}
				</label>
			)}
			<div className="relative mt-2 rounded-md shadow-sm">
				<input
					type={type}
					name={name}
					id={id}
					className={inputClassNames}
					placeholder={placeholder}
					defaultValue={defaultValue}
					aria-invalid={!!errorMessage}
					aria-describedby={errorMessage ? `${id}-error` : undefined}
				/>
				{errorMessage && (
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						{IconComponent && (
							<IconComponent
								className="h-5 w-5 text-red-500"
								aria-hidden="true"
							/>
						)}
					</div>
				)}
			</div>
			{errorMessage && (
				<p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
					{errorMessage}
				</p>
			)}
		</div>
	);
}