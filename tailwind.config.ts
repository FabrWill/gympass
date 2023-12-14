import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ["Outfit", "sans-serif"],
    },
    colors: {
      ...colors,
      secondary: "#f66135",
      primary: "#1a73e8",
    },
  },
  plugins: [],
  content: [],
};
