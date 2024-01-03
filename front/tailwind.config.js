/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blueBg: "#453DE0",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
