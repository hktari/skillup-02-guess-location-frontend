/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        patina: {
          50: '#f4f9f7',
          100: '#dbece5',
          200: '#b7d8cb',
          300: '#8cbcad',
          400: '#619b8a',
          500: '#498372',
          600: '#39685c',
          700: '#31544c',
          800: '#2a453e',
          900: '#263b35',
          950: '#12211e',
        },
      },
    },
  },
  plugins: [],
}
