var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.tsx'
  ],
  output: {
    libraryTarget:"var",
    path: path.join(__dirname, 'dist/bundle'),
    publicPath: 'bundle/',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules', 'shared'],
    extensions: ['','.js','.tsx', '.ts','.json', '.scss','.es6', '.babel', '.node','.jpg']
  },
  externals: [
    'resolve-from'
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        // loader: "style!css!postcss-loader!sass"
        loader: "style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass"
      },
      {
        exclude: /node_modules/,
        test: /\.nomodscss$/,
        loader: "style!css!postcss-loader!sass"
      },
      {
        test: /\.css$/,
        loader: "style!css!postcss-loader!sass"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['babel', 'ts-loader']
      },
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
      { test: /\.node$/, loader: 'node' },
      // { test: /tests|server$/, loaders: ['ignore'] }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env":{
        'NODE_ENV': JSON.stringify('production'),
        PRODUCTION: true,
        BROWSER: JSON.stringify(true)
      }
    })
  ]
};
