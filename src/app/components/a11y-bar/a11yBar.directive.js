(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('a11yBar', a11yBar);

  /** @ngInject */
  function a11yBar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/a11y-bar/a11y-bar.html'
    };

    return directive;

  }

})();
