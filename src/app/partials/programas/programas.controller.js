(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ProgramasController', ProgramasController);

  /** @ngInject */
  function ProgramasController(ProgramaService, $log) {
    $log.debug('ProgramasController');

    var vm = this;

    vm.programaList = [
      ProgramaService.mockPrograma(),
      ProgramaService.mockPrograma()
    ];
  }
})();
