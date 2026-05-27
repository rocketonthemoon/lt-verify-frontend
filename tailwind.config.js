/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
      colors: {
        charcoal: '#171e19',
        sage: '#b7c6c2',
        yellow: '#ffe17c',
        'dark-gray': '#272727',
      },
    },
  },
  plugins: [],
}
