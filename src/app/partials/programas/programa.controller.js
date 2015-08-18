(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ProgramaController', ProgramaController);

  /** @ngInject */
  function ProgramaController(ArticleService, $state, $log) {
    $log.debug('ProgramaController');

    var vm = this;

    vm.ArticleService = ArticleService;
    vm.$state = $state;
    vm.$log = $log;

    vm.init();
  }

  ProgramaController.prototype.init = function () {
    var vm = this;

    var params = vm.$state.params;
    var slug = params.slug;

    vm.ArticleService.getArticleBySlug(slug).then(function(program){
      vm.$log.debug('result progam', program);
    },function (error) {
      vm.$log.error(error);
      vm.$log.info('Rollback to home page.');
      vm.$state.go('inicio', {}, {location: true});
    });
  };
})();
