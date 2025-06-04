/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: '320px' },
      },
      margin: {
        '5vh': '5vh',
      },
      minHeight: {
        90: '90vh',
      },
      textColor: {
        primary: '#CDD6E2',
      },
      backgroundColor: {
        primary: '#0D1117',
        darker: '#161B22',
      },
      fontFamily: {
        primary: ['source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New'],
        righteous: ['Righteous', 'cursive'],
      },
    },
  },
  plugins: [],
}