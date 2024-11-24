/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        apple: {
          50: "#f0fdf1",
          100: "#ddfbe0",
          200: "#bdf5c4",
          300: "#8aeb96",
          400: "#50d862",
          500: "#28bf3c",
          600: "#1ead31",
          700: "#197c27",
          800: "#196224",
          900: "#16511f",
          950: "#072c0d",
        },
      },
    },
  },
  plugins: [],
};
