'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');
var gutil = require('gulp-util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if (baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  /*
   * You can add a proxy to your backend by uncommenting the line bellow.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
   */
  if (gutil.env.local) {
    // no target env. Point to localhost
    server.middleware = proxyMiddleware('/api', {
      target: 'http://0.0.0.0:9000/',
      pathRewrite: {
        // rewrite paths
        '^/api/v1/articles': '/articles'
      },
      proxyTable: {
        // when request.headers.host == 'dev.localhost:3000',
        // override target 'http://www.example.org' to 'http://localhost:8000'
        // 'dev.localhost:3000' : 'http://localhost:8000'
        'hom.dialoga.gov.br': 'http://localhost:9000',
        'login.dialoga.gov.br': 'http://localhost:9000'
      }
    });
  }

  if (gutil.env.production) {
    var host_production = 'http://login.dialoga.gov.br/';
    server.middleware = proxyMiddleware([
        '/api/**',
        '/image_uploads/**'
    ], {
      target: host_production,
      changeOrigin: true,
      proxyTable: {
        'localhost:3000': host_production
      }
    });
  }

  if (gutil.env.staging) {
    var host_staging = 'http://hom.login.dialoga.gov.br/';
    server.middleware = proxyMiddleware([
        '/api/**',
        '/image_uploads/**'
    ], {
      target: host_staging,
      changeOrigin: true,
      proxyTable: {
        'localhost:3000': host_staging
      }
    });
  }

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser,
    ghostMode: false,
    scrollRestoreTechnique: 'cookie'
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function() {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function() {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function() {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function() {
  browserSyncInit(conf.paths.dist, []);
});
