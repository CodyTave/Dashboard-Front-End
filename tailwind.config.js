/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      colors: {
        dark: ['#171717', '#202020', '#949494', '#353535', '#343434'],
        light: ['#F7F1F4', '#F0F0F0'],
        red: ['#C0392B'],
      },
      screens: {
        xs: '360px',
        md: '1100px',
        sm: '710px',
      },
    },
  },
  plugins: [],
};
