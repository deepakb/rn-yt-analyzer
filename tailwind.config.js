/** @type {import('tailwindcss').Config} */
module.exports = {
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
          light: '#F5F5F5',
        },
        // ... other colors from your Colors constant
      },
    },
  },
  plugins: [],
} 