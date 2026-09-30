/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pine: {
          50: '#eef5f1',
          100: '#d9e9df',
          700: '#285b51',
          800: '#1d4942',
          900: '#143a35'
        },
        citrus: '#edaa48',
        coral: '#dc7957',
        paper: '#f5f7f3',
        ink: '#192b29'
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['DM Serif Display', 'serif']
      },
      boxShadow: {
        lift: '0 24px 60px rgba(13, 37, 34, 0.18)'
      }
    }
  },
  plugins: []
};