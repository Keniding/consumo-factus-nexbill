module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563eb',
          secondary: '#1e40af',
          light: '#60a5fa',
          surface: '#f8fafc',
          card: '#ffffff',
          dark: '#1e293b',
          accent: '#0891b2',
          success: '#059669',
          warning: '#d97706',
          error: '#dc2626',
        },
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
          muted: '#94a3b8',
        }
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'strong': '0 8px 16px rgba(0, 0, 0, 0.12)',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 }
        },
        'wave': {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' }
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'wave': 'wave 2.5s ease-in-out infinite'
      }
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
  safelist: [
    'delay-0',
    'delay-200',
    'delay-400',
    'delay-600',
    'delay-800',
    'delay-1000',
  ],
}