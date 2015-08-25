(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('articleGrid', articleGrid);

  /** @ngInject */
  function articleGrid() {

    /** @ngInject */
    function ArticleGridController($scope, $rootScope, $element, ArticleService, $location, $filter, $log) {
      $log.debug('ArticleGridController');

      // alias
      var vm = this;

      // dependencies
      vm.$scope = $scope;
      vm.$rootScope = $rootScope;
      vm.$element = $element;
      vm.ArticleService = ArticleService;
      vm.$location = $location;
      vm.$filter = $filter;
      vm.$log = $log;
      vm.defaultLimit = 6;

      // initialization
      vm.init();
    }

    ArticleGridController.prototype.init = function() {
      var vm = this;

      vm.ArticleService.getPrograms(function(programs){
        vm.articles = programs;
      });

      vm.ArticleService.getCategories(function(categories){
        vm.categories = categories;
      });

      vm.orderCriteries = [
        { label: 'Título', name: 'titulo' },
        { label: 'Tema', name: 'tema' },
        { label: 'Aleatório', name: 'aleatorio' }
      ];

      vm.filtredArticleList = vm.getFiltredArticles();
      vm.search = vm.$location.search();

      // Add initial values for the filter
      vm.query = (vm.search && vm.search.filtro) ? vm.search.filtro : null;
      vm.limitTo = (vm.search && vm.search.limite) ? parseInt(vm.search.limite, 10) : vm.defaultLimit;
      vm.orderCriteria = (vm.search && vm.search.ordem) ? { name: vm.search.ordem } : null;
      vm.reverse = (vm.search && vm.search.reverso) ? true : false;

      // vm.selectedCategory = (vm.search && vm.search.tema) ? vm.getCategoryBySlug(vm.search.tema) : null;
      if (vm.search && vm.search.tema) {
        var slug = vm.search.tema;
        vm.ArticleService.getCategoryBySlug(slug, function(category){
          vm.selectedCategory = category;
        }, function(error){
          vm.$log.error('Error when try to "getCategoryBySlug"', error);
        });
      }

      if (!angular.equals({}, vm.search)) {
        var $el = vm.$element;
        angular.element('body').animate({scrollTop: $el.offset().top}, 'slow');
      }

      // update window location params
      vm.$scope.$on('change-selectedCategory', function(event, selectedCategory){
        vm.selectedCategory = selectedCategory;
      });

      vm.$scope.$watch('vm.query', function(newValue/*, oldValue*/) {
        vm.search.filtro = newValue ? newValue : null;
        vm.$location.search('filtro', vm.search.filtro);
        if(vm.search.filtro){
          vm.limitTo = vm.articles.length;
        }else{
          vm.limitTo = vm.defaultLimit;
        }
        vm.filtredArticleList = vm.getFiltredArticles();
      });

      vm.$scope.$watch('vm.limitTo', function(newValue/*, oldValue*/) {
        vm.search.limite = (newValue && newValue !== vm.defaultLimit)  ? newValue : null;
        vm.$location.search('limite', vm.search.limite);
        vm.filtredArticleList = vm.getFiltredArticles();
      });

      vm.$scope.$watch('vm.selectedCategory', function(newValue/*, oldValue*/) {
        vm.search.tema = newValue ? newValue.slug : null;
        vm.$location.search('tema', vm.search.tema);
        if(vm.search.tema){
          vm.limitTo = vm.articles.length;
        }else{
          vm.limitTo = vm.defaultLimit;
        }
        vm.filtredArticleList = vm.getFiltredArticles();
      });

      vm.$scope.$watch('vm.orderCriteria', function(newValue/*, oldValue*/) {
        vm.search.ordem = (newValue && newValue.name) ? newValue.name : null;
        vm.$location.search('ordem', vm.search.ordem);
        vm.filtredArticleList = vm.getFiltredArticles();
      });

      vm.$scope.$watch('vm.reverse', function(newValue/*, oldValue*/) {
        vm.search.reverso = newValue ? newValue : null;
        vm.$location.search('reverso', vm.search.reverso);
        vm.filtredArticleList = vm.getFiltredArticles();
      });

    };

    ArticleGridController.prototype.resetFilterValues = function() {
      var vm = this;

      vm.query = null;
      vm.limitTo = vm.defaultLimit;
      vm.selectedCategory = null;
      vm.orderCriteria = null;
    };

    ArticleGridController.prototype.getIconClasses = function(category) {
      var vm = this;

      vm.$log.debug('[TODO] getIconClasses of category:', category);
      return 'glyphicon glyphicon-exclamation-sign';
    };

    ArticleGridController.prototype.getCategoryBySlug = function(categorySlug) {
      var vm = this;
      var result = null;

      angular.forEach(vm.categories, function(value/*, key*/) {
        if (value.slug === categorySlug) {
          result = value;
        }
      });

      return result;
    };

    ArticleGridController.prototype.showAll = function($event) {
      var vm = this;

      $event.stopPropagation();

      vm.resetFilterValues();
      vm.limitTo = vm.articles.length;
    };

    ArticleGridController.prototype.getFiltredArticles = function() {
      var vm = this;

      if(!vm.articles){
        vm.$log.warn('No articles loaded yet. Abort.');
        return null;
      }

      var input = vm.articles;
      var output = input;
      var query = vm.query;
      var selectedCategory = vm.selectedCategory;
      var orderCriteria = vm.orderCriteria ? vm.orderCriteria : { name : 'aleatorio'};
      var filter = vm.$filter('filter');
      var orderBy = vm.$filter('orderBy');
      var limitTo = vm.$filter('limitTo');
      var limit = vm.limitTo ? vm.limitTo : 4;

      if (selectedCategory) {
        output = _filterByCategory(output, selectedCategory);
      }

      if (query) {
        output = filter(output, query, false);
      }

      switch (orderCriteria.name) {
        case 'titulo':
          output = orderBy(output, 'title', vm.reverse);
          break;
        case 'tema':
          output = orderBy(output, 'categories[0].name', vm.reverse);
          break;
        case 'more_participants':
          vm.$log.info('Criteria not handled yet: ', orderCriteria);
          break;
        case 'aleatorio':
          // shuffling
          // if (!vm._isShuffled){
          output = vm.filterShuffle(output);
          //   vm._isShuffled = true;
          // }

          if (vm.reverse) {
            output = output.slice().reverse();
          }

          break;
        default:
          vm.$log.warn('Criteria not matched: ', orderCriteria);
          break;
      }

      output = limitTo(output, limit);

      return output;
    };

    ArticleGridController.prototype.filterShuffle = function(input) {
      var result = [];
      var resultByCategory = {};

      // divide by categories
      for (var i = 0; i < input.length; i++) {
        var program = input[i];
        var categorySlug = program.categories[0].slug;

        if (!resultByCategory[categorySlug]) {
          resultByCategory[categorySlug] = [];
        }

        resultByCategory[categorySlug].push(program);
      }

      // shuffle each array
      var prop = null;
      var categoryWithPrograms = null;
      for (prop in resultByCategory) {
        if (resultByCategory.hasOwnProperty(prop)) {
          categoryWithPrograms = resultByCategory[prop];
          resultByCategory[prop] = shuffle(categoryWithPrograms);
        }
      }

      // Concat all into result array
      // > while has program at Lists on resultByCategory
      var hasProgram = true;
      while (hasProgram) {

        var foundProgram = false;
        // each categoryList with array of program
        prop = null;
        categoryWithPrograms = null;
        for (prop in resultByCategory) {

          if (resultByCategory.hasOwnProperty(prop)) {
            categoryWithPrograms = resultByCategory[prop];

            if (categoryWithPrograms.length > 0) {
              var pivotProgram = categoryWithPrograms.pop();
              result.push(pivotProgram);
              foundProgram = true;
            }
          }
        }

        if (!foundProgram) {
          hasProgram = false;
        }
      }

      return result;
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/article-grid/article-grid.html',
      controller: ArticleGridController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function _filterByCategory (input, category) {
    input = input || [];

    if (!category) {
      // no filter
      return input;
    }

    var out = [];
    for (var i = 0; i < input.length; i++) {
      var program = input[i];
      if (program.categories[0].slug === category.slug) {
        out.push(program);
      }
    }

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
