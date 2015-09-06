(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('DuvidasPageController', DuvidasPageController);

  /** @ngInject */
  function DuvidasPageController(DialogaService, $log) {
    $log.debug('DuvidasPageController');

    var vm = this;

    vm.DialogaService = DialogaService;
    vm.$log = $log;

    vm.init();
  }

  DuvidasPageController.prototype.init = function () {
    var vm = this;

    vm.questions = null;

    vm.loading = true;
    vm.error = false;

    vm.loadData();
  };


  DuvidasPageController.prototype.loadData = function () {
    var vm = this;

    vm.DialogaService.getQuestions(function(questions){
      vm.questions = questions;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
    });
  };
})();
