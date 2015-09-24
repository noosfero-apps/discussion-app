(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('appHeader', appHeader);

  /** @ngInject */
  function appHeader() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/app-header/app-header.html'
    };

    return directive;
  }
})();
