import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  darkMode: "class",
  theme: {
    extend: {},
    colors: {
      primary: {
        50: "#E8F1F8",
        100: "#D1E3F1",
        200: "#B9D5EA",
        300: "#A2C7E3",
        400: "#8BB9DC",
        500: "#6EACDA", // Base color
        600: "#5A94C2",
        700: "#477CAC",
        800: "#336495",
        900: "#204D7E",
      },
      background: "#021526",
      cardBg: "#061e33",
      text: "#fff",
    },
  },
  plugins: [flowbite.plugin()],
};
