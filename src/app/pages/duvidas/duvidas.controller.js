(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('DuvidasPageController', DuvidasPageController);

  /** @ngInject */
  function DuvidasPageController(ArticleService, $state, $location, $scope, $rootScope, $log) {
    $log.debug('DuvidasPageController');

    var vm = this;

    vm.ArticleService = ArticleService;
    vm.$state = $state;
    vm.$location = $location;
    vm.$scope = $scope;
    vm.$rootScope = $rootScope;
    vm.$log = $log;

    vm.init();
  }

  DuvidasPageController.prototype.init = function () {
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


  DuvidasPageController.prototype.loadData = function () {
    var vm = this;

    vm.ArticleService.getCategories(function(categories){
      vm.categories = categories;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
    });

  };
})();
