/* globals require, exports*/
(function(){
  'use strict';

  var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;

  // An example configuration file.
  exports.config = {
    // The address of a running selenium server.
    //seleniumAddress: 'http://0.0.0.0:4444/wd/hub',
    //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

    // Capabilities to be passed to the webdriver instance.
    //
    // Ref.: https://github.com/angular/protractor/blob/master/docs/browser-setup.md
    // chrome, phantomjs, firefox

    // capabilities: {
    //   'browserName': 'phantomjs'
    // },

    multiCapabilities: [
    // {'browserName': 'firefox'},
    // {'browserName': 'chrome'}
    {'browserName': 'phantomjs'}
    ],

    chromeOnly: true,

    onPrepare: function() {
      /* global angular: false, browser: false */

      // Disable animations so e2e tests run more quickly
      var disableNgAnimate = function() {
        angular.module('disableNgAnimate', []).run(['$animate', function($animate) {
          $animate.enabled(false);
        }]);
      };

      browser.addMockModule('disableNgAnimate', disableNgAnimate);

      // Disable debug info
      // var disableDebugInfo = function() {
      //   angular.module('disableDebugInfo', []).run(['$compileProvider', function($compileProvider) {
      //     $compileProvider.debugInfoEnabled(false);
      //   }]);
      // };
      // browser.addMockModule('disableDebugInfo', disableDebugInfo);

      // Store the name of the browser that's currently being used.
      browser.getCapabilities().then(function(caps) {
        browser.params.browser = caps.get('browserName');
      });

      browser.driver.manage().window().setSize(1400, 400);
    },

    baseUrl: 'http://0.0.0.0:3000',

    rootElement: '[ng-app]',

    // The timeout in milliseconds for each script run on the browser. This should
    // be longer than the maximum time your application needs to stabilize between
    // tasks.
    allScriptsTimeout: 15000,

    // How long to wait for a page to load.
    getPageTimeout: 12000,

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: [paths.e2e + '/**/*.js'],

    // Options to be passed to Jasmine-node.
    'framework': 'jasmine2',
    jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 30000
    },

    plugins: [{
      path: 'node_modules/gulp-protractor/node_modules/protractor/plugins/accessibility',
      chromeA11YDevTools: {
        treatWarningsAsFailures: true
      }
    }, {
      path: 'node_modules/gulp-protractor/node_modules/protractor/plugins/ngHint'
    }]
  };
})();
