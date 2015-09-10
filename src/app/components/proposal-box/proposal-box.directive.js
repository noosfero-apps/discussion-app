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
      if (!vm.focus) { vm.focus = false; }

    };

    ProposalBoxController.prototype.showContent = function (slug) {
      var vm = this;

      vm.$state.go('programa', {
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
        vote: '=',
        focus: '@'
        // @ -> Text binding / one-way binding
        // = -> Direct model binding / two-way binding
        // & -> Behaviour binding / Method binding
      },
      controller: ProposalBoxController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
