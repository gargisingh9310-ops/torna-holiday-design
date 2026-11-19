/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F4F0E8',
          light: '#FAF8F4',
          dark: '#EBE5D8',
        },
        forest: {
          DEFAULT: '#243B35',
          dark: '#1A2C27',
          deep: '#152420',
          light: '#314E46',
          muted: '#3C5C53',
        },
        gold: {
          DEFAULT: '#B88B55',
          light: '#CCA372',
          dark: '#9E7340',
          pale: '#DFC19A',
          muted: '#C4A175',
        },
        sand: {
          DEFAULT: '#E5DED1',
          light: '#EFEAE0',
          dark: '#D8CFC0',
        },
        charcoal: {
          DEFAULT: '#262824',
          dark: '#1A1C18',
          light: '#3A3C38',
          muted: '#5A5D57',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        editorial: '0.04em',
        luxury: '0.12em',
        widest: '0.2em',
      }
    },
  },
  plugins: [],
}

