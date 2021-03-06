'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'dialoga',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    // production
    .pipe($.if($.util.env.production, $.replace('$logProvider.debugEnabled(true);', '$logProvider.debugEnabled(false);')))
    .pipe($.if($.util.env.production, $.replace('http://hom.dialoga.gov.br', 'http://dialoga.gov.br')))
    .pipe($.if($.util.env.production, $.replace('http://hom.login.dialoga.gov.br', 'http://login.dialoga.gov.br')))
    // staging
    .pipe($.if($.util.env.staging, $.replace('http://dialoga.gov.br', 'http://hom.dialoga.gov.br')))
    .pipe($.if($.util.env.staging, $.replace('http://login.dialoga.gov.br', 'http://hom.login.dialoga.gov.br')))
    .pipe($.ngAnnotate())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.replace('../../bower_components/bootstrap-sass-official/assets/fonts/bootstrap/', '../fonts/'))
    .pipe($.replace('../../bower_components/open-sans-fontface/fonts/', '../fonts/'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    // production
    .pipe($.if($.util.env.production, $.replace('<!-- INJECT-GOOGLE-ANALYTICS -->', ([
      '<script>',
      '  (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){',
      '  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),',
      '  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)',
      '  })(window,document,"script","//www.google-analytics.com/analytics.js","ga");',
      '  ga("create", "UA-68205875-1", "auto");',
      '  ga("send", "pageview");',
      '</script>'
      ]).join('\n'))))
    // staging
    // .pipe($.if($.util.env.staging, $.replace('<!-- INJECT-GOOGLE-ANALYTICS -->', '')))
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', ['fonts-bootstrap', 'fonts-opensans']);

gulp.task('fonts-bootstrap', function () {
  return gulp.src([
      'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/**/*'
    ])
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('fonts-opensans', function () {
  return gulp.src([
      'bower_components/open-sans-fontface/fonts/**/*'
    ])
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    // .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/styles/fonts/')));
});

gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function (done) {
  $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], done);
});

gulp.task('build', ['html', 'fonts', 'other']);
