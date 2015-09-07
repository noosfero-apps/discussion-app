(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalRelated', proposalRelated);

  /** @ngInject */
  function proposalRelated() {

    /** @ngInject */
    function ProposalRelatedController($log) {
      $log.debug('ProposalRelatedController');

      var vm = this;
      vm.$log = $log;

      vm.init();
    }

    ProposalRelatedController.prototype.init = function () {
      // initial values
      // var vm = this;
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/proposal-related/proposal-related.html',
      scope: {
        proposal: '=',
        topic: '=',
        category: '='
      },
      controller: ProposalRelatedController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
