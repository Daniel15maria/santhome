/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#172d55',
        royal: '#2454a6',
        paper: '#f6f8fc',
        gold: '#bc7b27',
      },
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 22px 55px rgba(23,45,85,.12)',
      },
      keyframes: {
        'soft-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
      },
      animation: {
        'soft-pulse': 'soft-pulse 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
