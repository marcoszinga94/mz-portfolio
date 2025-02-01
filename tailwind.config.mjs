/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		animation: {
			meteor: 'meteor linear infinite',
			pulse: 'pulse 1s ease-in-out infinite',
			bounce: 'bounce 1s ease-in-out infinite',
		},
		keyframes: {
			meteor: {
				'0%': {
					opacity: '0',
					transform: 'translateX(-100%) translateY(-50%)'
				},
				'10%': { opacity: '1' },
				'90%': { opacity: '1' },
				'100%': {
					opacity: '0',
					transform: 'translateX(200vw) translateY(100vh)'
				}
			},
			pulse: {
				'0%, 100%': { opacity: '0.4' },
				'50%': { opacity: '0.8' },
			},
			bounce: {
				'0%, 100%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-20px)' },
			},
		},
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
