import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ["Outfit", "sans-serif"],
      serif: ["Montserrat", "sans-serif"],
    },
    colors: {
      ...colors,
      secondary: "#f66135",
      primary: {
        600: "#1764ca",
        500: "#1a73e8",
        200: "#cde0fa",
      },
    },
  },
  plugins: [],
  content: [],
};
