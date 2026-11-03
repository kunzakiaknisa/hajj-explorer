/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hajj: {
          primary: '#176B9B',
          secondary: '#258FBA',
          light: '#E8F5FA',
          navy: '#123B56',
          white: '#FFFFFF',
          bg: '#F5F9FC',
          gold: '#F4B942',
          goldHover: '#E5A830',
          darkBlue: '#0F2D42',
          border: '#D2E8F4',
          card: '#FFFFFF',
          muted: '#5A7385'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'Traditional Arabic', 'Scheherazade New', 'serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(23, 107, 155, 0.08), 0 2px 6px -1px rgba(18, 59, 86, 0.05)',
        'card': '0 6px 24px -4px rgba(18, 59, 86, 0.08)',
        'elevated': '0 12px 32px -4px rgba(18, 59, 86, 0.12)',
        'glow-gold': '0 0 16px rgba(244, 185, 66, 0.35)'
      }
    },
  },
  plugins: [],
}
