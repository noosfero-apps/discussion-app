(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('categoryList', categoryList);

  /** @ngInject */
  function categoryList() {

    /** @ngInject */
    function CategoryListController($rootScope, $location, $element, $log) {
      $log.debug('CategoryListController');

      // alias
      var vm = this;
      
      // dependencies
      vm.$rootScope = $rootScope;
      vm.$location = $location;
      vm.$element = $element;
      vm.$log = $log;


      // initialization
      vm.init();
    }

    CategoryListController.prototype.init = function() {
      var vm = this;
      vm.pathUrl = vm.$location.$$path;
      //var pathUrl = String(window.location.pathname)
      vm.escodeRemover = true;

      // Disable button remove of page ranking
      if(vm.pathUrl=="/ranking"){
        vm.escodeRemover = false;
      }

      // Default values
      if(!vm.isCollapsed){
        vm.isCollapsed = false;
      }

    };

    CategoryListController.prototype._disableUnselect = function() {
      var vm = this;

      if(vm.disableUnselect && vm.disableUnselect === 'true'){
        return true;
      }

      return false;
    };


    CategoryListController.prototype.selectCategory = function(category, $event) {
      var vm = this;
      
      // prevent glitch
      $event.stopPropagation();

      if (category !== vm.selectedCategory) {
        vm.selectedCategory = category;

      }else{

        if(vm._disableUnselect()){
          vm.$log.info('Unselect is disabled.');
          return;
        }

        vm.selectedCategory = null;
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
        disableUnselect: '@'
      },
      controller: CategoryListController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();
