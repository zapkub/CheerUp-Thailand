var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin()
  ],
  entry: [
    'babel-polyfill',
    'mocha!./tests/main.spec.ts'
  ],
  resolve: {
    modulesDirectories: ['src', 'node_modules', 'shared'],
    extensions: ['','.js','.tsx', '.ts','.json', '.scss','.es6', '.babel', '.node']
  },
  output: {
    publicPath: '/',
    path:path.join(__dirname, '/test'),
    filename: 'test.js',
  },
  module: {
    loaders: [
      {
        test:/\.jpg$/,
        exclude:/node_modules/,
        loaders:['file-loader']
      },
      {
        test:/\.png$/,
        exclude:/node_modules/,
        loaders:['file-loader']
      },
      {
        test: /\.ts$/,
        loaders: ['babel', 'ts-loader'],
        // include: [path.join(__dirname, './tests/*')],
      }
    ]
  },
  postcss: [autoprefixer({
    browsers: ['last 2 versions']
  })],
  externals:{
      // 'cheerio': 'window',
      // 'react/addons': true,
      // 'react/lib/ExecutionEnvironment': true,
      // 'react/lib/ReactContext': true
  }
}