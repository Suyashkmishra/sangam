/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#C45C1A',
          light: '#E27D3A',
          dark: '#934310',
        },
        vermilion: {
          DEFAULT: '#C0392B',
          light: '#E74C3C',
          dark: '#962D22',
        },
        parchment: {
          DEFAULT: '#F5ECD7',
          light: '#FAF5EA',
          dark: '#E7DCBE',
        },
        ink: {
          DEFAULT: '#16110D', // Rich warm dark brown/black
          indigo: '#1A1A2E',  // Deep indigo/charcoal
          light: '#2C1E15',   // Lighter warm charcoal
          dark: '#0D0A08',    // Very dark ink
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F3E5AB',
          dark: '#AA7C11',
        },
        cream: {
          DEFAULT: '#EDE8DC',
          light: '#F8F6F0',
          dark: '#DFD8C4',
        },
        brown: {
          DEFAULT: '#2C1810',
          light: '#4E2D1F',
          dark: '#180B07',
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        calligraphy: ['"Yatra One"', 'cursive', 'serif'],
        poetic: ['"Lora"', 'serif'],
        body: ['"EB Garamond"', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.35)',
        'saffron-glow': '0 0 15px rgba(196, 92, 26, 0.35)',
      },
      backgroundImage: {
        'paper-texture': "url('/paper-texture.png')", // fallback to CSS-generated texture
      }
    },
  },
  plugins: [],
}
