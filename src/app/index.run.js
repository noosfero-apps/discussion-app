(function() {
  'use strict';

  angular
    .module('dialoga')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');

    window.skipToContent = function () {
      console.log('TODO: skipToContent');
    };
  }

})();
