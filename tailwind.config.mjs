/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		animation: {
			'pulse': 'pulse 1.5s ease-in-out infinite',
			'float': 'float 6s ease-in-out infinite',
			'gradient': 'gradient 15s ease infinite',
			'typing': 'typing 2s steps(20) infinite alternate, blink .7s infinite',
		},
		keyframes: {
			pulse: {
				'0%, 100%': { opacity: '0.4' },
				'50%': { opacity: '0.8' },
			},
			float: {
				'0%, 100%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-20px)' },
			},
			gradient: {
				'0%': { backgroundPosition: '0% 50%' },
				'50%': { backgroundPosition: '100% 50%' },
				'100%': { backgroundPosition: '0% 50%' },
			},
			typing: {
				'from': { width: '0' },
				'to': { width: '100%' },
			},
			blink: {
				'50%': { borderColor: 'transparent' }
			}
		},
		extend: {
			colors: {
				// Paleta moderna
				acento: '#FF3B3B',      // Rojo más vibrante
				medio: '#FF7676',       // Rosa suave
				claro: '#FFF5F5',      // Blanco cálido
				oscuro: '#0A0A0A',     // Negro profundo
				fondo: '#1A1A2E',      // Azul muy oscuro
				'gray-custom': '#2A2A3E'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			}
		},
	},
	plugins: [],
}
