module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        1: "#FF7637",
        2: "#FFD33C",
        3: "#5F99FF",
        4: "#00D39E",
      },
    },
    screens: {
      lg: { min: "1200px" },
      md: { max: "1300px" },
      sm: { max: "768px" },
    },
  },
  plugins: [],
  darkMode: "class",
};
