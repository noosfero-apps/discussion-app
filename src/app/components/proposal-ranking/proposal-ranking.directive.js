(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalRanking', proposalRanking);

  /** @ngInject */
  function proposalRanking() {

    /** @ngInject */
    function ProposalRankingController(ArticleService, $scope, $element, $timeout, $log) {
      $log.debug('ProposalRankingController');

      var vm = this;
      vm.ArticleService = ArticleService;
      vm.$scope = $scope;
      vm.$element = $element;
      vm.$timeout = $timeout;
      vm.$log = $log;

      vm.init();
    }

    ProposalRankingController.prototype.init = function () {
      // initial values
      var vm = this;

      vm.activeIndex = 1;
      vm.attachedPopover = false;
      vm.loading = false;

      if(!angular.isNumber(vm.limit)){
        vm.limit = parseInt(vm.limit);
      }

      vm.loadData();
    };

    ProposalRankingController.prototype.loadData = function () {
      // async values
      var vm = this;

      vm.loading = true;

      // simulate delay
      vm.$timeout(function(){
        vm.loading = false;
      }, 2000);
    };

    ProposalRankingController.prototype.switchProposal = function (index) {
      var vm = this;

      if(index > 0 && index <= limit) {
        vm.activeIndex = index;
      }else{
        vm.$log.warn('[switchProposal] "index" not handled:', index);
      }
    };

    ProposalRankingController.prototype.showProposals = function () {
      var vm = this;

      // notify parents - handled by parents
      vm.$scope.$emit('see-proposals');
    };

    ProposalRankingController.prototype.showPopover = function ($event) {
      var vm = this;

      $event.stopPropagation();

      var target = $event.target;
      var elPopover = angular.element(target);

      if(!vm.attachedPopover){
        elPopover.popover({
          html: true,
          placement: 'top',
          animation: true,
          title: 'Regra de posição das propostas',
          content: '<p>É calculada pelo saldo de interações das propostas (curtidas - não curtidas) dividido pela diferença de exibições entre elas.</p><p>O objetivo dessa correção é compensar o saldo de interações e a diferença de exibições das propostas que não tiveram muitas oportunidades de visualização ou das propostas que tiveram mais oportunidades de visualização que a média.</p><p>Com essa correção, é possível comparar propostas que entraram em diferentes momentos, durante todo o período da consulta.</p>'
        });
        vm.attachedPopover = true;
      }


      elPopover.popover('toggle');
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/proposal-ranking/proposal-ranking.html',
      scope: {
        limit: '&',
        display: '='
      },
      controller: ProposalRankingController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
