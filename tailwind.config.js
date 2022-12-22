/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        brand: '#ff0000',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
  mode: 'jit',
};
