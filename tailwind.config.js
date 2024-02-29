/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '90vh':'90vh',
        '80vh': '80vh',
        '76vh': '76vh',
        '70vh': '70vh',
        '66vh': '66vh',
      },
      width:{
        '68':'17rem',
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      opacity: ['group-hover'],
      visibility: ['group-hover'],
    }
  },
}

