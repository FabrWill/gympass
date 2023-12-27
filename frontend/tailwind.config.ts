import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        serif: ["Montserrat", "sans-serif"],
      },
      colors: {
        secondary: {
          900: "#b44423",
          800: "#cf4f29",
          700: "#dd552c",
          600: "#eb5c31",
          500: "#f66135",
          400: "#f67851",
          300: "#f78f70",
          200: "#f9ae98",
          100: "#fbcec0",
          50: "#f9eae8",
        },
      },
    },
  },
  plugins: [],
  content: [],
};
