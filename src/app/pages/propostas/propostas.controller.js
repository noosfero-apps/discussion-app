(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('PropostasPageController', PropostasPageController);

  /** @ngInject */
  function PropostasPageController(DialogaService, $scope, $rootScope, $location, $filter, $log) {
    var vm = this;

    vm.DialogaService = DialogaService;
    vm.$scope = $scope;
    vm.$rootScope = $rootScope;
    vm.$location = $location;
    vm.$filter = $filter;
    vm.$log = $log;

    vm.init();
    vm.loadData();
    // vm.attachListeners(); // attach listeners after load data (SYNC)
    vm.$rootScope.focusMainContent();

    $log.debug('PropostasPageController');
  }

  PropostasPageController.prototype.init = function() {
    var vm = this;

    vm.page = 1;
    vm.per_page = 20;
    vm.themes = null;
    vm.selectedTheme = null;
    vm.filtredPrograms = null;
    vm.filtredProposals = null;
    vm.query = null;
    vm.search = vm.$location.search();

    vm.loading = null;
    vm.error = null;
  };

  PropostasPageController.prototype.loadData = function() {
    var vm = this;

    vm.loading = true;

    // Behaviour:
    // 1. Load themes
    // 1. Load Proposals per_page
    // END.

    // 1. Load themes
    vm.loadingThemes = true;
    vm.DialogaService.getThemes(function(themes) {
      vm.themes = themes;
      vm.loadingThemes = false;
      vm.loading = false;

      vm.loadProposals(function() {
        vm.attachListeners();
      });
    }, function(error) {
      vm.error = error;
      vm.$log.error(error);
      vm.loadingThemes = false;
      vm.loading = false;
    });
  };

  PropostasPageController.prototype.loadProposals = function(cb) {
    var vm = this;

    // load Proposals
    vm.loadingProposals = true;
    vm.DialogaService.searchProposals({
      page: vm.page,
      per_page: vm.per_page
    }, function(data) {
      vm.filtredProposals = data.articles;
      vm.total_proposals = parseInt(data._obj.headers('total'));

      vm.loadingProposals = false;

      if (cb) {
        cb();
      }
    }, function(error) {
      vm.error = error;
      vm.$log.error(error);
      vm.loadingProposals = false;
    });
  };

  PropostasPageController.prototype.attachListeners = function() {
    var vm = this;

    vm.$scope.$on('change-selectedCategory', function(event, selectedCategory) {
      vm.selectedTheme = selectedCategory;
    });

    vm.$scope.$watch('pagePropostas.selectedTheme', function(newValue/*, oldValue*/) {
      vm.search.tema = newValue ? newValue.slug : null;
      vm.$location.search('tema', vm.search.tema);
      vm.filterProposals();
    });

    vm.$scope.$watch('pagePropostas.query', function(newValue/*, oldValue*/) {
      vm.search.filtro = newValue ? newValue : null;
      vm.$location.search('filtro', vm.search.filtro);
      vm.filterProposals();
    });
  };

  PropostasPageController.prototype.resetFilterValues = function() {
    var vm = this;

    vm.query = null;
    vm.selectedTheme = null;
  };

  PropostasPageController.prototype.changePage = function(pageIndex) {
    var vm = this;

    vm.page = pageIndex;
    vm.filterProposals(pageIndex);
  };

  PropostasPageController.prototype.filterProposals = function(_page, _per_page) {
    var vm = this;

    if (vm.loadingProposals){
      vm.$log.debug('Content is not loaded yet.');
      return;
    }

    var page = _page || vm.page;
    var per_page = _per_page || vm.per_page;
    var query = vm.query;
    var params = {
      page: page,
      per_page: per_page,
    };

    if (vm.selectedTheme) {
      params.categories_ids = vm.selectedTheme.id;
    }

    if (query) {params.query = query; }

    vm.loadingProposals = true;
    vm.DialogaService.searchProposals(params, function(data){
      vm.total_proposals = parseInt(data._obj.headers('total'));
      vm.filtredProposals = data.articles;
      vm.loadingProposals = false;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
      vm.loadingProposals = false;
    });
  };

  PropostasPageController.prototype.submitSearch = function() {
    var vm = this;

    vm.loadingFilter = true;

    // scroll to result grid
    var $searchResult = angular.element('#search-result');
    if ($searchResult && $searchResult.length > 0) {
      angular.element('body').animate({scrollTop: $searchResult.offset().top}, 'fast');
      vm.filterProposals();
    }else {
      vm.$log.warn('#search-result element not found.');
    }
  };

})();
