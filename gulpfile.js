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
  return gulp.src('./src/assets/**/*',{base:'./src'})
    .pipe(gulp.dest('./dist'))
})
gulp.task('copy:meta',function(){
  return gulp.src('./package.json')
    .pipe(gulp.dest('./dist'));
})
gulp.task('build:server',['copy:styles','copy:assets','copy:meta'],function(){
    var tsProject = ts.createProject('./tsconfig.json');
    var tsResult = gulp.src('./src/**/*.ts*')
        .pipe(ts(tsProject));
    // TODO: create Babel6 transpiler build stream ES6 > ES5
    return tsResult.js
          // .pipe(babel({
          //         plugins: ['transform-runtime', 'syntax-decorators', 'decorator-metadatax'],
          //         presets: ["react", "es2015" , "stage-3"]
          //     }))
          .pipe(gulp.dest("dist"));
});

gulp.task('build',['build:server'], function(callback){
    webpack(prodConfig, function(err, stats){
      if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        if(callback)
          callback();
    });
});