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
    capabilities: {
      'browserName': 'chrome'
    },

    chromeOnly: true,

    // onPrepare: function() {
    //   browser.driver.manage().window().setSize(1600, 800);
    // },

    baseUrl: 'http://0.0.0.0:3000',

    rootElement: '[ng-app]',

    // The timeout in milliseconds for each script run on the browser. This should
    // be longer than the maximum time your application needs to stabilize between
    // tasks.
    allScriptsTimeout: 11000,

    // How long to wait for a page to load.
    getPageTimeout: 10000,

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
