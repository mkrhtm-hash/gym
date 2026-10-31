/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: v('bg'),
        surface: v('surface'),
        ink: v('ink'),
        muted: v('muted'),
        line: v('line'),
        accent: v('accent'),
        accent2: v('accent2'),
        neon: '#c6ff3d',
        aqua: '#22d3ee',
        ember: '#ff7a45',
        rose: '#ff4d8d',
        violet: '#a78bfa',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(198, 255, 61, 0.55)',
        'glow-lg': '0 0 80px -12px rgba(198, 255, 61, 0.55)',
        'glow-cyan': '0 0 40px -10px rgba(34, 211, 238, 0.6)',
        soft: '0 20px 50px -20px rgba(0, 0, 0, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        dash: {
          to: { strokeDashoffset: '0' },
        },
        shimmer: {
          from: { backgroundPosition: '0% 50%' },
          to: { backgroundPosition: '200% 50%' },
        },
        flicker: {
          '0%, 100%': { transform: 'scale(1) rotate(-2deg)', filter: 'drop-shadow(0 0 12px rgba(255,122,69,.7))' },
          '50%': { transform: 'scale(1.08) rotate(2deg)', filter: 'drop-shadow(0 0 22px rgba(255,122,69,.95))' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        flicker: 'flicker 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
