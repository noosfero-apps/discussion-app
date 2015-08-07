(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ProgramasController', ProgramasController);

  /** @ngInject */
  function ProgramasController(ArticleService, $log) {
    $log.debug('ProgramasController');

    var vm = this;

    vm.ArticleService = ArticleService;
    vm.$log = $log;

    vm.init();
  }

  ProgramasController.prototype.init = function () {

    vm.programaList = [];
  };
})();
