/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens:{
        'custom': '900px',

      },
    },
  },
  plugins: [],
}