(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('appFooter', appFooter);

  /** @ngInject */
  function appFooter() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/app-footer/app-footer.html'
    };

    return directive;
  }
})();
