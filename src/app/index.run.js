/* globals document:true*/
(function() {
  'use strict';

  angular
    .module('dialoga')
    .run(handleAccessibility)
    .run(runBlock);

  /** @ngInject */
  function handleAccessibility($rootScope, $timeout, $log) {

    $log.debug('handleAccessibility');

    $rootScope.focusMainContent = function ($event) {

      // prevent skip link from redirecting
      if ($event) { $event.preventDefault(); }

      var mainContentArea = document.querySelector('[role="main"]');

      if ( mainContentArea ) {
        $timeout(function(){
          mainContentArea.focus();
        },90);
      }else{
        $log.warn('role="main" not found.');
      }
    };
  }

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
