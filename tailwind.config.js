/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linen: {
          light: '#FDFBF7',
          DEFAULT: '#FAF6F0',
          dark: '#F0EAE1',
        },
        charcoal: {
          DEFAULT: '#222222',
          light: '#333333',
          dark: '#111111',
        },
        indigo: {
          bbl: '#1B2A4A',
          deep: '#1E1B4B',
          light: '#2E3E61',
        },
        slate: {
          steel: '#4A6B82',
          muted: '#627D98',
        },
        earth: {
          light: '#5C4331',
          DEFAULT: '#3F2A1D',
          dark: '#2E1E12',
          ochre: '#8B5A2B',
        },
        olive: {
          light: '#6E8259',
          DEFAULT: '#4D5D3B',
          dark: '#1E4D2B',
        },
        amber: {
          gold: '#FAB818',
        }
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}