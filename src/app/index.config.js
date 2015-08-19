(function() {
  'use strict';

  angular
    .module('dialoga')
    .config(configAuthInterceptor)
    .config(configLocationProvider)
    .config(config);

  /** @ngInject */
  function configAuthInterceptor ($httpProvider){

    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    // $httpProvider.defaults.useXDomain = true;
    // $httpProvider.defaults.headers.common = {Accept: 'application/json, text/plain, */*'};
    // $httpProvider.defaults.headers.post = {'Content-Type': "application/json;charset=utf-8"};
    $httpProvider.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'};
    // $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  }

  /** @ngInject */
  function configLocationProvider ($locationProvider, Modernizr) {
    if (Modernizr.history) {
      $locationProvider.html5Mode(true);
    }
  }

  /** @ngInject */
  function config($logProvider) {

    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
