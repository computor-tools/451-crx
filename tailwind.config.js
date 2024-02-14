import formsPlugin from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				primary: 'Noto Sans, sans-serif',
			},
			colors: {
				// Basic colors
				surface: 'var(--surface)',
				'surface-container-lowest': 'var(--surface-container-lowest)',
				'surface-container-low': 'var(--surface-container-low)',
				'surface-container': 'var(--surface-container)',
				'surface-container-high': 'var(--surface-container-high)',
				'surface-container-highest': 'var(--surface-container-highest)',
				'on-surface': 'var(--on-surface)',
				'on-surface-variant': 'var(--on-surface-variant)',

				// Primary palette
				primary: 'var(--primary)',
				'primary-container': 'var(--primary-container)',
				'on-primary': 'var(--on-primary)',
				'on-primary-container': 'var(--on-primary-container)',

				// Secondary palette
				secondary: 'var(--secondary)',
				'secondary-container': 'var(--secondary-container)',
				'on-secondary': 'var(--on-secondary)',
				'on-secondary-container': 'var(--on-secondary-container)',

				// Tertiary and other colors
				tertiary: 'var(--tertiary)',
				'on-tertiary': 'var(--on-tertiary)',
				amber: 'var(--amber)',
				green: 'var(--green)',

				// Error handling
				error: 'var(--error)',
				'error-container': 'var(--error-container)',
				'on-error': 'var(--on-error)',
				'on-error-container': 'var(--on-error-container)',

				// Outline variants
				outline: 'var(--outline)',
				'outline-variant': 'var(--outline-variant)',
			},
		},
	},
	plugins: [formsPlugin],
};
