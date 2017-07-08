'use strict';

const babel = require('rollup-plugin-babel');

export default [{
  entry: './index.js',
  dest: './es5/common/index.js',
  format: 'cjs',
  external: [
    'rxjs/Subject',
  ],
  interop: false,
  plugins: [
    babel({
      presets: [
        ['es2015', { modules: false }],
      ],
    }),
  ],
}];
