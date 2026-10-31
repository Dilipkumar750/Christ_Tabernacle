/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-deep':    '#0C2219',
        'green-dark':    '#122D24',
        'green':         '#184332',
        'green-medium':  '#1E5440',
        'green-light':   '#2A6E54',
        'green-soft':    '#EAF2EE',
        'gold':          '#D6B66B',
        'gold-light':    '#E8CC8F',
        'gold-bright':   '#F5E0B0',
        'gold-dark':     '#A88A42',
        'gold-soft':     '#FBF6E9',
        'crimson':       '#C81D25',
        'crimson-dark':  '#9E1018',
        'crimson-light': '#DC2626',
        'ivory':         '#FAF6EE',
        'ivory-warm':    '#F2E9DC',
        'stone':         '#EDE5D8',
        'text-main':     '#112218',
        'text-muted':    '#4A6355',
        'text-light':    '#7A9288',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'grad-sanctuary':      'linear-gradient(135deg, #0C2419 0%, #133929 18%, #184332 42%, #1E5540 68%, #276D52 88%, #328464 100%)',
        'grad-sanctuary-dark': 'linear-gradient(150deg, #0B2217 0%, #113425 24%, #184332 50%, #1F5641 78%, #286F54 100%)',
        'grad-gold':           'linear-gradient(135deg, #E0C47A 0%, #D6B66B 50%, #A88A42 100%)',
        'grad-gold-light':     'linear-gradient(135deg, #FFF0D4 0%, #F0D898 50%, #E0C47A 100%)',
        'grad-heavenly':       'linear-gradient(180deg, #FFFFFF 0%, #FAF6EE 60%, #F2E9DC 100%)',
        'grad-footer':         'linear-gradient(180deg, #184332 0%, #13392A 35%, #0E291E 70%, #091C14 100%)',
        'grad-green-gold':     'linear-gradient(135deg, #0F2D20 0%, #184332 40%, #205943 70%, rgba(214,182,107,0.2) 100%)',
      },
      boxShadow: {
        'gold':   '0 8px 28px rgba(214, 182, 107, 0.3)',
        'card':   '0 8px 24px rgba(12, 34, 25, 0.1)',
        'sm-g':   '0 2px 10px rgba(12, 34, 25, 0.06)',
        'lg-g':   '0 16px 42px rgba(12, 34, 25, 0.14)',
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'fade-in': 'fadeIn 0.4s ease',
        'slide-up': 'slideUp 0.5s ease',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
