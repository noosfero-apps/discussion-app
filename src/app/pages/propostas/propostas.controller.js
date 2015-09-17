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
    // 1. Load Proposals per_page
    // END.

    // 1. Load themes
    vm.loadingThemes = true;
    vm.DialogaService.getThemes(function(themes){
      vm.themes = themes;
      vm.loadingThemes = false;
      vm.loading = false;

      vm.loadProposals(function (){
        vm.attachListeners();
      });
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
      vm.loadingThemes = false;
      vm.loading = false;
    });
  };

  PropostasPageController.prototype.loadProposals = function (cb) {
    var vm = this;

    // load Proposals
    vm.loadingProposals = true;
    vm.DialogaService.getProposals({}, function(data){
      vm.proposals = data.articles;
      vm.filtredProposals = vm.proposals;
      vm.loadingProposals = false;
      vm.loading = false;

      if(cb){
        cb();
      }
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
      output = vm._filterByCategory(output, selectedTheme);
    }

    if (selectedProgram) {
      output = vm._filterByProgram(output, selectedProgram);
    }

    if (query) {
      output = filter(output, query, false);
    }

    // if(!query && !selectedTheme && vm._showAllFlag){
    //   output = _balanceByCategory(output);
    // }

    return output;
  };

  PropostasPageController.prototype._filterByCategory = function (input, category) {
    var vm = this;

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

  PropostasPageController.prototype._filterByProgram = function (input, program) {
    var vm = this;

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
