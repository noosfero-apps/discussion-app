(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('HeaderController', HeaderController);

  /** @ngInject */
  function HeaderController($log) {
    var vm = this;

    vm.$log = $log;
    vm.$log.debug('HeaderController');
  }

})();
