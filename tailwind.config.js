/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Color System
      colors: {
        primary: {
          DEFAULT: '#1E90FF',
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#B8DFFF',
          300: '#85CAFF',
          400: '#47ADFF',
          500: '#1E90FF', // Base
          600: '#0070E0',
          700: '#0055AA',
          800: '#003D7A',
          900: '#002952',
        },
        secondary: {
          DEFAULT: '#7928CA', // Your base secondary color
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#7928CA', // Base color
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        success: {
          DEFAULT: '#10B981',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981', // Base
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        warning: {
          DEFAULT: '#F59E0B',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // Base
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        error: {
          DEFAULT: '#EF4444',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444', // Base
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#121212',
          subtle: '#F9FAFB',
          'subtle-dark': '#1F2937',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#1F2937',
          raised: '#F3F4F6',
          'raised-dark': '#374151',
        },
        border: {
          DEFAULT: '#E5E7EB',
          dark: '#374151',
        },
        text: {
          DEFAULT: '#1F2937',
          dark: '#F3F4F6',
          muted: '#6B7280',
          'muted-dark': '#9CA3AF',
        },
      },

      // Typography System - Adjust for Mobile
      fontSize: {
        'display-2xl': [
          '2.75rem',
          { lineHeight: '3.25rem', letterSpacing: '-0.02em' },
        ],
        'display-xl': [
          '2.25rem',
          { lineHeight: '2.75rem', letterSpacing: '-0.02em' },
        ],
        'display-lg': [
          '2rem',
          { lineHeight: '2.5rem', letterSpacing: '-0.02em' },
        ],
        'display-md': [
          '1.75rem',
          { lineHeight: '2.125rem', letterSpacing: '-0.02em' },
        ],
        'display-sm': ['1.5rem', { lineHeight: '2rem' }],
        'display-xs': ['1.25rem', { lineHeight: '1.75rem' }],
        'body-xl': ['1.125rem', { lineHeight: '1.75rem' }],
        'body-lg': ['1rem', { lineHeight: '1.5rem' }],
        'body-md': ['0.875rem', { lineHeight: '1.25rem' }],
        'body-sm': ['0.75rem', { lineHeight: '1.125rem' }],
        'body-xs': ['0.625rem', { lineHeight: '1rem' }],
      },

      // Font Weights
      fontFamily: {
        'inter-regular': ['Inter_400Regular'],
        'inter-medium': ['Inter_500Medium'],
        'inter-semibold': ['Inter_600SemiBold'],
        'inter-bold': ['Inter_700Bold'],
      },

      // Spacing System - Compact for Mobile
      spacing: {
        '4xs': '0.125rem', // 2px
        '3xs': '0.25rem', // 4px
        '2xs': '0.375rem', // 6px
        xs: '0.5rem', // 8px
        sm: '0.75rem', // 12px
        md: '0.875rem', // 14px (reduced for mobile)
        lg: '1rem', // 16px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
      },

      // Border Radius - Rounder for Mobile
      borderRadius: {
        none: '0',
        xs: '0.25rem', // 4px
        sm: '0.375rem', // 6px
        md: '0.5rem', // 8px
        lg: '0.75rem', // 12px
        xl: '1rem', // 16px
        '2xl': '1.5rem', // 24px
        full: '9999px',
      },

      // Shadows - Subtle for Mobile
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 3px 5px -2px rgba(0, 0, 0, 0.1), 0 1px 3px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 8px 12px -4px rgba(0, 0, 0, 0.1), 0 3px 5px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 16px 20px -6px rgba(0, 0, 0, 0.1), 0 5px 7px -3px rgba(0, 0, 0, 0.04)',
      },

      // Animations - Subtle & Optimized
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.25s ease-in-out',
        'slide-down': 'slideDown 0.25s ease-in-out',
        'scale-in': 'scaleIn 0.15s ease-in-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
