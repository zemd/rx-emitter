'use strict';

export default [{
  entry: './index.js',
  dest: './es6/common/index.js',
  format: 'cjs',
  external: [
    'rxjs/Subject',
  ],
  interop: false,
}];
