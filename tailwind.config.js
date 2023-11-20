/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./src/assets/style/*"],
  theme: {
    colors: {
      // primary: "#00A199",
      // primary_light: "#14C3BB",
      // secondary: "#FFDC9E",
      // secondary_dark: "#F4CA80",
      // secondary_light: "#FFE9C3",
      // secondary_tint: "#FCF9E9",
      // black: "#515151",
      // white: "#FFFFFF"
    },
    extend: {
      fontFamily: {
        // Gaegu: "Gaegu",
        // NotoSansTc: "Noto Sans TC",
        // NotoSerifTc: "Noto Serif TC"
      },
    }
  },
  plugins: []
};
