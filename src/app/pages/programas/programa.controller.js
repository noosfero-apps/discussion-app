(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ProgramasPageController', ProgramasPageController);

  /** @ngInject */
  function ProgramasPageController(DialogaService, $log) {
    $log.debug('ProgramasPageController');

    var vm = this;

    vm.DialogaService = DialogaService;
    vm.$log = $log;

    vm.init();
  }

  ProgramasPageController.prototype.init = function () {
    var vm = this;

    vm.article = null;
    vm.categories = null;
    vm.currentCategory = null;

    vm.loading = true;
    vm.error = false;

    vm.loadData();
  };


  ProgramasPageController.prototype.loadData = function () {
    var vm = this;

    vm.DialogaService.getTemas(function(temas){
      vm.categories = temas;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
    });
  };
})();
