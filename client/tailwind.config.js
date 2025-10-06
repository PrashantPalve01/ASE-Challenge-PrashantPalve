// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef9ff",
          100: "#d9f0ff",
          200: "#bce5ff",
          300: "#8cd6ff",
          400: "#54c1ff",
          500: "#1ea7ff",
          600: "#0b88e6",
          700: "#086ab4",
          800: "#0a598f",
          900: "#0d4a74",
        },
      },
      boxShadow: {
        card: "0 10px 25px -10px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};
