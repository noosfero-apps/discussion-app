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

  ProgramaContentPageController.prototype.init = function() {
    var vm = this;

    var params = vm.$state.params;

    vm.article = null;
    vm.category = null;
    vm.loading = true;
    vm.error = false;
    vm.slug = params.slug;

    vm.loadData();
    vm.attachListeners();
  };

  ProgramaContentPageController.prototype.loadData = function() {
    var vm = this;

    vm.ArticleService.getArticleBySlug(vm.slug, function(article) {
      vm.article = article;
      vm.category = vm.article.categories[0];

      vm.$rootScope.contentTitle = vm.article.title;

      if (!vm.banner) {
        vm.banner = {
          src: vm.$rootScope.basePath + vm.article.image.url,
          alt: 'Imagem de destaque do conteúdo'
        };
      }

      vm.loadContent();

    }, function(error) {
      vm.$log.error(error);
      vm.$log.info('Rollback to home page.');
      vm.$state.go('inicio', {}, {location: true});
    });
  };

  ProgramaContentPageController.prototype.attachListeners = function() {
    var vm = this;

    vm.$scope.$on('see-proposals', function() {
      vm.$log.warn('TODO: handle see proposals / ranking');
    });
  };

  ProgramaContentPageController.prototype.loadContent = function() {
    var vm = this;

    vm.loading = true;
    if (!vm.article.body) {
      vm.ArticleService.getContentById(vm.article.id, function(data) {
        vm.article.body = data.article.body;
        vm.loading = false;
      }, function(error) {
        vm.loading = false;
        vm.error = error;
      });
    }
    vm.loading = false;
  };

  ProgramaContentPageController.prototype.makeProposal = function() {
    var vm = this;

    vm.$log.warn('Not implemented yet: "makeProposal"');
  };
})();
