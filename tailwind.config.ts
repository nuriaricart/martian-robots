import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-brown': {
          100: '#efe8da',
          200: '#e3d8c2',
          300: '#a99d85',
          400: '#654910'
        },
        'brand-red': {
          200: '#d9b1b1',
          300: '#b57777'
        },
        'brand-green': {
          200: '#9ad39a'
        }
      },
    },
  },
  plugins: [],
} satisfies Config

