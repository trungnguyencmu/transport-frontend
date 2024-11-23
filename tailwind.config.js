const Colors = require('./src/constants/Colors');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: Colors.primary,
        secondary: Colors.secondary,
        tertiary: Colors.tertiary,
        active: Colors.active,
        danger: Colors.danger,
        primaryText: Colors.primaryText,
        background: Colors.background,
        gray: Colors.gray,
        input: Colors.input,
        separator: Colors.separator,
        white: Colors.white,
        black: Colors.black,
      },
      textColor: {
        DEFAULT: Colors.primaryText, // Set primaryText as the default
      },
      maxWidth: {
        '6xl': '72rem', // Add this value or any desired width
      },
    },
  },
  plugins: [],
};
