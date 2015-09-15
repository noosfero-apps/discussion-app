(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('categoryList', categoryList);

  /** @ngInject */
  function categoryList() {

    /** @ngInject */
    function CategoryListController($rootScope, $element, $log) {
      $log.debug('CategoryListController');

      // alias
      var vm = this;

      // dependencies
      vm.$rootScope = $rootScope;
      vm.$element = $element;
      vm.$log = $log;

      // initialization
      vm.init();
    }

    CategoryListController.prototype.init = function() {
      var vm = this;

      if(!vm.isCollapsed){
        vm.isCollapsed = false;
      }

      if(angular.isUndefined(vm.canUnselect) || vm.canUnselect === null){
        vm.canUnselect = true;
      } else {
        vm.canUnselect = !(vm.canUnselect == 'false');
      }
    };

    CategoryListController.prototype.selectCategory = function(category, $event) {
      var vm = this;

      // prevent glitch
      $event.stopPropagation();

      if(!category && !vm.canUnselect){
        vm.$log.info('Unselect is disabled.');
        return;
      }

      if (category !== vm.selectedCategory) {
        vm.selectedCategory = category;
      }

      // send event to all controllers
      vm.$rootScope.$broadcast('change-selectedCategory', vm.selectedCategory);
    };


    CategoryListController.prototype.toogleList = function() {
      var vm = this;

      if(!vm._listGroup){
        vm._listGroup = vm.$element.find('.list-group');
      }

      vm._listGroup.slideToggle();
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/category-list/category-list.html',
      scope: {
        categories: '=',
        selectedCategory: '=',
        canUnselect: '@'
      },
      controller: CategoryListController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();
