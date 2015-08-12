(function() {
  'use strict';

  angular
    .module('dialoga')
    .filter('filterByCategory', filterByCategory)
    .filter('filterByCriteria', filterByCriteria)
    .directive('programaList', programaList);

  /** @ngInject */
  function programaList() {

    /** @ngInject */
    function ProgramaListController($scope, $location, $log) {
      $log.debug('ProgramaListController');

      // alias
      var vm = this;

      // dependencies
      vm.$scope = $scope;
      vm.$location = $location;
      vm.$log = $log;

      // initialization
      vm.init();
    }

    ProgramaListController.prototype.init = function () {
      var vm = this;

      if(!vm.article){
        vm.$log.warn('no article to display. Tip: use a ng-if before use this directive');
        return;
      }

      vm.categories = vm.article.categories;
      vm.programs = vm.article.children;
      vm.filtredProgramList = [];

      vm.search = vm.$location.search();
      vm.query = vm.search ? vm.search.filtro : null;
      vm.limitTo = vm.search ? vm.search.limite : 4;
      vm.categoryFilter = vm.search ? vm.filterByCategorySlug(vm.search.tema) : null;
      vm.categoryOptions = null;
      vm.orderCriteries = [
      { label: 'Título', name: 'title' },
      { label: 'Tema', name: 'category' },
      { label: 'Mais participações', name: 'more_participants' }
      ];

      // update window location params
      vm.$scope.$watch('vm.query', function(newValue, oldValue){
        vm.search.filtro = newValue;
        vm.$location.search(vm.search);
      });

      vm.$scope.$watch('vm.limitTo', function(newValue, oldValue){
        vm.search.limite = newValue;
        vm.$location.search(vm.search);
      });

      vm.$scope.$watch('vm.categoryFilter', function(newValue, oldValue){
        vm.search.tema = newValue ? newValue.slug : '';
        vm.$location.search(vm.search);
      });

    };

    ProgramaListController.prototype.getIconClasses = function (category) {
      var vm = this;

      vm.$log.debug('[TODO] getIconClasses of category:', category);
      return 'glyphicon glyphicon-exclamation-sign';
    };

    ProgramaListController.prototype.filterByCategorySlug = function (categorySlug) {
      var vm = this;
      var result = null;

      angular.forEach(vm.categories, function (value, key){
        if(value.slug === categorySlug){
          result = value;
        }
      })
      return result;
    }

    ProgramaListController.prototype.filterByCategory = function (category) {
      var vm = this;

      if(category !== vm.categoryFilter){
        // selected new filter
        vm.categoryFilter = category;
      }else{
        // already selected. Unselect.
        vm.showAll();
      }
    };

    ProgramaListController.prototype.showAll = function () {
      var vm = this;

      vm.query = null;
      vm.categoryFilter = null;
      vm.$log.debug('[TODO] showAll, no filter? ', vm.categoryFilter);
    };

    // function ProgramaListLinker (scope, element, attrs) {

    //   scope.$watch('article', function(newValue, oldValue){
    //     if(!newValue){
    //       return;
    //     }
    //     scope.vm.categories = scope.vm.article.categories;
    //     scope.vm.programs = scope.vm.article.children;
    //   });
    // }

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/programas/programas.html',
      scope: {
        article: '='
      },
      controller: ProgramaListController,
      controllerAs: 'vm',
      bindToController: true,
      // link: ProgramaListLinker
    };


    return directive;
  }

  function filterByCategory(){
    return function (input, category){
      input = input || [];

      if(!category){
        // no filter
        return input;
      }

      var out = [];
      for (var i = 0; i < input.length; i++) {
        var program = input[i];
        if(program.categories[0].slug === category.slug){
          out.push(program);
        }
      }

      return out;
    };
  }

  /** @ngInject */
  function filterByCriteria($filter, $log){
    var orderBy = $filter('orderBy');

    return function (input, criteria, reverse){
      input = input || [];
      criteria = criteria || {};
      reverse = reverse || false;

      var out = [];
      // for (var i = 0; i < input.length; i++) {
      //   var program = input[i];

      //   // todo ordering
      //   out.push(program);
      // }

      switch(criteria.name){
        case 'title':
          out = orderBy(input, 'title', reverse);
          break;
        case 'category':
          out = orderBy(input, 'categories[0].name', reverse);
          break;
        case 'more_participants':
          // break;
        default:
          $log.info('Criteria not handled yet: ', criteria);

          if(reverse){
            out = input.slice().reverse();
          }else{
            out = input;
          }
          break;
      }


      return out;
    };
  }


})();
