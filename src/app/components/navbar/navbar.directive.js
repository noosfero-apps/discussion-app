(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('appNavbar', appNavbar);

  /** @ngInject */
  function appNavbar() {
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

    /** @ngInject */
    function NavbarController($log) {
      $log.debug('NavbarController');
      // var vm = this;

      // "vm.creation" is avaible by directive option "bindToController: true"
      // vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
