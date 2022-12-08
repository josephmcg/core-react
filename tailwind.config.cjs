/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // https://www.tailwindshades.com/#color=222.6605504587156%2C95.6140350877193%2C55.294117647058826&step-up=8&step-down=11&hue-shift=0&name=blue-ribbon&base-stop=5&overrides=e30%3D
        primary: {
          DEFAULT: "#205FFA",
          50: "#D4E0FE",
          100: "#C0D2FE",
          200: "#98B5FD",
          300: "#7098FC",
          400: "#487CFB",
          500: "#205FFA",
          600: "#0543DD",
          700: "#0433A6",
          800: "#02226F",
          900: "#011138",
        },
        // https://www.tailwindshades.com/#color=222.6605504587156%2C6%2C51&step-up=9&step-down=11&hue-shift=0&name=raven&base-stop=5&overrides=e30%3D
        secondary: {
          DEFAULT: "#515661",
          50: "#E0E2E5",
          100: "#D0D2D8",
          200: "#AEB2BC",
          300: "#8D92A0",
          400: "#6D7383",
          500: "#515661",
          600: "#41454E",
          700: "#31343A",
          800: "#202227",
          900: "#101113",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        space: ["var(--font-space-mono)"],
      },
      spacing: {
        half: "50vh",
      },
      minHeight: (theme) => ({
        ...theme("spacing"),
      }),
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        ripple: {
          "0%": { width: "0px", height: "0px", opacity: 0.5 },
          "100%": { width: "500px", height: "500px", opacity: 0 },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        ripple: "ripple 300ms linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    /** @type {import('tailwindcss/types/config').PluginCreator} */
    ({ addUtilities }) => {
      addUtilities({
        ".text-light": {
          color: "#EEF0F2",
        },
        ".text-medium": {
          color: "#A8AABE",
        },
        ".text-dark": {
          color: "#6C707F",
        },
      });
    },
  ],
};
