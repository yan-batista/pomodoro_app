/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        blue: "#1E213F",
        dark_blue: "#161932",
        darker_blue: "#141732",
        light_blue: "#292D53",
        text: "#D7E0FF",
        dark_text: "#5E647F",
        light_text: "#A5A6B2",
        icon: "#79809D",
        accent_red: "#F87070",
        accent_cyan: "#70F3F8",
        accent_purple: "#D881F8",
        input_color: "#EFF1FA",
      },
      fontFamily: {
        kumbh: ["Kumbh Sans", "sans-serif"],
        roboto_slab: ["Roboto Slab", "serif"],
        space_mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
