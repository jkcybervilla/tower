/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "390px",
      },
      colors: {
        charcoal: "#1a1f2e",
        steel: "#141824",
        cream: "#f8f7f5",
        gold: "#d4af37",
        blueGrey: "#8b9dc3",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Lato", "system-ui", "sans-serif"],
      }
    }
  },
  plugins: []
};
