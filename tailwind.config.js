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
        '3xl': '2400px',

      },
    },
  },
  plugins: [    
  ],
}