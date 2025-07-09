/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#a78bfa', // violet-400
        'primary-50': '#f5f3ff', // violet-50
        'primary-100': '#ede9fe', // violet-100
        'primary-200': '#ddd6fe', // violet-200
        'primary-300': '#c4b5fd', // violet-300
        'primary-400': '#a78bfa', // violet-400
        'primary-500': '#8b5cf6', // violet-500
        'primary-600': '#7c3aed', // violet-600
        'primary-700': '#6d28d9', // violet-700
        'primary-800': '#5b21b6', // violet-800
        'primary-900': '#4c1d95', // violet-900
        'primary-foreground': '#ffffff', // white

        // Secondary Colors
        'secondary': '#5eead4', // teal-300
        'secondary-50': '#f0fdfa', // teal-50
        'secondary-100': '#ccfbf1', // teal-100
        'secondary-200': '#99f6e4', // teal-200
        'secondary-300': '#5eead4', // teal-300
        'secondary-400': '#2dd4bf', // teal-400
        'secondary-500': '#14b8a6', // teal-500
        'secondary-600': '#0d9488', // teal-600
        'secondary-700': '#0f766e', // teal-700
        'secondary-800': '#115e59', // teal-800
        'secondary-900': '#134e4a', // teal-900
        'secondary-foreground': '#1f2937', // gray-800

        // Accent Colors
        'accent': '#fbcfe8', // pink-200
        'accent-50': '#fdf2f8', // pink-50
        'accent-100': '#fce7f3', // pink-100
        'accent-200': '#fbcfe8', // pink-200
        'accent-300': '#f9a8d4', // pink-300
        'accent-400': '#f472b6', // pink-400
        'accent-500': '#ec4899', // pink-500
        'accent-600': '#db2777', // pink-600
        'accent-700': '#be185d', // pink-700
        'accent-800': '#9d174d', // pink-800
        'accent-900': '#831843', // pink-900
        'accent-foreground': '#1f2937', // gray-800

        // Background Colors
        'background': '#fcdcf2', // pink-100
        'background-secondary': '#f8fafc', // slate-50
        'background-tertiary': '#ffffff', // white

        // Surface Colors
        'surface': '#e0e7ff', // indigo-100
        'surface-secondary': '#f1f5f9', // slate-100
        'surface-tertiary': '#ffffff', // white

        // Text Colors
        'text-primary': '#1f2937', // gray-800
        'text-secondary': '#6b7280', // gray-500
        'text-tertiary': '#9ca3af', // gray-400
        'text-inverse': '#ffffff', // white

        // Status Colors
        'success': '#10b981', // emerald-500
        'success-50': '#ecfdf5', // emerald-50
        'success-100': '#d1fae5', // emerald-100
        'success-500': '#10b981', // emerald-500
        'success-600': '#059669', // emerald-600
        'success-foreground': '#ffffff', // white

        'warning': '#f59e0b', // amber-500
        'warning-50': '#fffbeb', // amber-50
        'warning-100': '#fef3c7', // amber-100
        'warning-500': '#f59e0b', // amber-500
        'warning-600': '#d97706', // amber-600
        'warning-foreground': '#ffffff', // white

        'error': '#ef4444', // red-500
        'error-50': '#fef2f2', // red-50
        'error-100': '#fee2e2', // red-100
        'error-500': '#ef4444', // red-500
        'error-600': '#dc2626', // red-600
        'error-foreground': '#ffffff', // white

        // Border Colors
        'border': '#e5e7eb', // gray-200
        'border-secondary': '#f3f4f6', // gray-100
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.5rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
        'squircle': '1rem',
        'card': '1rem',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'DEFAULT': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        'none': 'none',
        'neon-teal': '0 0 20px rgba(94, 234, 212, 0.3)',
        'neon-purple': '0 0 20px rgba(167, 139, 250, 0.3)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
        'glass': '20px',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'blink': 'blink 1s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '1000': '1000',
        '1010': '1010',
        '1020': '1020',
        '1030': '1030',
        '1040': '1040',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}