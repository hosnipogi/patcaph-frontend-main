const windmill = require("@windmill/react-ui/config")

module.exports = windmill({
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      // "2xl": "1536px",
    },
    extend: {
      height: {
        "screen-65": "65vh",
        "screen-70": "70vh",
        "screen-80": "80vh",
        "screen-90": "90vh",
      },
      fontFamily: {
        balto: ["Balto", "sans-serif"],
        harriet: ["Harriet", "nunito", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
