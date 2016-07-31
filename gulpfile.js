var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var webpack = require('webpack');
var gutil = require("gulp-util");
var clean = require('gulp-clean');
var webpackDevServer = require('webpack-dev-server');
var devConfig = require('./webpack.dev.config.js');
var prodConfig = require('./webpack.prod.config.js');
var ts = require("gulp-typescript");
const babel = require('gulp-babel');

require('babel-register');
gulp.task('test', function(){
    nodemon({
    script:'tests.js',
     execMap: {
      js: 'node --harmony'
    },
    ext: 'js'
  });
})
gulp.task('serve', function () {
  new webpackDevServer(webpack(devConfig),devConfig.devServer).listen(process.env.HMRPORT || 3000 ,function(){
    console.log('webpack server run at ' + (process.env.HMRPORT || 3000));
  })

  // nodemon({
  //   script:'dev-server.js',
  //    execMap: {
  //     js: 'node --harmony'
  //   },
  //   ext: 'js'
  // })

});

gulp.task('clean',function (){
  return gulp.src('./dist')
    .pipe(clean());
});
gulp.task('copy:styles',function(){
  return gulp.src('./src/**/*.*scss',{base:'./src'})
    .pipe(gulp.dest('./dist'))
})
gulp.task('copy:assets',function(){
  return gulp.src('./src/assets/fonts/**/*',{base:'./src'})
    .pipe(gulp.dest('./dist'))
})
gulp.task('copy:meta',function(){
  return gulp.src('./package.json')
    .pipe(gulp.dest('./dist'));
})
// gulp.task('build:server',['copy:styles','copy:assets','copy:meta'],function(){
//     var tsProject = ts.createProject('./tsconfig.json');
//     var tsResult = gulp.src('./src/**/*.ts*')
//         .pipe(ts(tsProject));
//     // TODO: create Babel6 transpiler build stream ES6 > ES5
//     return tsResult.js
//           // .pipe(babel({
//           //         plugins: ['transform-runtime', 'syntax-decorators', 'decorator-metadatax'],
//           //         presets: ["react", "es2015" , "stage-3"]
//           //     }))
//           .pipe(gulp.dest("dist"));
// });
gulp.task('build:html',function(){
  return gulp.src('./src/index.html',{base:'./src'})
    .pipe(gulp.dest('./dist'))
})
gulp.task('build',['build:html','copy:assets'], function(callback){
    webpack(prodConfig, function(err, stats){
      if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        if(callback)
          callback();
    });
});


var path = require('path');
var ftp = require('vinyl-ftp');
var minimist = require('minimist');

// ftp://203.151.27.63/web/thesecretfarm.com/public_html/cheerup
gulp.task('deploy', function() {
  var remotePath = '/web/thesecretfarm.com/public_html/cheerup/';
  var conn = ftp.create({
    host: '203.151.27.63',
    port:21,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    log: gutil.log
  });

  return gulp.src(['./dist/**/*'])
    .pipe(conn.newer(remotePath))
    .pipe(conn.dest(remotePath));
});
