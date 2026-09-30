/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hud: {
          bg: '#05060f',
          card: 'rgba(15, 17, 32, 0.78)',
          'card-hover': 'rgba(20, 24, 46, 0.85)',
          surface: '#0f1120',
          elevated: '#171a30',
          border: 'rgba(79, 209, 255, 0.16)',
          'border-active': 'rgba(167, 139, 250, 0.45)',
          'border-subtle': 'rgba(255, 255, 255, 0.08)',
        },
        dark: {
          950: '#05060f',
          900: '#0f1120',
          850: '#14172a',
          800: '#171a30',
          700: '#1e233d',
          600: '#2c3352',
        },
        light: {
          bg: '#f7f8fc',
          card: 'rgba(255, 255, 255, 0.90)',
          'card-hover': 'rgba(255, 255, 255, 0.98)',
          surface: '#ffffff',
          elevated: '#f0f2fa',
          border: 'rgba(79, 209, 255, 0.28)',
          text: '#0b0d1a',
          muted: '#4b5563',
        },
        // Strict high-contrast color tokens
        content: {
          primary: '#f2f3f8',   // Off-white for all dark mode text & headings
          muted: '#a6adc8',     // Light gray-blue for secondary metadata
          lightPrimary: '#0b0d1a', // Dark navy for light mode text & headings
          lightMuted: '#4b5563',   // Muted gray for light mode captions
        },
        accent: {
          cyan: '#4fd1ff',
          violet: '#a78bfa',
          blue: '#3b82f6',
          purple: '#8b5cf6',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        base: ['1rem', { lineHeight: '1.65' }],
        lg: ['1.125rem', { lineHeight: '1.7' }],
      },
      animation: {
        'pulse-slow': 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      boxShadow: {
        'hud-card': '0 12px 36px -8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'hud-glow': '0 0 25px -4px rgba(79, 209, 255, 0.35)',
        'hud-glow-lg': '0 0 45px -8px rgba(167, 139, 250, 0.4)',
        'btn-glow': '0 0 20px -3px rgba(79, 209, 255, 0.45)',
      },
    },
  },
  plugins: [],
};
