/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paideia: {
          primary: "#006497",
          "primary-light": "#4A85D1",
          mint: "#ABD4BF",
          coral: "#FFD9CF",
          cream: "#F1EBDA",
          "coral-accent": "#FC6745",
        },
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
}
