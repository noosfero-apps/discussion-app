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

    vm.article = null;
    vm.categories = null;
    vm.currentCategory = null;
    vm.loading = true;
    vm.error = false;

    vm.ArticleService.getCategories(function(categories){
      vm.categories = categories;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
    });

    vm.ArticleService.getArticleBySlug(slug, function(article){
      vm.article = article;
      vm.$rootScope.contentTitle = vm.article.title;
      vm.currentCategory = vm.article.categories[0];

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
    if(!vm.article.body){
      vm.ArticleService.getContentById(vm.article.id, function (data) {
        vm.article.body = data.article.body;
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
      slug: vm.article.slug
    }, {
      location: true
    });
  };
})();
