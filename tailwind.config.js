/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        brand: '#ff0000',
      },
    },
  },
  plugins: [],
  mode: 'jit',
};
