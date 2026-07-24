/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0F1712',
          900: '#0F1712',
          800: '#16211A',
          700: '#1E2D24',
        },
        moss: {
          50: '#F1F8F3',
          100: '#DFF0E4',
          200: '#BFE1CA',
          300: '#93CBA7',
          400: '#5FAE7E',
          500: '#3B9260',
          600: '#2A7A4C',
          700: '#22623D',
          800: '#1D4E32',
          900: '#17402A',
        },
        clay: {
          400: '#E2A96B',
          500: '#D4903F',
        },
        sand: '#FAF9F6',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,18,0.06), 0 8px 24px -12px rgba(15,23,18,0.15)',
        soft: '0 4px 20px -6px rgba(15,23,18,0.12)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease-out both',
        fadeIn: 'fadeIn 0.3s ease-out both',
      },
    },
  },
  plugins: [],
}
