module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        chrome: {
          "50": "#EFF1F6",
          "100": "#DEE3ED",
          "200": "#BDC6DB",
          "300": "#9DAAC8",
          "400": "#7C8DB6",
          "500": "#5D73A5",
          "600": "#495A83",
          "700": "#374462",
          "800": "#242D42",
          "900": "#121721"
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
