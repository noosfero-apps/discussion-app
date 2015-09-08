(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalList', proposalList);

  /** @ngInject */
  function proposalList() {

    /** @ngInject */
    function ProposalListController(ArticleService, $scope, $element, $timeout, $log) {
      $log.debug('ProposalListController');

      var vm = this;
      vm.ArticleService = ArticleService;
      vm.$scope = $scope;
      vm.$element = $element;
      vm.$timeout = $timeout;
      vm.$log = $log;

      vm.init();

      vm.loadData();
    }

    ProposalListController.prototype.init = function () {
      // initial values
      var vm = this;

      if(!vm.proposals){
        throw { name: 'NotDefined', message: 'The attribute "proposals" is undefined.'};
      }

      if(!vm.per_page){
        vm.per_page = 5;
      }

      vm.proposalsPerPage = vm.getProposalsPerPage(0);

      vm.proposalsLength = vm.proposals.length;
    };

    ProposalListController.prototype.loadData = function () {
      // async values
      var vm = this;

      // requeue to wait until DOM be created
      vm.$timeout(function(){
        attachPopover.call(vm);
      }, 1000);
    };

    ProposalListController.prototype.getProposalsPerPage = function (pageIndex) {
      var vm = this;

      var initialIndex = pageIndex * vm.per_page;
      var finalIndex = initialIndex + vm.per_page;

      return vm.proposals.slice(initialIndex, finalIndex);
    };

    ProposalListController.prototype.showPage = function (pageIndex) {
      var vm = this;
      vm.proposalsPerPage = vm.getProposalsPerPage(pageIndex);
    };

    function attachPopover(){
      var vm = this;

      vm.popover = angular.element(vm.$element.find('.btn-question'));
      vm.popover.popover({
        html: true,
        placement: 'bottom',
        animation: true,
        title: 'Regra de posição das propostas',
        content: '<p>É calculada pelo saldo de interações das propostas (curtidas - não curtidas) dividido pela diferença de exibições entre elas.</p><p>O objetivo dessa correção é compensar o saldo de interações e a diferença de exibições das propostas que não tiveram muitas oportunidades de visualização ou das propostas que tiveram mais oportunidades de visualização que a média.</p><p>Com essa correção, é possível comparar propostas que entraram em diferentes momentos, durante todo o período da consulta.</p>'
      });
    }

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/proposal-list/proposal-list.html',
      scope: {
        proposals: '=',
        per_page: '='
      },
      controller: ProposalListController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
