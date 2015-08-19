(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('programaList', programaList);

  /** @ngInject */
  function programaList() {

    /** @ngInject */
    function ProgramaListController($scope, $location, $filter, $anchorScroll, $log) {
      $log.debug('ProgramaListController');

      // alias
      var vm = this;

      // dependencies
      vm.$scope = $scope;
      vm.$location = $location;
      vm.$filter = $filter;
      vm.$anchorScroll = $anchorScroll;
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
      vm.orderCriteries = [
        { label: 'Aleatório', name: 'aleatorio' },
        { label: 'Título', name: 'titulo' },
        { label: 'Tema', name: 'tema' }
      ];

      vm.filtredProgramList = vm.getFiltredPrograms();
      vm.search = vm.$location.search();

      // Add initial values for the filter
      vm.query = (vm.search && vm.search.filtro) ? vm.search.filtro : null;
      vm.limitTo = (vm.search && vm.search.limite) ? parseInt(vm.search.limite, 10) : 4;
      vm.categoryFilter = (vm.search && vm.search.tema) ? vm.getCategoryBySlug(vm.search.tema) : null;
      vm.orderCriteria = (vm.search && vm.search.ordem) ? { name: vm.search.ordem } : null;
      vm.reverse = (vm.search && vm.search.reverso) ? true : false;

      if(!angular.equals({}, vm.search)){
        vm.$location.hash('lista-de-programas');
        vm.$anchorScroll();
        console.log('scrolled');
      }

      // update window location params
      vm.$scope.$watch('vm.query', function(newValue, oldValue){
        vm.search.filtro = newValue ? newValue : null;
        vm.$location.search('filtro', vm.search.filtro);
        vm.filtredProgramList = vm.getFiltredPrograms();
      });

      vm.$scope.$watch('vm.limitTo', function(newValue, oldValue){
        vm.search.limite = (newValue && newValue !== 4)  ? newValue : null;
        vm.$location.search('limite', vm.search.limite);
        vm.filtredProgramList = vm.getFiltredPrograms();
      });

      vm.$scope.$watch('vm.categoryFilter', function(newValue, oldValue){
        vm.search.tema = newValue ? newValue.slug : null;
        vm.$location.search('tema', vm.search.tema);
        vm.filtredProgramList = vm.getFiltredPrograms();
      });

      vm.$scope.$watch('vm.orderCriteria', function(newValue, oldValue){
        vm.search.ordem = (newValue && newValue.name) ? newValue.name : null;
        vm.$location.search('ordem', vm.search.ordem);
        vm.filtredProgramList = vm.getFiltredPrograms();
      });

      vm.$scope.$watch('vm.reverse', function(newValue, oldValue){
        vm.search.reverso = newValue ? newValue : null;
        vm.$location.search('reverso', vm.search.reverso);
        vm.filtredProgramList = vm.getFiltredPrograms();
      });

    };

    ProgramaListController.prototype.resetFilterValues = function () {
      var vm = this;

      vm.query = null;
      vm.limitTo = 4;
      vm.categoryFilter = null;
      vm.orderCriteria = null;
    };

    ProgramaListController.prototype.getIconClasses = function (category) {
      var vm = this;

      vm.$log.debug('[TODO] getIconClasses of category:', category);
      return 'glyphicon glyphicon-exclamation-sign';
    };

    ProgramaListController.prototype.getCategoryBySlug = function (categorySlug) {
      var vm = this;
      var result = null;

      angular.forEach(vm.categories, function (value, key){
        if(value.slug === categorySlug){
          result = value;
        }
      })
      return result;
    }

    ProgramaListController.prototype.filterByCategory = function (category, $event) {
      var vm = this;

      $event.stopPropagation();

      if(category !== vm.categoryFilter){

        // selected new filter
        vm.categoryFilter = category;
      }else{
        vm.categoryFilter = null;
      }
    };

    ProgramaListController.prototype.showAll = function ($event) {
      var vm = this;

      $event.stopPropagation();

      vm.resetFilterValues();
      vm.limitTo = vm.programs.length;
    };

    ProgramaListController.prototype.getFiltredPrograms = function () {
      var vm = this;

      var input = vm.programs;
      var output = input;
      var query = vm.query;
      var categoryFilter = vm.categoryFilter;
      var orderCriteria = vm.orderCriteria ? vm.orderCriteria : { name : 'aleatorio'};
      var filter = vm.$filter('filter');
      var orderBy = vm.$filter('orderBy');
      var limitTo = vm.$filter('limitTo');
      var limit = vm.limitTo ? vm.limitTo : 4;
      
      if(categoryFilter){
        output = _filterByCategory(output, categoryFilter);
      }

      if(query){
        output = filter(output, query, false);
      }

      switch(orderCriteria.name) {
        case 'titulo':
          output = orderBy(output, 'title', vm.reverse);
          break;
        case 'tema':
          output = orderBy(output, 'categories[0].name', vm.reverse);
          break;
        case 'more_participants':
          $log.info('Criteria not handled yet: ', orderCriteria);
          break;
        case 'aleatorio':
        default:
          // shuffling
          // if(!vm._isShuffled){
            output = vm.filterShuffle(output);
          //   vm._isShuffled = true;
          // }

          if(vm.reverse){
            output = output.slice().reverse();
          }

          break;
      }

      output = limitTo(output, limit);        
      
      return output;
    };

    ProgramaListController.prototype.filterShuffle = function (input) {
      var result = [];
      var resultByCategory = {};

      // divide by categories
      for (var i = 0; i < input.length; i++) {
        var program = input[i];
        var categorySlug = program.categories[0].slug;

        if(!resultByCategory[categorySlug]){
          resultByCategory[categorySlug] = [];
        }

        resultByCategory[categorySlug].push(program);
      }

      // shuffle each array
      for (var prop in resultByCategory){
        if( resultByCategory.hasOwnProperty( prop ) ) {
          var categoryWithPrograms = resultByCategory[prop];
          resultByCategory[prop] = shuffle(categoryWithPrograms);
        }
      }
      
      // Concat all into result array
      // > while has program at Lists on resultByCategory
      var hasProgram = true;
      while (hasProgram) {
        
        var foundProgram = false;
        // each categoryList with array of program
        for (var prop in resultByCategory){
        
          if( resultByCategory.hasOwnProperty( prop ) ) {
            var categoryWithPrograms = resultByCategory[prop];
            
            if (categoryWithPrograms.length > 0 ) {
              var pivotProgram = categoryWithPrograms.pop(); 
              result.push(pivotProgram);
              foundProgram = true;
            }
          }
        }

        if(!foundProgram){
          hasProgram = false;
        }
      }

      return result;
    }

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/programas/programas.html',
      scope: {
        article: '='
      },
      controller: ProgramaListController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function _filterByCategory (input, category){
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
  }

  function _filterByCriteria (input, criteria, reverse){
    var vm = this;
    input = input || [];
    criteria = criteria || {};
    reverse = reverse || false;

    var out = [];

    

    return out;
  }

  // -> Fisher–Yates shuffle algorithm
  function shuffle (array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


})();
