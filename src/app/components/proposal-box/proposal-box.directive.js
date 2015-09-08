(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalBox', proposalBox);

  /** @ngInject */
  function proposalBox() {

    /** @ngInject */
    function ProposalBoxController($state, $log) {
      $log.debug('ProposalBoxController');

      var vm = this;
      vm.$state = $state;
      vm.$log = $log;

      vm.init($log);
    }

    ProposalBoxController.prototype.init = function () {

      var vm = this;

      if (!vm.vote) { vm.vote = false; }

    };

    ProposalBoxController.prototype.showContent = function (slug) {
      var vm = this;

      vm.$state.go('programa-conteudo', {
        slug: slug,
        proposal_id: vm.proposal.id
      }, {
        location: true
      });
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/proposal-box/proposal-box.html',
      scope: {
        proposal: '=',
        topic: '=',
        category: '=',
        vote: '='
      },
      controller: ProposalBoxController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
