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
    vm.attachListeners();

    $log.debug('PropostasPageController');
  }

  PropostasPageController.prototype.init = function () {
    var vm = this;

    vm.themes = null;
    vm.selectedTheme = null;
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

    // load Proposals
    vm.loadingProposals = true;
    vm.DialogaService.getProposals({}, function(data){
      vm.proposals = data.articles;
      vm.filtredProposals = vm.proposals;
      vm.loadingProposals = false;
      vm.loading = false;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
      vm.loadingProposals = false;
      vm.loading = false;
    });

    // load themes
    vm.loadingThemes = true;
    vm.DialogaService.getThemes(function(themes){
      vm.themes = themes;
      vm.loadingThemes = false;
      vm.loading = false;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
      vm.loadingThemes = false;
      vm.loading = false;
    });
  };

  PropostasPageController.prototype.attachListeners = function() {
    var vm = this;

    vm.$scope.$on('change-selectedCategory', function (event, selectedCategory) {
      vm.selectedTheme = selectedCategory;
    });

    vm.$scope.$watch('pagePropostas.selectedTheme', function(newValue/*, oldValue*/) {
      vm.search.tema = newValue ? newValue.slug : null;
      vm.$location.search('tema', vm.search.tema);
      vm.filtredProposals = vm.getFiltredProposals();
    });

    vm.$scope.$watch('pagePropostas.query', function(newValue/*, oldValue*/) {
      vm.search.filtro = newValue ? newValue : null;
      vm.$location.search('filtro', vm.search.filtro);
      vm.filtredProposals = vm.getFiltredProposals();
    });
  };

  PropostasPageController.prototype.filter = function() {
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
      vm.$log.warn('No proposals loaded yet. Abort.');
      return null;
    }

    var input = vm.proposals;
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

})();
