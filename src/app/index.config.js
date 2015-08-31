(function() {
  'use strict';

  angular
    .module('dialoga')
    .config(configHeadersInterceptor)
    .config(configLocationProvider)
    .config(configBreadcrumbProvider)
    .config(config);

  /** @ngInject */
  function configHeadersInterceptor ($httpProvider){

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
  function configBreadcrumbProvider($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      prefixStateName: 'inicio',
      templateUrl: 'app/components/breadcrumb/template.html'
    });
  }

  /** @ngInject */
  function config($logProvider) {

    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
