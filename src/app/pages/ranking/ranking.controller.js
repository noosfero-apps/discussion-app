(function() {
  'use strict';

  angular
  .module('dialoga')
  .controller('RankingPageController', RankingPageController);

  /** @ngInject */
  function RankingPageController(DialogaService, $scope, $rootScope, $location, $filter, $log) {
    var vm = this;

    vm.DialogaService = DialogaService;
    vm.$scope = $scope;
    vm.$rootScope = $rootScope;
    vm.$location = $location;
    vm.$filter = $filter;
    vm.$log = $log;

    vm.init();
    vm.loadData();
    vm.attachListeners(); // attach listeners after load data (SYNC)
    vm.$rootScope.focusMainContent();

    $log.debug('RankingPageController');
  }

  RankingPageController.prototype.init = function () {
    var vm = this;

    vm.page = 1;
    vm.per_page = 10;
    vm.themes = null;
    vm.selectedTheme = null;
    vm.filtredPrograms = null;
    vm.selectedProgram = null;
    vm.filtredProposals = null;
    vm.query = null;
    vm.search = vm.$location.search();
    //Remove "X" from the theme at the ranking page
    // vm.slug = vm.$location.$$path;
    // console.log(vm.$location.$$path);

    if (vm.search.tema) {
      vm._filtredByThemeSlug = vm.search.tema;
    }

    if (vm.search.programa) {
      vm._filtredByProgramSlug = vm.search.programa;
    }

    if (vm.search.tema || vm.search.programa) {
      vm.loadingFilter = true;
    }

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
      if(vm.search.tema || vm._filtredByThemeSlug){

        // vanilla filter
        var results = vm.themes.filter(function(t){
          return (t.slug === vm.search.tema || (t.slug === vm._filtredByThemeSlug));
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
        // vm.loadProposals();
        vm.loading = false;
        vm.loadingFilter = false;
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
      if(vm.search.programa || vm._filtredByProgramSlug){

        // vanilla filter
        var results = vm.filtredPrograms.filter(function(p){
          return (p.slug === vm.search.programa || (p.slug === vm._filtredByProgramSlug));
        });

        if(results && results.length > 0){
          selectedProgram = results[0];
          vm.selectedProgram = selectedProgram;
          console.log("1");
          console.log(vm.selectedProgram);
          console.log("vm.selectedProgram");
        }
      }

      if(!selectedProgram){
        vm.selectedProgram = vm.filtredPrograms[Math.floor(Math.random() * vm.filtredPrograms.length)];
        console.log(vm.selectedProgram);
        console.log("2");
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

RankingPageController.prototype.attachListeners = function() {
  var vm = this;

  vm.$scope.$on('change-selectedCategory', function (event, selectedCategory) {
    vm.selectedTheme = selectedCategory;
  });

  vm.$scope.$watch('pageRanking.selectedTheme', function(newValue/*, oldValue*/) {
    vm.search.tema = newValue ? newValue.slug : null;
    vm.$location.search('tema', vm.search.tema);

    if(!vm.loadingFilter && vm.selectedTheme && vm.selectedTheme.id){
      vm.loadPrograms(vm.selectedTheme.id, function(){
        vm.filterProposals();
      });
    }
  });

  vm.$scope.$on('change-selectedTopic', function (event, selectedTopic) {
    vm.selectedProgram = selectedTopic;
  });

  vm.$scope.$watch('pageRanking.selectedProgram', function(newValue/*, oldValue*/) {
    vm.search.programa = newValue ? newValue.slug : null;
    vm.$location.search('programa', vm.search.programa);

    if (!vm.loadingFilter) {
      vm.filterProposals();
    }
  });

  vm.$scope.$watch('pageRanking.query', function(newValue/*, oldValue*/) {
    vm.search.filtro = newValue ? newValue : null;
    vm.$location.search('filtro', vm.search.filtro);

    if (!vm.loadingFilter) {
      vm.filterProposals();
    }
  });
};

RankingPageController.prototype.resetFilterValues = function() {
  var vm = this;

  vm.query = null;
  vm.selectedTheme = null;
};

RankingPageController.prototype.changePage = function(pageIndex) {
  var vm = this;

  vm.page = pageIndex;
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
  var query = vm.query;
  var selectedProgram = vm.selectedProgram;
  var params = {
    page: page,
    per_page: per_page
  };

  if (selectedProgram) {
    params.parent_id = selectedProgram.id;
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
})();
