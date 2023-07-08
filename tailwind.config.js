/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Aboreto: ["Aboreto"],
        Montserrat: ["Montserrat"],
        PoiretOne: ["Poiret One"],
      },
      animation: {
        tilt: "tilt 10s infinite linear",
        appear: "appear 0.5s ease-in-out",
        appearLong: "appear 1s ease-in-out",
      },
      keyframes: {
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(1.5deg)",
          },
          "75%": {
            transform: "rotate(-1.5deg)",
          },
        },
        appear: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        appearLong: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
