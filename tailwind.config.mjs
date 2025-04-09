/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		animation: {
			pulse: 'pulse 1.5s ease-in-out infinite',
		},
		keyframes: {
			pulse: {
				'0%, 100%': { opacity: '0.4' },
				'50%': { opacity: '0.8' },
			}
		},
		extend: {
			colors: {
				//ROJOS
				acento: '#D70000', // Thunderbird
				medio: '#FF5959', // Carnation
				claro: '#FFF0F0', // Fair pink

				//NEGROS
				oscuro: '#121212', // Negro

				//AZULADOS
				fondo: "#31415B", // Rhino
			},
		},
	},
	plugins: [],
}
