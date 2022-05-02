module.exports = {
  content: [
    "./projects/mf-components/src/**/*.{html,ts,js}",
    "./projects/mf-components/src/app/dynamic-form-builder/**/*.{html,ts,js}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
}
