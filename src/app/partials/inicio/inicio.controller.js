(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('InicioController', InicioController);

  /** @ngInject */
  function InicioController($log) {
    $log.debug('InicioController');
    // var vm = this;

    // vm.awesomeThings = [];
    // vm.classAnimation = '';
    // vm.creationDate = 1438689506090;

    // activate();

    // function activate() {
    //   $timeout(function() {
    //     vm.classAnimation = 'rubberBand';
    //   }, 4000);
    // }
  }
})();
