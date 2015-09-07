(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('PropostasPageController', PropostasPageController);

  /** @ngInject */
  function PropostasPageController(DialogaService, $log) {
    $log.debug('PropostasPageController');

    var vm = this;

    vm.DialogaService = DialogaService;
    vm.$log = $log;

    vm.init();
  }

  PropostasPageController.prototype.init = function () {
    var vm = this;

    vm.article = null;
    vm.categories = null;
    vm.currentCategory = null;
    vm.loading = true;
    vm.error = false;

    // vm.loadData();
  };


  PropostasPageController.prototype.loadData = function () {
    var vm = this;

    vm.DialogaService.getCategories(function(categories){
      vm.categories = categories;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
    });

  };
})();
