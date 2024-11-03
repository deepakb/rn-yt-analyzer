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
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
      gradientColorStops: theme => ({
        'gradient-1': '#FF0080',
        'gradient-2': '#7928CA',
      }),
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-sunset': 'linear-gradient(to bottom right, #FF512F, #DD2476)',
        'gradient-ocean': 'linear-gradient(to bottom right, #2193b0, #6dd5ed)',
        'gradient-fire': 'linear-gradient(to bottom right, #FFB75E, #ED8F03, #EA384D)',
      },
    },
  },
  plugins: [],
} 