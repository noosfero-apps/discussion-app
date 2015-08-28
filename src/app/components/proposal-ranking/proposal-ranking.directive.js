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
      vm.loading = false;

      if(angular.isDefined(vm.limit) && angular.isString(vm.limit)){
        vm.limit = parseInt(vm.limit);
      }else{
        vm.limit = 3;
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

        // Fake Data
        // vm.proposals = vm.ArticleService.getProposals();
        vm.proposals = [{
          id: 4159,
          abstract: 'Ut odio unde porro in. Aut fuga magni adipisci. Recusandae ipsum distinctio omnis ut illum.',
          effective_support: 0.1572052401746725,
          hits: 4159,
          votes_against: 3779,
          votes_for: 1780
        },{
          id: 935,
          abstract: 'Magni sunt ut molestiae. A porro et quod saepe placeat amet nihil. Aut ut id voluptatem doloribus quia.',
          effective_support: 0.1572052401746725,
          hits: 8602,
          votes_against: 7005,
          votes_for: 8728
        },{
          id: 1008,
          abstract: 'Cum quas assumenda nihil delectus eos. Minus fugit velit voluptatem nisi nam esse ut id.',
          effective_support: 0.1572052401746725,
          hits: 9181,
          votes_against: 612,
          votes_for: 1786
        }];

        if(vm.display === 'list'){
          // wait until DOM be created
          vm.$timeout(function(){
            attachPopover.call(vm);
          }, 20);
        }
      }, 2000);
    };

    ProposalRankingController.prototype.switchProposal = function (index) {
      var vm = this;

      if(index > 0 && index <= vm.limit) {
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

    function attachPopover(){
      var vm = this;

      vm.popover = angular.element(vm.$element.find('.btn-question'));
      vm.popover.popover({
        html: true,
        placement: 'top',
        animation: true,
        title: 'Regra de posição das propostas',
        content: '<p>É calculada pelo saldo de interações das propostas (curtidas - não curtidas) dividido pela diferença de exibições entre elas.</p><p>O objetivo dessa correção é compensar o saldo de interações e a diferença de exibições das propostas que não tiveram muitas oportunidades de visualização ou das propostas que tiveram mais oportunidades de visualização que a média.</p><p>Com essa correção, é possível comparar propostas que entraram em diferentes momentos, durante todo o período da consulta.</p>'
      });
    }

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
