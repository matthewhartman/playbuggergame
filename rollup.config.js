import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import postcssurl from 'postcss-url';
import autoprefixer from 'autoprefixer';
import url from '@rollup/plugin-url';

export default {
  input: './src/js/index.js',
  output: {
    file: './tmp/index.js',
    format: 'iife',
    name: 'bugger'
  },
  plugins: [
    commonjs({
      transformMixedEsModules: true
    }),
    terser(),
    resolve(),
    url({
      limit: 10000 * 1024,
      include: ['**/*.svg', '**/*.mp3'],
      emitFiles: true
    }),
    postcss({
      plugins: [
        autoprefixer(),
        postcssurl({ url: 'inline' })
      ]
    })
  ]
}