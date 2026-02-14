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
        "primary": "#0f172a", // Slate 900
        "primary-dark": "#020617", // Slate 950
        "secondary": "#f1f5f9", // Slate 100
        "accent": "#9333EA", // Purple 600 (Vibrant Purple)
        "lavender": "#C084FC", // Bright Lavender for hovers
        "background-light": "#0a0a0a", // Deep Neutral Grey
        "background-dark": "#0a0a0a", // Deep Neutral Grey
        "surface-dark": "#171717", // Slightly lighter grey for cards
        "text-dark": "#ffffff", // Pure white text
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      },
      borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px" },
      boxShadow: {
        'glow': '0 0 15px -3px rgba(147, 51, 234, 0.3)', // Purple glow
      }
    },
  },
  plugins: [],
}
