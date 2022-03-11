const path = require('path');
// const webpack = require('webpack');
const PrettierPlugin = require("prettier-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

var babelOptions = {
  presets: [
    ['@babel/env', {
      targets: {
        android: '4.4',
        ie: 6,
      },
      bugfixes: true,
      spec: true,
      modules: false,
      debug: false,
      useBuiltIns: false,
    }],
  ],
  "plugins": [["@babel/plugin-transform-arrow-functions", { "spec": true }]]
};

module.exports = {
  mode: "production",
  devtool: 'source-map',
  entry: './src/lib/index.ts',
  target: 'es5',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    globalObject: `typeof self !== 'undefined' ? self : this`,
    library: "MonoUtils",
    libraryTarget: 'commonjs',
    chunkFormat: 'commonjs',
    clean: true,
    environment: {
      // The environment supports arrow functions ('() => { ... }').
      arrowFunction: false,
      // The environment supports BigInt as literal (123n).
      bigIntLiteral: false,
      // The environment supports const and let for variable declarations.
      const: false,
      // The environment supports destructuring ('{ a, b } = obj').
      destructuring: false,
      // The environment supports an async import() function to import EcmaScript modules.
      dynamicImport: false,
      // The environment supports 'for of' iteration ('for (const x of array) { ... }').
      forOf: false,
      // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
      module: false,
      // The environment supports optional chaining ('obj?.a' or 'obj?.()').
      optionalChaining: false,
      // The environment supports template literals.
      templateLiteral: false,
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: false }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(m|j|t)s$/,
        // exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          }, {
            loader: 'ts-loader',
            options: {
              allowTsInNodeModules: true
            },
          }
        ],
      },
    ]
  },
  plugins: [
    new PrettierPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: { "stream": false, "http": false, "url": false, "https": false, "zlib": false }
  }
};