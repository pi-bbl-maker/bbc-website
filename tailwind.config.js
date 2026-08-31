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
          DEFAULT: '#FAF6F0', // Raw unbleached linen
          dark: '#F0EAE1',
        },
        charcoal: {
          DEFAULT: '#222222',
          light: '#333333',
          dark: '#111111',
        },
        earth: {
          light: '#5C4331',
          DEFAULT: '#3F2A1D', // Deep earth brown
          dark: '#2E1E12',
        },
        olive: {
          light: '#6E8259',
          DEFAULT: '#4D5D3B', // Olive green
          dark: '#3A462C',
        },
        bblindigo: {
          light: '#312E81',
          DEFAULT: '#1E1B4B', // BBL Indigo
          dark: '#120F35',
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
