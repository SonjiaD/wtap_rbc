/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal blue from the slide deck
        royal: {
          DEFAULT: '#4169E1',
          light: '#5A7FE8',
          dark: '#2850C8',
        },
        // Sky blue for accents
        sky: {
          DEFAULT: '#87CEEB',
          light: '#B0E0F0',
          dark: '#5FB3D4',
        },
        // Coral/salmon pink for CTAs and warmth
        coral: {
          DEFAULT: '#FF6B6B',
          light: '#FF8E8E',
          dark: '#E54B4B',
        },
        // Lavender for soft accents
        lavender: {
          DEFAULT: '#E6E6FA',
          light: '#F0F0FF',
          dark: '#D8D8F0',
        },
        // Cream/off-white background
        cream: {
          DEFAULT: '#FFF8F0',
          light: '#FFFCF8',
          dark: '#F5EDE0',
        },
        // Mint for success states
        mint: {
          DEFAULT: '#98FB98',
          light: '#B8FFB8',
          dark: '#78DB78',
        },
        // Peach for warm highlights
        peach: {
          DEFAULT: '#FFDAB9',
          light: '#FFE8D0',
          dark: '#FFCCA0',
        },
        // Red panda colors
        panda: {
          rust: '#C65D3B',
          cream: '#F5E6D3',
          dark: '#2C1810',
          nose: '#1A1A1A',
        }
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        display: ['Quicksand', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'cute': '0 4px 20px -2px rgba(65, 105, 225, 0.15)',
        'cute-lg': '0 10px 40px -5px rgba(65, 105, 225, 0.2)',
        'coral': '0 4px 20px -2px rgba(255, 107, 107, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
