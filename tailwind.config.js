module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#6B7280'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-small': 'bounceSmall 0.5s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSmall: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        }
      },
      touchAction: {
        'pan-x': 'pan-x',
        'pan-y': 'pan-y',
        'pinch-zoom': 'pinch-zoom',
      },
      transitionTimingFunction: {
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    }
  },
  variants: {
    extend: {
      opacity: ['active', 'hover', 'focus', 'group-hover'],
      scale: ['active', 'group-hover'],
      transform: ['hover', 'focus', 'active'],
      backgroundColor: ['active', 'group-hover'],
      cursor: ['hover', 'focus'],
      touchAction: ['responsive'],
      translate: ['group-hover'],
      animation: ['hover', 'focus', 'group-hover']
    }
  },
  plugins: []
}