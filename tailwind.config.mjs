/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				//ROJOS
				acento: '#D70000', // Thunderbird
				medio: '#FF5959', // Carnation
				claro: '#FFF0F0', // Fair pink

				//NEGROS
				oscuro: '#000000', // Negro

				//AZULADOS
				fondo: "#31415B", // Rhino
			},
		},
	},
	plugins: [],
}
