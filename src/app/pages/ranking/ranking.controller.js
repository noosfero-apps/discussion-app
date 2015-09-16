(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('RankingPageController', RankingPageController);

  /** @ngInject */
  function RankingPageController(DialogaService, $scope, $location, $filter, $log) {
    var vm = this;

    vm.DialogaService = DialogaService;
    vm.$scope = $scope;
    vm.$location = $location;
    vm.$filter = $filter;
    vm.$log = $log;

    vm.init();
    vm.loadData();
    // vm.attachListeners(); // attach listeners after load data (SYNC)

    $log.debug('RankingPageController');
  }

  RankingPageController.prototype.init = function () {
    var vm = this;

    vm.page = 1;
    vm.per_page = 3;
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

  RankingPageController.prototype.loadData = function () {
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
        vm.loading = false;
      });
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
      vm.loadingThemes = false;
      vm.loading = false;
    });
  };

  RankingPageController.prototype.loadPrograms = function (themeId, cb) {
    var vm = this;

    vm.DialogaService.getProgramsByThemeId(themeId, function (programs){

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

  RankingPageController.prototype.loadProposals = function () {
    var vm = this;

    // load Proposals
    vm.loadingProposals = true;
    vm.DialogaService.getProposals({}, function(data){
      vm.proposals = data.articles;
      vm.filtredProposals = vm.proposals;
      vm.loadingProposals = false;

      vm.attachListeners();
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
      vm.loadingProposals = false;
    });
  };

  RankingPageController.prototype.attachListeners = function() {
    var vm = this;

    vm.$scope.$on('change-selectedCategory', function (event, selectedCategory) {
      vm.selectedTheme = selectedCategory;
    });

    vm.$scope.$watch('pageRanking.selectedTheme', function(newValue, oldValue) {
      vm.search.tema = newValue ? newValue.slug : null;
      vm.$location.search('tema', vm.search.tema);

      if(vm.selectedTheme && vm.selectedTheme.id){
        vm.loadPrograms(vm.selectedTheme.id, function(){
          vm.filterProposals();
        });
      }
    });

    vm.$scope.$on('change-selectedTopic', function (event, selectedTopic) {
      vm.selectedProgram = selectedTopic;
    });

    vm.$scope.$watch('pageRanking.selectedProgram', function(newValue, oldValue) {
      vm.search.programa = newValue ? newValue.slug : null;
      vm.$location.search('programa', vm.search.programa);
      vm.filterProposals();
    });

    vm.$scope.$watch('pageRanking.query', function(newValue/*, oldValue*/) {
      vm.search.filtro = newValue ? newValue : null;
      vm.$location.search('filtro', vm.search.filtro);
      vm.filterProposals();
    });
  };

  RankingPageController.prototype.resetFilterValues = function() {
    var vm = this;

    vm.query = null;
    vm.selectedTheme = null;
  };

  RankingPageController.prototype.changePage = function(pageIndex) {
    var vm = this;

    vm.filterProposals(pageIndex);
  };

  RankingPageController.prototype.filterProposals = function(_page, _per_page) {
    var vm = this;

    if (vm.loadingProposals){
      vm.$log.debug('Content is not loaded yet.');
      return;
    }

    var page = _page || vm.page;
    var per_page = _per_page || vm.per_page;
    var input = vm.proposals;
    var output = input;
    var query = vm.query;
    var selectedTheme = vm.selectedTheme;
    var selectedProgram = vm.selectedProgram;

    var filter = vm.$filter('filter');

    if (selectedProgram) {
      var params = {
        page: page,
        per_page: per_page,
        parent_id: selectedProgram.id
      };

      if (query) {params.query = query; }

      vm.loadingProposals = true;
      vm.DialogaService.searchProposals(params, function(data){
        vm.total_proposals = data._obj.headers('total');
        vm.filtredProposals = data.articles;
        vm.loadingProposals = false;
      }, function (error) {
        vm.error = error;
        vm.$log.error(error);
        vm.loadingProposals = false;
      });
    } else {
      vm.filtredProposals = [];
    }
  };
})();
