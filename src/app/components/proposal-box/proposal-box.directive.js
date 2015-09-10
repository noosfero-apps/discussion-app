(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalBox', proposalBox);

  /** @ngInject */
  function proposalBox() {

    /** @ngInject */
    function ProposalBoxController($scope, $state, STATUS_VOTE, $log) {
      $log.debug('ProposalBoxController');

      var vm = this;
      vm.$scope = $scope;
      vm.$state = $state;
      vm.$log = $log;
      vm.STATUS_VOTE = STATUS_VOTE;

      vm.init();
      vm.addListeners();
    }

    ProposalBoxController.prototype.init = function () {

      var vm = this;

      vm.canVote = vm.canVote || false;
      vm.focus = vm.focus || false;
      vm.STATE = null;
    };

    ProposalBoxController.prototype.addListeners = function () {
      var vm = this;

      vm.$scope.$on('proposal-vote:success', function(e, data){
        vm.STATE = vm.STATUS_VOTE.SUCCESS;
        vm.message = data.message;
      });

      vm.$scope.$on('proposal-vote:error', function(e, data){
        vm.STATE = vm.STATUS_VOTE.ERROR;
        vm.message = data.message;
      });
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

    ProposalBoxController.prototype.voteUp = function () {
      var vm = this;

      vm.STATE = vm.STATUS_VOTE.LOADING;
      vm.$scope.$emit('proposal-vote:voteUp', vm.proposal.id);
      vm.$log.debug('Sending vote');
    };

    ProposalBoxController.prototype.voteDown = function () {
      var vm = this;

      vm.STATE = vm.STATUS_VOTE.LOADING;
      vm.$scope.$emit('proposal-vote:voteDown', vm.proposal.id);
      vm.$log.debug('Sending vote');
    };

    ProposalBoxController.prototype.next = function () {
      var vm = this;

      vm.STATE = vm.STATUS_VOTE.LOADING;
      vm.$scope.$emit('proposal-vote:next', vm.proposal.id);
      vm.$log.debug('Sending vote');
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/proposal-box/proposal-box.html',
      scope: {
        proposal: '=',
        topic: '=',
        category: '=',
        canVote: '=',
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
