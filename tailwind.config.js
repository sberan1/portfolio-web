/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				light: '#f5f5f5', // Light theme background color
				dark: '#1f2937' // Dark theme background color
			}
		}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#38bdf8',
					secondary: '#7dd3fc',
					accent: '#2dd4bf',
					neutral: '#e5e7eb',
					'base-100': '#1f2937',
					info: '#c084fc',
					success: '#22c55e',
					warning: '#FF9529',
					error: '#dc2626'
				}
			},
			'retro'
		]
	},
	plugins: [require('daisyui')]
};
