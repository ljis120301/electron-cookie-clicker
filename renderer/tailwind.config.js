const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      // Catppuccin Frappé palette
      rosewater: '#f2d5cf',
      flamingo: '#eebebe',
      pink: '#f4b8e4',
      mauve: '#ca9ee6',
      red: '#e78284',
      maroon: '#ea999c',
      peach: '#ef9f76',
      yellow: '#e5c890',
      green: '#a6d189',
      teal: '#81c8be',
      sky: '#99d1db',
      sapphire: '#85c1dc',
      blue: '#8caaee',
      lavender: '#babbf1',
      text: '#c6d0f5',
      subtext1: '#b5bfe2',
      subtext0: '#a5adce',
      overlay2: '#949cbb',
      overlay1: '#838ba7',
      overlay0: '#737994',
      surface2: '#626880',
      surface1: '#51576d',
      surface0: '#414559',
      base: '#303446',
      mantle: '#292c3c',
      crust: '#232634',
      
      // Required Tailwind colors for your game
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      amber: colors.amber, // Important for your cookie game theme
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        click: {
          '0%': { transform: 'rotate(var(--rotation)) translateX(80px)' },
          '50%': { 
            transform: 'rotate(var(--rotation)) translateX(65px) scale(0.9)'
          },
          '100%': { transform: 'rotate(var(--rotation)) translateX(80px)' }
        }
      },
      animation: {
        'click': 'click 1s infinite'
      }
    },
  },
  plugins: [],
}
