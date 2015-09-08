(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ArticlePageController', ArticlePageController);

  /** @ngInject */
  function ArticlePageController(DialogaService, $state, $sce, $log) {
    var vm = this;

    vm.DialogaService = DialogaService;
    vm.$state = $state;
    vm.$sce = $sce;
    vm.$log = $log;

    vm.init();
    vm.loadData();

    vm.$log.debug('ArticlePageController');
  }

  ArticlePageController.prototype.init = function() {
    var vm = this;

    vm.page = vm.$state.current.name;
    vm.article = null;
    vm.loading = true;

    vm.$log.debug('vm.page', vm.page);
  };

  ArticlePageController.prototype.loadData = function() {
    var vm = this;

    switch (vm.page){
      case 'sobre':
        vm.DialogaService.getAbout(handleSuccess, handleError);
        break;
      case 'termos-de-uso':
        vm.DialogaService.getTerms(handleSuccess, handleError);
        break;
      default:
        vm.$log.warn('Page not handled:', vm.page);
        break;
    }

    function handleSuccess (data) {
      vm.loading = false;
      vm.article = data.article;
      // vm.article.body = vm.$sce.trustAsHtml(vm.article.body);
    }

    function handleError (error) {
      vm.$log.debug('handleSuccess.error', error);
      vm.loading = false;
      vm.error = error;
    }
  };

})();
