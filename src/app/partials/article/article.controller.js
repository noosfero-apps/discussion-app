(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ArticleController', ArticleController);

  /** @ngInject */
  function ArticleController(ArticleService, $state, $sce, $log) {
    $log.debug('ArticleController');

    var vm = this;
    vm.ArticleService = ArticleService;
    vm.$state = $state;
    vm.$sce = $sce;
    vm.$log = $log;

    vm.init();
  }

  ArticleController.prototype.init = function() {
    var vm = this;

    vm.page = vm.$state.current.name;
    vm.article = null;
    vm.loading = true;
    switch (vm.page){
      case 'sobre':
        vm.ArticleService.getAbout(handleSuccess, handleError);
        break;
      case 'termos-de-uso':
        vm.ArticleService.getTerms(handleSuccess, handleError);
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
      vm.loading = false;
      vm.error = error;
    }
  };
})();
