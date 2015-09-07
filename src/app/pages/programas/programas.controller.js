(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ProgramasPageController', ProgramasPageController);

  /** @ngInject */
  function ProgramasPageController(DialogaService, $log) {
    var vm = this;

    // alias
    vm.DialogaService = DialogaService;
    vm.$log = $log;

    vm.init();
    $log.debug('ProgramasPageController');
  }

  ProgramasPageController.prototype.init = function () {
    var vm = this;

    vm.article = null;
    vm.themes = null;
    vm.selectedTheme = null;
    vm.programs = null;
    vm.filtredPrograms = null;
    vm.query = null;

    vm.loading = null;
    vm.error = null;

    vm.loadData();
  };


  ProgramasPageController.prototype.loadData = function () {
    var vm = this;

    vm.loading = true;

    // load Programs
    vm.loadingPrograms = true;
    vm.DialogaService.getPrograms(function(programs){
      vm.programs = programs;
      vm.filtredPrograms = vm.programs;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
    });

    // load themes
    vm.loadingThemes = true;
    vm.DialogaService.getThemes(function(themes){
      vm.themes = themes;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
    });
  };
})();
