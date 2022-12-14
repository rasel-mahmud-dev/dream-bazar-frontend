/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
		  body: {
			  light: "#f8f8f8",
			  dark: "#161616"
		  },
        secondary: {
          300: "#7480FFFF",
          400: "#4D62E7FF"
        },
        gray: {
          "9": "#eeeeee"
        },
        "gray-dark": {
          "9": "#8c8c8c"
        },
          dark: {
              0: "#ffffff",
              10: "#f3f3f3",
              20: "#efefef",
              30: "#e7e7e7",
              40: "#dadada",
              50: "#e1e1e1",
              100: "#bdbdbd",
              200: "#9a9a9a",
              300: "#797979",
              400: "#606060",
              500: "#484848",
              600: "#363636",
              700: "#282828",
              800: "#1e1e1e",
              900: "#151515"
          },
        green: {
          '50': '#f0fdf4',
          '100': '#dcfce7',
          '200': '#bbf7d0',
          '300': '#86efac',
          '400': '#4ade80',
          '450': '#3ccc6f',
          '500': 'rgba(34,197,94,1)',
          '600': '#16a34a',
          '700': '#15803d',
          '800': '#166534',
          '900': '#14532d',
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
      },
      boxShadow: {
		  "card": "0 2px 17px -3px #6c6c6c4f",
        "card-deep": "0px 9px 14px 9px rgb(149 149 149 / 5%), -1px 1px 18px -15px rgb(77 179 75 / 45%), 0 14px 20px 0px rgb(226 255 226 / 60%)",
        "card-deep-dark": "0 10px 19px 0px #00000080",
	      "xxs": "0 5px 10px rgb(51 66 87 / 5%)"
      }
    },
	  container:  {
		screens: {sm: "1400px"}
	  }
  },
  plugins: [],
}