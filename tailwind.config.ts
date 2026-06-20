/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Neue Haas Grotesk', 'Inter', 'system-ui', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        'nyro-black': '#000000',
        'nyro-off-black': '#060606',
        'nyro-near-black': '#0a0a0a',
        'nyro-white': '#ffffff',
        'nyro-teal': '#2DD4BF',
        'nyro-teal-light': '#5EEAD4',
        'nyro-teal-deep': '#0D9488',
      },
      keyframes: {
        'gradient-border': {
          '0%, 100%': { borderRadius: '37% 29% 27% 27% / 28% 25% 41% 37%' },
          '25%': { borderRadius: '47% 29% 39% 49% / 61% 19% 66% 26%' },
          '50%': { borderRadius: '57% 23% 47% 72% / 63% 17% 66% 33%' },
          '75%': { borderRadius: '28% 49% 29% 100% / 93% 20% 64% 25%' },
        },
        'gradient-1': {
          '0%, 100%': { top: '0', right: '0' },
          '50%': { top: '50%', right: '25%' },
          '75%': { top: '25%', right: '50%' },
        },
        'gradient-2': {
          '0%, 100%': { top: '0', left: '0' },
          '60%': { top: '75%', left: '25%' },
          '85%': { top: '50%', left: '50%' },
        },
        'gradient-3': {
          '0%, 100%': { bottom: '0', left: '0' },
          '40%': { bottom: '50%', left: '25%' },
          '65%': { bottom: '25%', left: '50%' },
        },
        'gradient-4': {
          '0%, 100%': { bottom: '0', right: '0' },
          '50%': { bottom: '25%', right: '40%' },
          '90%': { bottom: '50%', right: '25%' },
        },
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, -40%) scale(1)',
          },
        },
        shinyTextSweep: {
          '0%': { 'background-position': '0% center' },
          '100%': { 'background-position': '200% center' },
        },
        phoneBob: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%': { transform: 'scale(0)', opacity: '0.8' },
          '100%': { transform: 'scale(3)', opacity: '0' },
        },
        notificationPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        spotlight: 'spotlight 2s ease forwards',
        shinyTextSweep: 'shinyTextSweep 3s linear infinite',
        phoneBob: 'phoneBob 3s ease-in-out infinite',
        glowPulse: 'glowPulse 1.2s ease-out forwards',
        notificationPulse: 'notificationPulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
