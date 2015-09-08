(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('authUser', authUser);

  /** @ngInject */
  function authUser() {

    /** @ngInject */
    function AuthUserController($scope, AuthService, Session, AUTH_EVENTS, $log) {
      $log.debug('AuthUserController');

      var vm = this;

      vm.$scope = $scope;
      vm.AuthService = AuthService;
      vm.Session = Session;
      vm.AUTH_EVENTS = AUTH_EVENTS;
      vm.$log = $log;

      vm.init();
    }

    AuthUserController.prototype.init = function (){
      var vm = this;

      vm.currentUser = vm.Session.getCurrentUser();

      // handle login
      vm.$scope.$on(vm.AUTH_EVENTS.loginSuccess, function () {
        vm.currentUser = vm.Session.getCurrentUser();
      });

      // handle logout
      vm.$scope.$on(vm.AUTH_EVENTS.logoutSuccess, function () {
        vm.currentUser = vm.Session.getCurrentUser();
      });
    };

    AuthUserController.prototype.onClickLogout = function (){
      var vm = this;

      vm.AuthService.logout();
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/auth-user/auth-user.html',
      controller: AuthUserController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

  }

})();
