/**
 * Controlador das páginas:
 * - Propostas
 * - Ranking
 */
(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('PropostasPageController', PropostasPageController);

  /** @ngInject */
  function PropostasPageController(DialogaService, $scope, $location, $filter, $log) {
    var vm = this;

    vm.DialogaService = DialogaService;
    vm.$scope = $scope;
    vm.$location = $location;
    vm.$filter = $filter;
    vm.$log = $log;

    vm.init();
    vm.loadData();
    // vm.attachListeners(); // attach listeners after load data (SYNC)

    $log.debug('PropostasPageController');
  }

  PropostasPageController.prototype.init = function () {
    var vm = this;

    vm.themes = null;
    vm.selectedTheme = null;
    vm.filtredPrograms = null;
    vm.selectedProgram = null;
    vm.proposals = null;
    vm.filtredProposals = null;
    vm.query = null;
    vm.search = vm.$location.search();

    vm.loading = null;
    vm.error = null;
  };

  PropostasPageController.prototype.loadData = function () {
    var vm = this;

    vm.loading = true;

    // Behaviour:
    // 1. Load themes
    // 2. Select a Random Theme (T)
    // 3. Load programs of T
    // 4. Select a random program of T
    // 5. Filter the list of proposals
    // END.

    // 1. Load themes
    vm.loadingThemes = true;
    vm.DialogaService.getThemes(function(themes){
      vm.themes = themes;
      vm.loadingThemes = false;
      vm.loading = false;

      // 2. Select a Random Theme (T)
      var selectedTheme = null;
      if(vm.search.tema){

        // vanilla filter
        var results = vm.themes.filter(function(t){
          return t.slug === vm.search.tema;
        });

        if(results && results.length > 0){
          selectedTheme = results[0];
          vm.selectedTheme = selectedTheme;
        }
      }

      if(!selectedTheme){
        vm.selectedTheme = vm.themes[Math.floor(Math.random() * vm.themes.length)];
      }

      // 3. Load programs of T
      // (AND 4)
      var themeId = vm.selectedTheme.id;
      vm.loadPrograms(themeId, function(){
        vm.loadProposals();
      });
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
      vm.loadingThemes = false;
      vm.loading = false;
    });
  };

  PropostasPageController.prototype.loadPrograms = function (themeId, cb) {
    var vm = this;

    vm.DialogaService.getProgramsByThemeId(themeId, function (programs){
      vm.$log.debug('programs', programs);

      vm.filtredPrograms = programs;

      // 4. Select a random program of T
      var selectedProgram = null;
      if(vm.search.programa){

        // vanilla filter
        var results = vm.filtredPrograms.filter(function(p){
          return p.slug === vm.search.programa;
        });

        if(results && results.length > 0){
          selectedProgram = results[0];
          vm.selectedProgram = selectedProgram;
        }
      }

      if(!selectedProgram){
        vm.selectedProgram = vm.filtredPrograms[Math.floor(Math.random() * vm.filtredPrograms.length)];
      }

      if(cb){
        cb();
      }
    }, function(error){
      vm.$log.error(error);
      if(cb){
        cb();
      }
    });
  };

  PropostasPageController.prototype.loadProposals = function () {
    var vm = this;

    // load Proposals
    vm.loadingProposals = true;
    vm.DialogaService.getProposals({}, function(data){
      vm.proposals = data.articles;
      vm.filtredProposals = vm.proposals;
      vm.loadingProposals = false;
      vm.loading = false;

      vm.attachListeners();
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
      vm.loadingProposals = false;
      vm.loading = false;
    });
  };

  PropostasPageController.prototype.attachListeners = function() {
    var vm = this;

    vm.$scope.$on('change-selectedCategory', function (event, selectedCategory) {
      vm.selectedTheme = selectedCategory;
    });

    vm.$scope.$watch('pagePropostas.selectedTheme', function(newValue, oldValue) {
      vm.search.tema = newValue ? newValue.slug : null;
      vm.$location.search('tema', vm.search.tema);
      vm.filtredProposals = vm.getFiltredProposals();
    });

    vm.$scope.$on('change-selectedTopic', function (event, selectedTopic) {
      vm.selectedProgram = selectedTopic;
      vm.$log.debug('change-selectedTopic', selectedTopic);
    });

    vm.$scope.$watch('pagePropostas.selectedProgram', function(newValue, oldValue) {
      vm.search.programa = newValue ? newValue.slug : null;
      vm.$location.search('programa', vm.search.programa);
      vm.filtredProposals = vm.getFiltredProposals();
    });

    vm.$scope.$watch('pagePropostas.query', function(newValue/*, oldValue*/) {
      vm.search.filtro = newValue ? newValue : null;
      vm.$location.search('filtro', vm.search.filtro);
      vm.filtredProposals = vm.getFiltredProposals();
    });
  };

  // PropostasPageController.prototype.filter = function() {
  //   var vm = this;

  //   if (vm.search && vm.search.tema) {
  //     var slug = vm.search.tema;
  //     vm.$log.debug('filter by theme', slug);

  //     vm.DialogaService.getThemeBySlug(slug, function(theme){
  //       vm.selectedTheme = theme;
  //       vm.$log.debug('getThemeBySlug.slug', slug);
  //       vm.$log.debug('getThemeBySlug.selectedTheme', theme);
  //     }, function(error){
  //       vm.$log.error('Error when try to "getThemeBySlug"', error);
  //     });
  //   }
  // };

  PropostasPageController.prototype.showAllPrograms = function($event) {
    var vm = this;
    $event.stopPropagation();

    vm.resetFilterValues();

    vm._showAllFlag = true;

    vm.filtredPrograms = vm.getFiltredPrograms();
  };

  PropostasPageController.prototype.resetFilterValues = function() {
    var vm = this;

    vm.query = null;
    vm.selectedTheme = null;
  };

  PropostasPageController.prototype.getFiltredProposals = function() {
    var vm = this;

    if(!vm.proposals){
      vm.$log.info('No proposals loaded yet. Abort.');
      return null;
    }

    var input = vm.proposals;
    var output = input;
    var query = vm.query;
    var selectedTheme = vm.selectedTheme;
    var selectedProgram = vm.selectedProgram;

    var filter = vm.$filter('filter');

    if (selectedTheme) {
      output = _filterByCategory(output, selectedTheme);
    }

    if (selectedProgram) {
      output = _filterByProgram(output, selectedProgram);
    }

    if (query) {
      output = filter(output, query, false);
    }

    // if(!query && !selectedTheme && vm._showAllFlag){
    //   output = _balanceByCategory(output);
    // }

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
      var proposal = input[i];
      if (proposal.parent.categories[0].slug === category.slug) {
        out.push(proposal);
      }
    }

    return out;
  }

  function _filterByProgram (input, program) {
    input = input || [];

    if (!program) {
      // no filter
      return input;
    }

    var out = [];
    for (var i = 0; i < input.length; i++) {
      var proposal = input[i];
      if (proposal.parent.id === program.id) {
        out.push(proposal);
      }
    }

    return out;
  }

})();
