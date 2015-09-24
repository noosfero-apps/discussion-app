(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalStats', proposalStats);

  /** @ngInject */
  function proposalStats() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/proposal-stats/proposal-stats.html'
      // no scope. Use the parent scope.
    };

    return directive;
  }

})();
