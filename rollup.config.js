import multi from '@rollup/plugin-multi-entry'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/*.js',
  output: {
    file: 'dist/main.js',
    format: 'iife'
  },
  plugins: [multi(), json(), resolve()]
}
