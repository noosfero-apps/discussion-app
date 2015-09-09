(function () {
  'use strict';

  angular
    .module('dialoga')
    .controller('AuthPageController', AuthPageController);

  /** @ngInject */
  function AuthPageController($scope, $rootScope, $location, $state, AUTH_EVENTS, AuthService, DialogaService, Session, $log) {
    var vm = this;

    vm.$scope = $scope;
    vm.$rootScope = $rootScope;
    vm.$location = $location;
    vm.$state = $state;
    vm.AUTH_EVENTS = AUTH_EVENTS;
    vm.AuthService = AuthService;
    vm.DialogaService = DialogaService;
    vm.Session = Session;
    vm.$log = $log;

    vm.init();
    vm.loadData();

    vm.$log.debug('AuthPageController');
  }

  AuthPageController.prototype.init = function() {
    var vm = this;

    // init variables
    vm.signin = {};
    vm.singup = {};
    vm.terms = null;
    vm.loadingTerms = null;

    vm.search = vm.$location.search();
    var redirect = vm.search.redirect_uri || '';
    if(redirect && redirect.length > 0){
      vm.params = JSON.parse('{"' + decodeURI(redirect).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    }

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

  AuthPageController.prototype.submitSigup = function(credentials) {
    var vm = this;

    vm.AuthService.register(credentials).then(function(response){
      vm.$log.debug('register success.response', response);

      // TODO: mensagens de sucesso
      // 'Cadastro efetuado com sucesso.'
      // 'Verifique seu email para confirmar o cadastro.'

      // TODO: show messagens and redirect timeout
      vm.redirectBack();
    }, function(response){
      vm.$log.debug('register error.response', response);

      // TODO: mensagens de erro
      // TODO: tratar multiplos erros
    });
  };

  AuthPageController.prototype.submitSignin = function(credentials) {
    var vm = this;

    vm.AuthService.login(credentials).then(function(user) {
      // handle view
      vm.$log.debug('user', user);
      vm.redirectBack();
    }, function() {
      // handle view
    });
  };

  AuthPageController.prototype.redirectBack = function(){
    var vm = this;

    if(!vm.params){
      vm.$log.warn('No redirect params defined.');
      return;
    }
    var state = vm.params.state;
    switch(state){
      case 'inicio':
        vm.$state.go(state, {
          event_id: vm.params.event_id,
          task: vm.params.task
        });
        break;
    }
  }

})();
