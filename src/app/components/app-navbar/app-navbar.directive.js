(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('appNavbar', appNavbar);

  /** @ngInject */
  function appNavbar() {

    /** @ngInject */
    function NavbarController(AuthService, $log) {
      $log.debug('NavbarController');

      var vm = this;
      vm.AuthService = AuthService;
      vm.$log = $log;
    }

    // NavbarController.prototype.scrollTo = function (hash){
    //   var $el = angular.element('#' + hash);
    //   angular.element('body').animate({scrollTop: $el.offset().top}, 'slow');
    // };

    NavbarController.prototype.onClickLogout = function (){
      var vm = this;

      vm.AuthService.logout();
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/app-navbar/app-navbar.html',
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
