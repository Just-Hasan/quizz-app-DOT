/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".autofill-bg-transparent": {
          "&:-webkit-autofill": {
            "background-color": "transparent !important",
            "-webkit-box-shadow": "0 0 0px 1000px transparent inset",
            "-webkit-text-fill-color": "white !important",
          },
          "&:-moz-autofill": {
            "background-color": "transparent !important",
            "-moz-box-shadow": "0 0 0px 1000px transparent inset",
            color: "white !important",
          },
          "&:-webkit-autofill:hover": {
            "background-color": "transparent !important",
            "-webkit-box-shadow": "0 0 0px 1000px transparent inset",
            "-webkit-text-fill-color": "white !important",
          },
          "&:-webkit-autofill:focus": {
            "background-color": "transparent !important",
            "-webkit-box-shadow": "0 0 0px 1000px transparent inset",
            "-webkit-text-fill-color": "white !important",
          },
          "&:-moz-autofill:hover": {
            "background-color": "transparent !important",
            "-moz-box-shadow": "0 0 0px 1000px transparent inset",
            color: "white !important",
          },
          "&:-moz-autofill:focus": {
            "background-color": "transparent !important",
            "-moz-box-shadow": "0 0 0px 1000px transparent inset",
            color: "white !important",
          },
        },
      });
    },
  ],
};
