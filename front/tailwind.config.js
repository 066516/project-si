/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  theme: {
    extend: {
      colors: {
        blueBg: "#453DE0",
        purple: "rgba(153, 102, 255, 1)",
        smaoy: "rgba(75, 192, 192, 1)",
        blue2: "rgba(54, 162, 235, 1)",
        red2: "rgba(255, 99, 132, 1)",
      },
      boxShadow: {
        t: "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)", // top
        r: "4px 0 6px -1px rgba(0, 0, 0, 0.1), 2px 0 4px -1px rgba(0, 0, 0, 0.06)", // right
        b: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // bottom
        l: "-4px 0 6px -1px rgba(0, 0, 0, 0.1), -2px 0 4px -1px rgba(0, 0, 0, 0.06)", // left
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
