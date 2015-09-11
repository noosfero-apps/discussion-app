(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalBox', proposalBox);

  /** @ngInject */
  function proposalBox() {

    /** @ngInject */
    function ProposalBoxController($scope, $state, VOTE_STATUS, VOTE_OPTIONS, $log) {
      $log.debug('ProposalBoxController');

      var vm = this;
      vm.$scope = $scope;
      vm.$state = $state;
      vm.VOTE_STATUS = VOTE_STATUS;
      vm.VOTE_OPTIONS = VOTE_OPTIONS;
      vm.$log = $log;

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

      vm.$scope.$on('proposal-box:vote-response', function(e, data){
        if(data.success) {
          vm.STATE = vm.VOTE_STATUS.SUCCESS;
        }
        
        if(data.error) {
          vm.STATE = vm.VOTE_STATUS.ERROR;
          
        }
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

      vm.STATE = vm.VOTE_STATUS.LOADING;
      vm.$scope.$emit('proposal-box:vote', {
        OPTION: vm.VOTE_OPTIONS.UP,
        proposal_id: vm.proposal.id
      });
      vm.$log.debug('Sending vote');
    };

    ProposalBoxController.prototype.voteDown = function () {
      var vm = this;

      vm.STATE = vm.VOTE_STATUS.LOADING;
      vm.$scope.$emit('proposal-box:vote', {
        OPTION: vm.VOTE_OPTIONS.DOWN,
        proposal_id: vm.proposal.id
      });
      vm.$log.debug('Sending vote');
    };

    ProposalBoxController.prototype.skip = function () {
      var vm = this;

      vm.STATE = vm.VOTE_STATUS.LOADING;
      vm.$scope.$emit('proposal-box:vote', {
        OPTION: vm.VOTE_OPTIONS.SKIP,
        proposal_id: vm.proposal.id
      });
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
