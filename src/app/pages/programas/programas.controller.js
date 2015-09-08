(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ProgramasPageController', ProgramasPageController);

  /** @ngInject */
  function ProgramasPageController(DialogaService, $scope, $location, $filter, $log) {
    var vm = this;

    vm.DialogaService = DialogaService;
    vm.$scope = $scope;
    vm.$location = $location;
    vm.$filter = $filter;
    vm.$log = $log;

    vm.init();
    vm.loadData();
    vm.attachListeners();

    $log.debug('ProgramasPageController');
  }

  ProgramasPageController.prototype.init = function () {
    var vm = this;

    vm.themes = null;
    vm.selectedTheme = null;
    vm.programs = null;
    vm.filtredPrograms = null;
    vm.query = null;
    vm.search = vm.$location.search();

    vm.loading = null;
    vm.error = null;
  };

  ProgramasPageController.prototype.loadData = function () {
    var vm = this;

    vm.loading = true;

    // // load Programs
    vm.loadingPrograms = true;
    vm.DialogaService.getPrograms(function(programs){
      vm.programs = programs;
      vm.filtredPrograms = vm.programs;
      vm.loadingPrograms = false;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
      vm.loadingPrograms = false;
    });

    // load themes
    vm.loadingThemes = true;
    vm.DialogaService.getThemes(function(themes){
      vm.themes = themes;
      vm.loadingThemes = false;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
      vm.loadingThemes = false;
    });
  };

  ProgramasPageController.prototype.attachListeners = function() {
    var vm = this;

    vm.$scope.$on('change-selectedCategory', function (event, selectedCategory) {
      vm.selectedTheme = selectedCategory;
      vm.$log.debug('vm.selectedTheme', vm.selectedTheme);
    });

    vm.$scope.$watch('pageProgramas.selectedTheme', function(newValue/*, oldValue*/) {
      vm.search.tema = newValue ? newValue.slug : null;
      vm.$location.search('tema', vm.search.tema);
      vm.filtredPrograms = vm.getFiltredPrograms();
    });

    vm.$scope.$watch('pageProgramas.query', function(newValue/*, oldValue*/) {
      vm.search.filtro = newValue ? newValue : null;
      vm.$location.search('filtro', vm.search.filtro);
      vm.filtredPrograms = vm.getFiltredPrograms();
    });
  };

  ProgramasPageController.prototype.filter = function() {
    var vm = this;

    if (vm.search && vm.search.tema) {
      var slug = vm.search.tema;
      vm.$log.debug('filter by theme', slug);

      vm.DialogaService.getThemeBySlug(slug, function(theme){
        vm.selectedTheme = theme;
        vm.$log.debug('getThemeBySlug.slug', slug);
        vm.$log.debug('getThemeBySlug.selectedTheme', theme);
      }, function(error){
        vm.$log.error('Error when try to "getThemeBySlug"', error);
      });
    }
  };

  ProgramasPageController.prototype.showAllPrograms = function($event) {
    var vm = this;
    $event.stopPropagation();

    vm.resetFilterValues();

    vm._showAllFlag = true;

    vm.filtredPrograms = vm.getFiltredPrograms();
  };

  ProgramasPageController.prototype.resetFilterValues = function() {
    var vm = this;

    vm.query = null;
    vm.selectedTheme = null;
  };

  ProgramasPageController.prototype.getFiltredPrograms = function() {
    var vm = this;

    if(!vm.programs){
      vm.$log.warn('No programs loaded yet. Abort.');
      return null;
    }

    var input = vm.programs;
    var output = input;
    var query = vm.query;
    var selectedTheme = vm.selectedTheme;
    
    var filter = vm.$filter('filter');
    
    if (selectedTheme) {
      output = _filterByCategory(output, selectedTheme);
    }

    if (query) {
      output = filter(output, query, false);
    }

    if(!query && !selectedTheme && vm._showAllFlag){
      output = _balanceByCategory(output);
    }

    return output;
  };

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

  function _balanceByCategory (input) {
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
    // for (prop in resultByCategory) {
    //   if (resultByCategory.hasOwnProperty(prop)) {
    //     categoryWithPrograms = resultByCategory[prop];
    //     resultByCategory[prop] = shuffle(categoryWithPrograms);
    //   }
    // }

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
  }
})();