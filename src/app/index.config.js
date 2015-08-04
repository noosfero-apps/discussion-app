(function() {
  'use strict';

  angular
    .module('dialoga')
    .config(configRestangular)
    .config(config);

  /** @ngInject */
  function configRestangular(RestangularProvider, api) {
    RestangularProvider.setBaseUrl(api.host);
    RestangularProvider.setDefaultRequestParams({ apiKey: api.token });
  }

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
  }

})();
