/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#050814',
          900: '#0A1128',
          800: '#0E1730',
          700: '#141F3F',
        },
        brand: {
          magenta: '#D91B5C',
          pink: '#EC4899',
          indigo: '#6366F1',
          gold: '#F5C518',
        },
        ink: {
          DEFAULT: '#F8FAFC',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-magenta': '0 0 40px -12px rgba(217, 27, 92, 0.55)',
        'glow-pink': '0 10px 40px -10px rgba(236, 72, 153, 0.35)',
        'glass-xl': '0 25px 60px -20px rgba(0, 0, 0, 0.65)',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
        livePulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(0.85)' },
        },
      },
      animation: {
        floatY: 'floatY 7s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        livePulse: 'livePulse 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
