(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('categoryList', categoryList);

  /** @ngInject */
  function categoryList() {

    /** @ngInject */
    function CategoryListController($rootScope, ArticleService, $location, $log) {
      $log.debug('CategoryListController');

      // alias
      var vm = this;

      // dependencies
      vm.$rootScope = $rootScope;
      vm.ArticleService = ArticleService;
      vm.$location = $location;
      vm.$log = $log;
      vm.defaultLimit = 6;

      // initialization
      vm.init();
    }

    CategoryListController.prototype.init = function() {
      var vm = this;

      vm.selectedCategory = null;
      vm.ArticleService.getCategories(function(categories){
        vm.categories = categories;

      });

      vm.search = vm.$location.search();
      if (vm.search && vm.search.tema) {
        var slug = vm.search.tema;
        vm.ArticleService.getCategoryBySlug(slug, function(category){
          vm.selectedCategory = category;
        }, function(error){
          vm.$log.error('Error when try to "getCategoryBySlug"', error);
        });
      }
    };

    CategoryListController.prototype.selectCategory = function(category, $event) {
      var vm = this;

      // prevent glitch
      $event.stopPropagation();

      if (category !== vm.selectedCategory) {
        // selected new filter
        vm.selectedCategory = category;
      } else {
        vm.selectedCategory = null;
      }

      // send event to all controllers
      vm.$rootScope.$broadcast('change-selectedCategory', vm.selectedCategory);
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/category-list/category-list.html',
      controller: CategoryListController,
      controllerAs: 'categoryListCtrl',
      bindToController: true
    };

    return directive;
  }

})();
