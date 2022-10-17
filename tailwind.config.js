const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'raisin-black': '#1c1c28',
        erin: '#19ff3f',
        'candy-apple-red': '#fe1e04',
        orange: '#ff8400',
        'canary-yellow': '#feed00',
        white: '#ffffff',
        'midnight-blue': '#0f0e52',
        'oxford-blue': '#0e2a50',
      },
      fontFamily: {
        sans: ['Source Code Pro', 'Open Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
