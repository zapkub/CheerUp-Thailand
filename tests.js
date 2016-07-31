var webpack = require('webpack');
var webpackConfig = require('./webpack.test.config.js');
var WebpackDevServer = require('webpack-dev-server');


new WebpackDevServer(webpack(webpackConfig), {
  publicPath: '/',
  hot: true,
  stats: 'errors-only',
}).listen(3100, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
});
