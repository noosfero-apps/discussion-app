'use strict';

var path = require('path');
var conf = require('./gulp/conf');

var _ = require('lodash');
var wiredep = require('wiredep');

function listFiles() {
  var wiredepOptions = _.extend({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true
  });

  return wiredep(wiredepOptions).js
  .concat([
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join(conf.paths.src, '/**/*.spec.js'),
    path.join(conf.paths.src, '/**/*.mock.js'),
    path.join(conf.paths.src, '/**/*.html')
    ]);
}

module.exports = function(config) {

  var configuration = {
    files: listFiles(),

    singleRun: true,

    autoWatch: false,

    frameworks: ['jasmine', 'angular-filesort'],

    angularFilesort: {
      whitelist: [path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).js')]
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'dialoga'
    },

    browsers : ['PhantomJS'],

    plugins : [
    'karma-jasmine',
    'karma-coverage',
    'karma-angular-filesort',
    'karma-ng-html2js-preprocessor',
    'karma-phantomjs-launcher',
    'karma-chrome-launcher',
    'karma-firefox-launcher'
    ],

    preprocessors: {
      'src/**/*.html': ['ng-html2js'],
      'src/app/**/*.js': ['coverage']
    },
    
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'lcov', // HTML + LCOV
      // type : 'cobertura', // supported by jenkins
      dir : 'coverage/'
    }
  };

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if(configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);
};
