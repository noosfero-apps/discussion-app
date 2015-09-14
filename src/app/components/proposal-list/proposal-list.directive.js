(function() {
  'use strict';

  angular
  .module('dialoga')
  .directive('proposalList', proposalList);

  /** @ngInject */
  function proposalList() {

    /** @ngInject */
    function ProposalListController(ArticleService, $state, $scope, $element, $timeout, $log) {
      $log.debug('ProposalListController');

      var vm = this;
      vm.ArticleService = ArticleService;
      vm.$state = $state;
      vm.$scope = $scope;
      vm.$element = $element;
      vm.$timeout = $timeout;
      vm.$log = $log;

      vm.init();
      vm.loadData();
      vm.attachListeners();
    }

    ProposalListController.prototype.init = function () {
      // initial values
      var vm = this;

      if(!vm.proposals){
        throw { name: 'NotDefined', message: 'The attribute "proposals" is undefined.'};
      }

      if(!vm.perPage){
        vm.perPage = 5;
      }

      vm.initPorposalList();
    };

    ProposalListController.prototype.initPorposalList = function () {
      var vm = this;

      vm.currentPageIndex = 0;

      vm.proposalsPerPage = vm.getProposalsPerPage(0);

      vm.proposalsLength = vm.proposals.length;


      if ((vm.proposalsLength % vm.perPage) === 0) {
        vm.pages =  vm.proposalsLength / vm.perPage;
      } else{
        vm.pages =  (vm.proposalsLength / vm.perPage) + 1;
      }

      // vm.arraypages = new Array(Math.ceil(vm.pages));
      vm.arraypages = new Array(Math.floor(vm.pages));
    };

    ProposalListController.prototype.loadData = function () {
      // async values
      var vm = this;

      // requeue to wait until DOM be created
      vm.$timeout(function(){
        attachPopover.call(vm);
      }, 1000);
    };

    ProposalListController.prototype.attachListeners = function () {
      var vm = this;

      vm.$scope.$watch('vm.proposals', function(/*newValue, oldValue*/) {
        vm.initPorposalList();
      });
    };

    ProposalListController.prototype.getProposalsPerPage = function (pageIndex) {
      var vm = this;

      var initialIndex = pageIndex * vm.perPage;
      var finalIndex = initialIndex + vm.perPage;

      return vm.proposals.slice(initialIndex, finalIndex);
    };

    ProposalListController.prototype.showPage = function (pageIndex) {
      var vm = this;

      if (pageIndex < 0) {
        pageIndex = 0;
      }

      if (pageIndex > (vm.arraypages.length-1)) {
        pageIndex = vm.arraypages.length-1;
      }

      vm.proposalsPerPage = vm.getProposalsPerPage(pageIndex);
      vm.currentPageIndex = pageIndex;
    };

    ProposalListController.prototype.showContent = function (proposal) {
      var vm = this;

      vm.$state.go('programa', {
        slug: proposal.parent.slug,
        proposal_id: proposal.id
      }, {
        location: true,
        reload: true
      });
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
        perPage: '='
      },
      controller: ProposalListController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
