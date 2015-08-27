(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ProgramasPageController', ProgramasPageController);

  /** @ngInject */
  function ProgramasPageController(ArticleService, $state, $location, $scope, $rootScope, $log) {
    $log.debug('ProgramasPageController');

    var vm = this;

    vm.ArticleService = ArticleService;
    vm.$state = $state;
    vm.$location = $location;
    vm.$scope = $scope;
    vm.$rootScope = $rootScope;
    vm.$log = $log;

    vm.init();
  }

  ProgramasPageController.prototype.init = function () {
    var vm = this;

    var params = vm.$state.params;
    var slug = params.slug;

    vm.article = null;
    vm.categories = null;
    vm.currentCategory = null;
    vm.loading = true;
    vm.error = false;

    vm.loadData();
  };


  ProgramasPageController.prototype.loadData = function () {
    var vm = this;

    vm.ArticleService.getCategories(function(categories){
      vm.categories = categories;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
    });

    // vm.ArticleService.getArticleBySlug(slug, function(article){
    //   vm.article = article;
    //   vm.currentCategory = vm.article.categories[0];

    //   // load proposals
    //   // vm.ArticleService.getRandomProposal(program.id, function(proposal){
    //   //   vm.article.proposal = proposal;
    //   // }, function (error){
    //   //   vm.$log.error(error);
    //   // });

    //   // load events
    //   // vm.ArticleService.getEvents(program.id, function(proposal){
    //   //   vm.article.proposal = proposal;
    //   // }, function (error){
    //   //   vm.$log.error(error);
    //   // });

    // }, function (error) {
    //   vm.error = error;
    //   vm.$log.error(error);
    //   vm.$log.info('Rollback to home page.');
    //   vm.$state.go('inicio', {}, {location: true});
    // });

  };
})();
