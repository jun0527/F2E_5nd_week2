/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./src/assets/style/*"],
  theme: {
    colors: {
      // green
      green_light_hover: "#EDF7F0",
      green: "#84CB98",
      green_hover: "#77B789",
      green_active: "#6AA27A",
      // blue
      blue_light_hover: "#EDEFF9",
      blue: "#8894D8",
      blue_hover: "#7A85C2",
      blue_active: "#6D76AD",
      blue_dark_hover: "#525982",
      // darkBlue
      darkBlue_light_hover: "#DEE0E4",
      darkBlue: "#262E49",
      darkBlue_dark_hover: "#171C2C",
      // brown
      brown: "#DFA175",
      brown_hover: "#C99169",
      brown_active: "#B2815E",
      // black
      black_light_hover: "#D9D9D9",
      black: "#000000",
      // white
      white: "#FFFFFF",
      white_hover: "#E6E6E6",
      white_active: "#CCCCCC",
      white_dark: "#BFBFBF",
      white_dark_active: "#737373",
      transparent: "transparent",
      body: "#F5F5F5"
    },
    extend: {
      fontFamily: {
        NotoSans: "Noto Sans SC"
      }
    }
  },
  plugins: []
};
