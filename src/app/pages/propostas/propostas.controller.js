(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('PropostasPageController', PropostasPageController);

  /** @ngInject */
  function PropostasPageController(ArticleService, $state, $location, $scope, $rootScope, $log) {
    $log.debug('PropostasPageController');

    var vm = this;

    vm.ArticleService = ArticleService;
    vm.$state = $state;
    vm.$location = $location;
    vm.$scope = $scope;
    vm.$rootScope = $rootScope;
    vm.$log = $log;

    vm.init();
  }

  PropostasPageController.prototype.init = function () {
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


  PropostasPageController.prototype.loadData = function () {
    var vm = this;

    vm.ArticleService.getCategories(function(categories){
      vm.categories = categories;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
    });

  };
})();
