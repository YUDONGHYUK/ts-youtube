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
  plugins: [require('@tailwindcss/line-clamp')],
  mode: 'jit',
};
