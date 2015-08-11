(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($rootScope, AUTH_EVENTS, AuthService, Session, $log) {
    $log.debug('LoginController');

    var vm = this;

    vm.$rootScope = $rootScope;
    vm.AUTH_EVENTS = AUTH_EVENTS;
    vm.AuthService = AuthService;
    vm.Session = Session;
    vm.$log = $log;

    vm.init();
  }

  LoginController.prototype.init = function() {
    var vm = this;

    // init variables
    vm.credentials = {};

    // attach events

    // ...
  };

  LoginController.prototype.login = function(credentials) {
    var vm = this;

    vm.AuthService.login(credentials).then(function(user) {
      // handle view
    }, function() {
      // handle view
    });
  };

})();
