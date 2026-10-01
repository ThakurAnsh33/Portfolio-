/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hud: {
          bg: '#12161A',
          card: 'rgba(27, 33, 39, 0.78)',
          'card-hover': 'rgba(33, 40, 46, 0.88)',
          surface: '#1B2127',
          elevated: '#222A30',
          border: 'rgba(154, 163, 154, 0.14)',
          'border-active': 'rgba(122, 148, 113, 0.45)',
          'border-subtle': 'rgba(237, 237, 230, 0.08)',
        },
        dark: {
          950: '#12161A',
          900: '#1B2127',
          850: '#222A30',
          800: '#2A343C',
          700: '#34404A',
          600: '#465563',
        },
        light: {
          bg: '#F4F4EE',
          card: 'rgba(255, 255, 255, 0.88)',
          'card-hover': 'rgba(255, 255, 255, 0.98)',
          surface: '#EAEAE2',
          elevated: '#DFE2D8',
          border: 'rgba(85, 96, 79, 0.20)',
          text: '#14181C',
          muted: '#55604F',
        },
        // Strict high-contrast color tokens
        content: {
          primary: '#EDEDE6',   // Off-white for all dark mode text & headings
          muted: '#9AA39A',     // Light muted tone for secondary metadata
          lightPrimary: '#14181C', // Deep tone for light mode text & headings
          lightMuted: '#55604F',   // Muted stone for light mode captions
        },
        accent: {
          moss: '#7A9471',
          mossDeep: '#5C7054',
          amber: '#D9A85C',
          amberDeep: '#B5833C',
          // Backwards compatibility aliases to ensure smooth migration
          cyan: '#7A9471',
          violet: '#5C7054',
          blue: '#7A9471',
          purple: '#5C7054',
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
        'hud-card': '0 12px 36px -8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(237, 237, 230, 0.08)',
        'hud-glow': '0 0 20px -4px rgba(122, 148, 113, 0.25)',
        'hud-glow-lg': '0 0 35px -6px rgba(122, 148, 113, 0.3)',
        'btn-glow': '0 0 20px -3px rgba(122, 148, 113, 0.35)',
      },
    },
  },
  plugins: [],
};
