(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ProgramaContentPageController', ProgramaContentPageController);

  /** @ngInject */
  function ProgramaContentPageController(ArticleService, $state, $location, $scope, $rootScope, $log) {
    $log.debug('ProgramaContentPageController');

    var vm = this;

    vm.ArticleService = ArticleService;
    vm.$state = $state;
    vm.$location = $location;
    vm.$scope = $scope;
    vm.$rootScope = $rootScope;
    vm.$log = $log;

    vm.init();
  }

  ProgramaContentPageController.prototype.init = function () {
    var vm = this;

    var params = vm.$state.params;
    var slug = params.slug;

    vm.program = null;
    vm.categories = null;
    vm.currentCategory = null;
    vm.loading = true;
    vm.error = false;

    vm.ArticleService.getHome(function(data){
      vm.categories = data.article.categories;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
    });

    vm.ArticleService.getArticleBySlug(slug, function(program){
      vm.program = program;
      vm.currentCategory = vm.program.categories[0];

      vm.loadContent();

    }, function (error) {
      vm.$log.error(error);
      vm.$log.info('Rollback to home page.');
      vm.$state.go('inicio', {}, {location: true});
    });
  };

  ProgramaContentPageController.prototype.loadContent = function () {
    var vm = this;

    vm.loading = true;
    if(!vm.program.body){
      vm.ArticleService.getContentById(vm.program.id, function (data) {
        vm.program.body = data.article.body;
        vm.loading = false;
      }, function (error) {
        vm.loading = false;
        vm.error = error;
      });
    }
    vm.loading = false;
  };

  ProgramaContentPageController.prototype.goToPreview = function () {
    var vm = this;

    vm.$state.go('programa', {
      slug: vm.program.slug
    }, {
      location: true
    });
  };
})();
