/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'blue-dashed-bg': "url('/img/blue-dashed-bg.svg')",
			},
		},
	},
	plugins: [],
};
