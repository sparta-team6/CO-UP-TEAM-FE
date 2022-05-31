module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        1: "#FF7637",
        2: "#FFD33C",
        3: "#5F99FF",
        4: "#00D39E",
        5: "#E7EBF2",
        6: "#333C46",
        7: "#293440",
        8: "#1C2632",
        h1: "#2d78fc",
        h2: "#a5a8ad",
      },
    },
    screens: {
      lg: { min: "1299px" },
      md: { max: "1500px" },
      cu: { min: "769px" },
      sm: { max: "768px" },
    },
  },
  plugins: [],
  darkMode: "class",
};
