(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('appNavbar', appNavbar);

  /** @ngInject */
  function appNavbar() {

    /** @ngInject */
    function NavbarController($log) {
      $log.debug('NavbarController');

      var vm = this;

      vm.scrollTo = function(hash) {
        var $el = angular.element('#' + hash);
        angular.element('body').animate({scrollTop: $el.offset().top}, 'slow');
      };
    }

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
        creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();
