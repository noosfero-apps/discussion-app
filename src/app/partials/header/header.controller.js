(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('HeaderController', HeaderController);

  /** @ngInject */
  function HeaderController($timeout, $log) {
    $log.debug('HeaderController');

    this.$timeout = $timeout;
    this.$log = $log;

    this.contrast = false;
  }

  HeaderController.prototype.toggleContrast = function () {
    this.contrast = !this.contrast;
    console.debug('contrast', this.contrast);
  };

  HeaderController.prototype.focusMainContent = function ($event) {

    // prevent skip link from redirecting
    if ($event) { $event.preventDefault(); }

    var mainContentArea = document.querySelector("[role='main']");

    if ( mainContentArea ) {
      this.$timeout(function(){
        mainContentArea.focus();
      },90);
    }else{
      this.$log.warn('role="main" not found.');
    }
  };

})();
