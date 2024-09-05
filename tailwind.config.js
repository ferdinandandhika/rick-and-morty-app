/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  theme: {
    extend: {
      colors: {
        'dark-green': '#006400',
        'light-green': '#8FBC8F',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

