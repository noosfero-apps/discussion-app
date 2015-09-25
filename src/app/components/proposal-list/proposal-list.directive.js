(function() {
  'use strict';

  angular
  .module('dialoga')
  .directive('proposalList', proposalList);

  /** @ngInject */
  function proposalList() {

    /** @ngInject */
    function ProposalListController($state, $element, $timeout, $log) {
      $log.debug('ProposalListController');

      var vm = this;
      vm.$state = $state;
      vm.$element = $element;
      vm.$timeout = $timeout;
      vm.$log = $log;

      vm.init();
    }

    ProposalListController.prototype.init = function () {
      // initial values
      var vm = this;

      if(!vm.proposals){
        throw { name: 'NotDefined', message: 'The attribute "proposals" is undefined.'};
      }

      vm.$timeout(function(){
        attachPopover.call(vm);
      }, 0);
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
        proposals: '='
      },
      controller: ProposalListController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
