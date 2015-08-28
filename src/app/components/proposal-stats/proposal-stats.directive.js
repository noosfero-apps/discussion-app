(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalStats', proposalStats);

  /** @ngInject */
  function proposalStats() {

    /** @ngInject */
    function ProposalStatsController($log) {
      $log.debug('ProposalStatsController');

      var vm = this;
      vm.$log = $log;

      vm.init();
    }

    ProposalStatsController.prototype.init = function () {
      // initial values
      var vm = this;

      vm.views = vm.views ? parseInt(vm.views) : 0;
      vm.up = vm.up ? parseInt(vm.up) : 0;
      vm.down = vm.down ? parseInt(vm.down) : 0;

      vm.loadData();
    };

    ProposalStatsController.prototype.loadData = function () {
      // async values
      // var vm = this;
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/proposal-stats/proposal-stats.html',
      scope: {
        views: '&',
        up: '&',
        down: '&'
      },
      controller: ProposalStatsController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
