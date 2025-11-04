// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ef233c',   // main red
          600: '#d90429',       // hover / darker
          100: '#fff1f3'        // very light red background
        },
        neutralbg: '#ffffff',
        muted: '#6B7280'
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto'],
      },
      borderRadius: {
        lg: '0.75rem', // 12px for more playful rounded look
        xl: '1rem'
      },
      boxShadow: {
        card: '0 8px 30px rgba(17,24,39,0.08)',
        lift: '0 14px 40px rgba(17,24,39,0.12)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}

