/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#7f13ec",
        "primary-dark": "#5e0eb0",
        "secondary": "#ede7f3",
        "background-light": "#f7f6f8",
        "background-dark": "#191022",
        "surface-dark": "#2a1e36",
        "text-dark": "#140d1b",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      },
      borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px" },
      boxShadow: {
        'glow': '0 0 15px -3px rgba(127, 19, 236, 0.3)',
      }
    },
  },
  plugins: [],
}
