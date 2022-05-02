// Añadir en el package.json
// "build:component": "ng build --prod --output-hashing none && node concat-script.js"
const fs = require('fs-extra');
const concat = require('concat');
// Menu App
// const basePath = './dist/mf-menu/'
// const _files = [
//   'polyfills.js',
//   'main.js',
//   '537.js',
//   '26.js',
//   '59.js',
//   '976.js',
//   '692.js',
//   '42.js',
//   '92.js',
//   '18.js',
//   '411.js'
// ];

// Components

const basePath = './dist/mf-components/'
// const _files = [
//   'polyfills.js',
//   'main.js',
//   '761.js',
//   '846.js',
//   '537.js',
//   '26.js',
//   '692.js',
//   '42.js',
//   '92.js',
//   '695.js',
//   '732.js',
//   '26.js',
//   'styles.css'
// ];
const _files = [
  'polyfills.js',
  'main.js',
  '26.js',
  '42.js',
  '59.js',
  '92.js',
  '306.js',
  '398.js',
  '507.js',
  '537.js',
  '692.js',
  '695.js',
  '732.js',
  '734.js',
  '758.js',
  '846.js',
  '976.js',
  'styles.css'
];

build = async () =>{
    const files = _files.map(f => `${basePath}${f}`);
    
      await fs.ensureDir('web-component');
      await concat(files, 'web-component/mf-components.js');
}
build();