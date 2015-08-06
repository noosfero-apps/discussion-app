(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('HeaderController', HeaderController);

  /** @ngInject */
  function HeaderController($timeout, $log) {
    $log.debug('HeaderController');

    var vm = this;

    vm.$timeout = $timeout;
    vm.$log = $log;

    vm.contrast = false;
  }

  HeaderController.prototype.toggleContrast = function () {
    var vm = this;

    vm.contrast = !vm.contrast;
    vm.$log.debug('contrast', vm.contrast);
  };

})();
