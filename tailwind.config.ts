/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],

  theme: {
    extend: {
//     maxWidth: {
//     "8xl": "1536px",
//     "9xl": "1728px",
//     "10xl": "1920px",
//     }, 
//     keyframes: {
//     'fade-in': {
//         '0%': { opacity: '0', transform: 'scale(0.98)' },
//         '100%': { opacity: '1', transform: 'scale(1)' },
//     },
//     'slide-up-out': {
//         '0%': { opacity: '1', transform: 'translateY(0)' },
//         '100%': { opacity: '0', transform: 'translateY(-1rem)' },
//     }, 'slide-down-out': {
// '0%': { opacity: '1', transform: 'translateY(0)' },
// '100%': { opacity: '0', transform: 'translateY(1rem)' },
// },
//     'slide-down': {
//         '0%': { opacity: '0', transform: 'translateY(-1rem)' },
//         '100%': { opacity: '1', transform: 'translateY(0)' },
//     },
//     'slide-up': {
//         '0%': { opacity: '0', transform: 'translateY(1rem)' },
//         '100%': { opacity: '1', transform: 'translateY(0)' },
//     },
//     'pulse-slow': {
//         '0%, 100%': { opacity: '0.6' },
//         '50%': { opacity: '1' },
//     },
//     'scale-x': {
//         '0%': { transform: 'scaleX(0)' },
//         '100%': { transform: 'scaleX(1)' },
//     },
//         progress: {
//     "0%": { width: "100%" },
//     "100%": { width: "0%" },
// },

//     'gradient-text': {
//     '0%': { 'background-position': '0% 50%' },
//     '50%': { 'background-position': '100% 50%' },
//     '100%': { 'background-position': '0% 50%' },
//     },
//     },
    //   animation: {
    //     'fade-in': 'fade-in 0.4s ease-out forwards',
    //     'slide-up': 'slide-up 0.3s ease-out forwards',
    //         progress: "progress linear forwards",

    //     'slide-down': 'slide-down 0.3s ease-out forwards',
    //     'slide-up-out': 'slide-up-out 0.3s ease-in forwards',
    //       'slide-down-out': 'slide-down-out 0.3s ease-in forwards',

    //     'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
    //     'scale-x': 'scale-x 0.6s ease-out forwards',
    //     'gradient-text': 'gradient-text 2s ease-in-out infinite',
    //   },   
    },
    // colors: {
    
    //   pending: {
    //     50: "rgb(var(--color-pending-50))",
    //     100: "rgb(var(--color-pending-100))",
    //     200: "rgb(var(--color-pending-200))",
    //     300: "rgb(var(--color-pending-300))",
    //     400: "rgb(var(--color-pending-400))",
    //     500: "rgb(var(--color-pending-500))",
    //     600: "rgb(var(--color-pending-600))",
    //     700: "rgb(var(--color-pending-700))",
    //     800: "rgb(var(--color-pending-800))",
    //     900: "rgb(var(--color-pending-900))",
    //     950: "rgb(var(--color-pending-950))",
    //   },
    // }, 
    
  },

  plugins: [],
}