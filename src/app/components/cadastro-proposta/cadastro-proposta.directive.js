(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('cadastroProposta', cadastroProposta);

  /** @ngInject */
  function cadastroProposta() {

    /** @ngInject */
    function CadastroPropostaController(ArticleService, $scope, $element, $timeout, $log) {
      $log.debug('cadastroPropostaController');

      var vm = this;
      vm.ArticleService = ArticleService;
      vm.$scope = $scope;
      vm.$element = $element;
      vm.$timeout = $timeout;
      vm.$log = $log;

      vm.init();

      vm.loadData();
    }

    CadastroPropostaController.prototype.loadData = function () {
      // async values
      var vm = this;

      // requeue to wait until DOM be created
      vm.$timeout(function(){
        attachPopover.call(vm);
      }, 100);
    };

    function attachPopover(){
      var vm = this;

      vm.popover = angular.element(vm.$element.find('.texto-proposta'));
      vm.popover.popover({
        html: true,
        placement: 'right',
        animation: true,
        title: 'Regra de posição das propostas',
        content: '<p>Poderia escrever a sua proposta em um texto simples e breve?</p><br><p>Sua proposta passará pela fase de moderação. Assim que ela estiver pronta para compartilhar, avisaremos você.'
      });
    }

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/cadastro-proposta/cadastro-proposta.html',
      scope: {
        programa: '=',
        proposta: '=',
      },
      controller: CadastroPropostaController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();
