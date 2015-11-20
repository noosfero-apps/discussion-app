(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalCarousel', proposalCarousel);

  /** @ngInject */
  function proposalCarousel() {

    /** @ngInject */
    function ProposalCarouselController($scope, $state, $element, $timeout, $log) {
      $log.debug('ProposalCarouselController');

      var vm = this;
      vm.$scope = $scope;
      vm.$state = $state;
      vm.$element = $element;
      vm.$timeout = $timeout;
      vm.$log = $log;

      vm.init();
    }

    ProposalCarouselController.prototype.init = function () {
      // initial values
      var vm = this;

      if(!vm.proposals){
        throw { name: 'NotDefined', message: 'The attribute "proposals" is undefined.'};
      }

      vm.activeIndex = 0;
      vm.archived = vm.archived || false;
      vm.loading = false;
      vm.proposalsLength = vm.proposals.length;
    };

    ProposalCarouselController.prototype.swipeLeft = function () {
      var vm = this;

      vm.activeIndex = (vm.activeIndex < vm.proposalsLength - 1) ? ++vm.activeIndex : 0;
    };

    ProposalCarouselController.prototype.swipeRight = function () {
      var vm = this;

      vm.activeIndex = (vm.activeIndex > 0) ? --vm.activeIndex : vm.proposalsLength - 1;
    };

    ProposalCarouselController.prototype.switchProposal = function (index) {
      var vm = this;

      if(index >= 0 && index < vm.proposalsLength) {
        vm.activeIndex = index;
      }else{
        vm.$log.warn('[switchProposal] "index" not handled:', index);
      }
    };

    ProposalCarouselController.prototype.showProposalsList = function () {
      var vm = this;

      // notify parents - handled by parents
      vm.$scope.$emit('proposal-carousel:showProposalsList');
    };

    ProposalCarouselController.prototype.showContent = function (proposal) {
      var vm = this;

      vm.$state.go('programa', {
        slug: proposal.parent.slug,
        proposal_id: proposal.id
      }, {
        location: true,
        reload: true
      });
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/proposal-carousel/proposal-carousel.html',
      scope: {
        archived: '=',
        proposals: '='
      },
      controller: ProposalCarouselController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
