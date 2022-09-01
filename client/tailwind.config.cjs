/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#6f72d8",
        gray: {
          "9": "#eeeeee"
        },
        "gray-dark": {
          "9": "#8c8c8c"
        }
      },
      maxWidth:{
        '8xl': "85rem"
      },
      minWidth: {
        100: "100px",
        150: "150px",
        200: "200px",
        300: "300px",
        900: "900px",
        1000: "1000px"
      },
      zIndex: {
        500: "500",
      }
    },
  },
  plugins: [],
}