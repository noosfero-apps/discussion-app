(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('socialShare', socialShare);

  /** @ngInject */
  function socialShare() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/socialShare/socialShare.html',
      scope: {
      },
      controller: SocialShareController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SocialShareController($log) {
      $log.debug('SocialShareController');

      var vm = this;
    }
  }

})();