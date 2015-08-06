/* globals document:true*/
(function() {
  'use strict';

  angular
    .module('dialoga')
    .run(handleAccessibility)
    .run(runBlock);

  /** @ngInject */
  function handleAccessibility($rootScope, $timeout, $cookies, $log) {
    $log.debug('handleAccessibility');

    var contrast = $cookies.get('dialoga_contraste') === "true";
    adjustContrast(contrast);

    function adjustContrast(state){
      var bodyEl = angular.element(document).find('body');
      angular.element(bodyEl).toggleClass('contraste', !!state);
    }

    $rootScope.toggleContrast = function () {
      contrast = !contrast;
      $cookies.put('dialoga_contraste', contrast);
      adjustContrast(contrast);
    };

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
    $log.debug('runBlock');
  }

})();
