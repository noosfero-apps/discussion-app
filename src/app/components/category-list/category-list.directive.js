(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('categoryList', categoryList);

  /** @ngInject */
  function categoryList() {

    /** @ngInject */
    function CategoryListController($rootScope, $location, $log) {
      $log.debug('CategoryListController');

      // alias
      var vm = this;

      // dependencies
      vm.$rootScope = $rootScope;
      vm.$location = $location;
      vm.$log = $log;

      // initialization
      vm.init();
    }

    CategoryListController.prototype.init = function() {
      // var vm = this;
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
      scope: {
        categories: '=',
        selectedCategory: '@'
      },
      controller: CategoryListController,
      controllerAs: 'categoryListCtrl',
      bindToController: true
    };

    return directive;
  }

})();
