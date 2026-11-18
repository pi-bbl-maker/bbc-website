/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#FAF9F6',
          dark: '#0B1F22',
          surface: '#0F2A2E',
        },
        ink: {
          light: '#111827',
          muted: '#4B5563',
          dark: '#F4F1EA',
          darkMuted: '#94A3B8',
        },
        brand: {
          blue: '#003149',
          indigo: '#1B2A4A',
          gold: '#E5B622',
          teal: '#2DD4BF',
        },
        hairline: {
          light: 'rgba(27, 42, 74, 0.12)',
          dark: 'rgba(255, 255, 255, 0.12)',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
        heading: ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [],
}