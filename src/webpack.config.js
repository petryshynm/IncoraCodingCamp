'use strict';

let path = require('path');

module.exports = {
  mode: 'production',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: path.dirname(__dirname) + '/dist/js'
  },
  watch: true,
  devtool: "source-map",
  module: {}
};