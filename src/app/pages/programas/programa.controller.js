(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ProgramaPageController', ProgramaPageController);

  /** @ngInject */
  function ProgramaPageController(ArticleService, $state, $location, $scope, $rootScope, $log) {
    $log.debug('ProgramaPageController');

    var vm = this;

    vm.ArticleService = ArticleService;
    vm.$state = $state;
    vm.$location = $location;
    vm.$scope = $scope;
    vm.$rootScope = $rootScope;
    vm.$log = $log;

    vm.init();
  }

  ProgramaPageController.prototype.init = function () {
    var vm = this;

    var params = vm.$state.params;
    var slug = params.slug;

    vm.program = null;
    vm.currentCategory = null;
    vm.loadingContent = null;

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

      // load proposals
      // vm.ArticleService.getRandomProposals(program.id).then(function(proposal){
      //   vm.program.proposal = proposal;
      // }, function (error){
      //   vm.$log.error(error);
      // });

      // load events
      // vm.ArticleService.getEvents(program.id).then(function(proposal){
      //   vm.program.proposal = proposal;
      // }, function (error){
      //   vm.$log.error(error);
      // });

      // load body content
      // vm.ArticleService.getBodyContent(program.id).then(function(proposal){
      //   vm.program.proposal = proposal;
      // }, function (error){
      //   vm.$log.error(error);
      // });

    }, function (error) {
      vm.$log.error(error);
      vm.$log.info('Rollback to home page.');
      vm.$state.go('inicio', {}, {location: true});
    });
  };

  ProgramaPageController.prototype.goBack = function () {
    var vm = this;

    var prevState = vm.$rootScope.$previousState;
    if(prevState && prevState.state.name){
      vm.$state.go(prevState.state.name, prevState.params);
    } else {
      vm.$state.go('inicio');
    }
  };
})();
