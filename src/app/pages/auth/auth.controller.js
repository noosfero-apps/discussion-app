(function () {
  'use strict';

  angular
    .module('dialoga')
    .controller('AuthPageController', AuthPageController);

  /** @ngInject */
  function AuthPageController($scope, $rootScope, AUTH_EVENTS, AuthService, DialogaService, Session, $log) {
    $log.debug('AuthPageController');

    var vm = this;

    vm.$rootScope = $rootScope;
    vm.$scope = $scope;
    vm.AUTH_EVENTS = AUTH_EVENTS;
    vm.AuthService = AuthService;
    vm.DialogaService = DialogaService;
    vm.Session = Session;
    vm.$log = $log;

    vm.init();
    vm.loadData();
  }

  AuthPageController.prototype.init = function() {
    var vm = this;

    // init variables
    vm.credentials = {};
    vm.terms = null;
    vm.loadingTerms = null;

    // attach events
    vm.currentUser = vm.Session.getCurrentUser();

      // handle login
      vm.$scope.$on(vm.AUTH_EVENTS.loginSuccess, function () {
        vm.currentUser = vm.Session.getCurrentUser();
      });

      // handle logout
      vm.$scope.$on(vm.AUTH_EVENTS.logoutSuccess, function () {
        vm.currentUser = vm.Session.getCurrentUser();
      });
    // ...
  };

  AuthPageController.prototype.loadData = function() {
    var vm = this;

    // load terms
    vm.loadingTerms = true;
    vm.DialogaService.getTerms(function(data){
      vm.loadingTerms = false;
      vm.terms = data.article;
    }, function(error){
      // vm.$log.debug('handleSuccess.error', error);
      vm.loadingTerms = false;
      vm.error = error;
    });
  };


  AuthPageController.prototype.onClickLogout = function (){
    var vm = this;

    vm.AuthService.logout();
  };

  AuthPageController.prototype.login = function(credentials) {
    var vm = this;

    vm.AuthService.login(credentials).then(function(user) {
      // handle view
      vm.$log.debug('user', user);
    }, function() {
      // handle view
    });
  };

})();
