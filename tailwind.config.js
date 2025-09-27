/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'ui-serif', 'Georgia'],
        mono: ['SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        perfume: '#EDD0FA',
        'perfume-dark': '#A743E5',
        darkBlue: 'hsl(209, 23%, 22%)',
        'veryDarkBlue-1': 'hsl(207, 26%, 17%)',
        'veryDarkBlue-2': 'hsl(200, 15%, 8%)',
        darkGray: 'hsl(0, 0%, 52%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
        white: 'hsl(0, 0%, 100%)',
      },
      keyframes: {
        navanime: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
    },
  },
  plugins: [],
};
