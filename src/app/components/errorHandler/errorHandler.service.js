(function() {
  'use strict';

  angular
    .module('dialoga')
    .service('ErrorService', ErrorService);

  /** @ngInject */
  function ErrorService(){
    var service = {
      paramRequired: paramRequired
    };

    return service;

    function paramRequired(paramName){
      return 'param required: ' + paramName;
    }
  }
})();
