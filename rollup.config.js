import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import dotenv from 'rollup-plugin-dotenv';
import { terser } from 'rollup-plugin-terser';

const pkg = require('./package.json');

export default {
  input: `src/index.ts`,
  output: [
    {
      file: `lib/index.js`,
      format: 'cjs',
      sourcemap: false,
      plugins: [],
    },
  ],
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    dotenv(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs({ extensions: ['.js', '.ts'] }),

    terser({
      compress: true,
      mangle: {
        keep_classnames: false,
        keep_fnames: false,
      },
    }),
    resolve(),
  ],
};
