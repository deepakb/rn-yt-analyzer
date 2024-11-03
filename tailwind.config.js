/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#1E90FF',
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#121212',
        },
        text: {
          DEFAULT: '#1F2937',
          dark: '#F3F4F6',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#1F2937',
        },
      },
      fontFamily: {
        'inter-regular': ['Inter_400Regular'],
        'inter-medium': ['Inter_500Medium'],
        'inter-semibold': ['Inter_600SemiBold'],
        'inter-bold': ['Inter_700Bold'],
      },
    },
  },
  plugins: [],
} 