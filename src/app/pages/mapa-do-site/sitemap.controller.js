(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('SitemapPageController', SitemapPageController);

  /** @ngInject */
  function SitemapPageController(DialogaService, $state, $sce, $log) {
    var vm = this;

    vm.DialogaService = DialogaService;
    vm.$log = $log;

    vm.init();
    vm.loadData();

    vm.$log.debug('SitemapPageController');
  }

  SitemapPageController.prototype.init = function() {
    var vm = this;

    vm.programsPerThemes = null;
  };

  SitemapPageController.prototype.loadData = function() {
    var vm = this;

    vm.DialogaService.getPrograms(function(programs){
      vm.programsPerThemes = sliceProgramsByThemes(programs);
    },function(error){
      vm.error = error;
      vm.$log.error(error);
    });
  };

  function sliceProgramsByThemes(programs){
    var themes = {};
    var len = programs.length;
    for (var i = 0; i < len; i++) {
      var program = programs[i];
      var category = program.categories[0];
      var theme = themes[category.slug] || {};

      if(!angular.isArray(theme.programs)){
        theme = category;
        theme.programs = [];
        themes[theme.slug] = theme;
      }

      theme.programs.push(program);

    }

    return themes;
  }

})();
