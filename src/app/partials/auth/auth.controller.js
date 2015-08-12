(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('AuthController', AuthController);

  /** @ngInject */
  function AuthController($rootScope, AUTH_EVENTS, AuthService, Session, $log) {
    $log.debug('AuthController');

    var vm = this;

    vm.$rootScope = $rootScope;
    vm.AUTH_EVENTS = AUTH_EVENTS;
    vm.AuthService = AuthService;
    vm.Session = Session;
    vm.$log = $log;

    vm.init();
  }

  AuthController.prototype.init = function() {
    var vm = this;

    // init variables
    vm.credentials = {};

    // attach events

    // ...
  };

  AuthController.prototype.login = function(credentials) {
    var vm = this;

    vm.AuthService.login(credentials).then(function(user) {
      // handle view
    }, function() {
      // handle view
    });
  };

})();
