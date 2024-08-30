// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', "sans-serif"],
        sofia: ['"Sofia"', "sans-serif"],
        'dm-sans': ['"DM+Sans"', "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};