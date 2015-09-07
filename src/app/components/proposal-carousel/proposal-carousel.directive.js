(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalCarousel', proposalCarousel);

  /** @ngInject */
  function proposalCarousel() {

    /** @ngInject */
    function ProposalCarouselController($scope, $element, $timeout, $log) {
      $log.debug('ProposalCarouselController');

      var vm = this;
      vm.$scope = $scope;
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

    ProposalCarouselController.prototype.showProposals = function () {
      var vm = this;

      // notify parents - handled by parents
      vm.$scope.$emit('proposal-carousel:toProposals');
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/proposal-carousel/proposal-carousel.html',
      scope: {
        proposals: '='
      },
      controller: ProposalCarouselController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();