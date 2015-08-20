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
    vm.currentCategory = null;
    vm.loadingContent = null;
    vm.error = null;

    vm.ArticleService.getHome(function(data){
      vm.categories = data.article.categories;
    }, function (error) {
      vm.$log.error(error);
    });

    vm.ArticleService.getArticleBySlug(slug, function(program){
      vm.program = program;
      vm.currentCategory = vm.program.categories[0];

      vm.$scope.$watch('programa.currentCategory', function(newValue, oldValue){
        if(newValue !== oldValue){
          vm.$state.go('inicio', {
            tema: newValue.slug
          }, {
            location: true
          });
        }
      });

      vm.loadContent();

    }, function (error) {
      vm.$log.error(error);
      vm.$log.info('Rollback to home page.');
      vm.$state.go('inicio', {}, {location: true});
    });
  };

  ProgramaContentPageController.prototype.loadContent = function () {
    var vm = this;

    vm.loadingContent = true;
    if(!vm.program.body){
      vm.ArticleService.getContentById(vm.program.id, function (data) {
        vm.program.body = data.article.body;
        vm.loadingContent = false;
      }, function (error) {
        vm.loadingContent = false;
        vm.error = error;
      });
    }
    vm.loadingContent = false;
  };

  ProgramaContentPageController.prototype.goBack = function () {
    var vm = this;

    var prevState = vm.$rootScope.$previousState;
    if(prevState && prevState.state.name){
      vm.$state.go(prevState.state.name, prevState.params);
    } else {
      vm.$state.go('programa', {
        slug: vm.program.slug
      });
    }
  };
})();
