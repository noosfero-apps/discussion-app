(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalGrid', proposalGrid);

  /** @ngInject */
  function proposalGrid() {

    /** @ngInject */
    function ProposalGridController($scope, $rootScope, $element, $location, $filter, $log) {
      $log.debug('ProposalGridController');

      // alias
      var vm = this;

      // dependencies
      vm.$scope = $scope;
      vm.$rootScope = $rootScope;
      vm.$element = $element;
      vm.$location = $location;
      vm.$filter = $filter;
      vm.$log = $log;

      // initialization
      vm.init();
      vm.attachListeners();
    }

    ProposalGridController.prototype.init = function() {
      // var vm = this;
    };

    ProposalGridController.prototype.attachListeners = function() {
      // var vm = this;
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/proposal-grid/proposal-grid.html',
      scope: {
        proposals: '='
      },
      controller: ProposalGridController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }
})();
