import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: './js/app.js',
  output: {
    file: './js/app.bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    babel({ babelHelpers: 'bundled' }),  
    production && terser(), // minify, in production
  ],
};
