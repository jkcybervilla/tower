/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "390px",
      },
      colors: {
        charcoal: "#0a0a0a",
        steel: "#1a1a1a",
        cream: "#e8e4dc",
        gold: "#c9a96e",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        ui: ["Montserrat", "system-ui", "sans-serif"],
      }
    }
  },
  plugins: []
};
