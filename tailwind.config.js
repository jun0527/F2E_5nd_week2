/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./src/assets/style/*"],
  theme: {
    colors: {
      // green
      // green_light: "#F3FAF5",
      // green_light_hover: "#EDF7F0",
      // green_light_active: "#D9EFDF",
      // green: "#84CB98",
      // green_hover: "#77B789",
      // green_active: "#6AA27A",
      // green_dark: "#639872",
      // green_dark_hover: "#4F7A5B",
      // green_dark_active: "#3B5B44",
      // green_darker: "#2E4735",
      // blue
      // blue_light: "#F3F4FB",
      // blue_light_hover: "#EDEFF9",
      // blue_light_active: "#DADEF3",
      // blue: "#8894D8",
      // blue_hover: "#7A85C2",
      // blue_active: "#6D76AD",
      // blue_dark: "#666FA2",
      // blue_dark_hover: "#525982",
      // blue_dark_active: "#3D4361",
      // blue_darker: "#30344C",
      // darkBlue
      // darkBlue_light: "#E9EAED",
      // darkBlue_light_hover: "#DEE0E4",
      // darkBlue_light_active: "#BCBEC7",
      darkBlue: "#262E49",
      // darkBlue_hover: "#222942",
      // darkBlue_active: "#1E253A",
      // darkBlue_dark: "#1D2337",
      // darkBlue_dark_hover: "#171C2C",
      // darkBlue_dark_active: "#111521",
      // darkBlue_darker: "#0D101A",
      // brow
      // brow_light: "#FCF6F1",
      // brow_light_hover: "#FAF1EA",
      // brow_light_active: "#F5E2D4",
      // brow: "#DFA175",
      // brow_hover: "#C99169",
      // brow_active: "#B2815E",
      // brow_dark: "#A77958",
      // brow_dark_hover: "#866146",
      // brow_dark_active: "#644835",
      // brow_darker: "#4E3829",
      // black
      // black_light: "#E6E6E6",
      // black_light_hover: "#D9D9D9",
      // black_light_active: "#B0B0B0",
      black: "#000000",
      // white
      white: "#FFFFFF",
      // white_hover: "#E6E6E6",
      // white_active: "#CCCCCC",
      white_dark: "#BFBFBF",
      // white_dark_hover: "#999999",
      // white_dark_active: "#737373",
      // white_darker: "#595959",
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
