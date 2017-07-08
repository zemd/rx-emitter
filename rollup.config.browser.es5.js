'use strict';

const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

export default [{
  entry: './index.js',
  dest: './es5/umd/index.js',
  format: 'umd',
  external: [
    'rxjs/Subject',
  ],
  globals: {
    ['rxjs/Subject']: 'Subject',
  },
  interop: false,
  moduleName: 'rx-emitter',
  plugins: [
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
    }),
    commonjs(),
    babel({
      presets: [
        ['es2015', { modules: false }],
      ],
      plugins: [
        'external-helpers',
      ],
    }),
  ],
}];
