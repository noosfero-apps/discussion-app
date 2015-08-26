'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var gulpif = require('gulp-if');
var sprity = require('sprity');

gulp.task('sprites', function () {
  var src = [
  	path.join(conf.paths.src, '/assets/images/icons/*.png'),
	path.join('!' + conf.paths.src, '/assets/images/icons/sprite.png')
  ];
  var destCss = path.join(conf.paths.tmp, '/serve/app/');
  var destImg = path.join(conf.paths.src, '/assets/images/icons');

  return sprity.src({
    src: src,
    style: 'sprite.css',
    cssPath: '../assets/images/icons/'
  })
  .pipe(gulpif('*.png', gulp.dest(destImg), gulp.dest(destCss)));
});
