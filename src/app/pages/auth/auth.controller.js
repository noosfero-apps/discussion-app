(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('AuthPageController', AuthPageController);

  /** @ngInject */
  function AuthPageController($scope, $rootScope, $window, $location, $state, $timeout, $interval, APP, AUTH_EVENTS, AuthService, DialogaService, Session, $log) {
    var vm = this;

    vm.$scope = $scope;
    vm.$rootScope = $rootScope;
    vm.$window = $window;
    vm.$location = $location;
    vm.$state = $state;
    vm.$timeout = $timeout;
    vm.$interval = $interval;
    vm.APP = APP;
    vm.AUTH_EVENTS = AUTH_EVENTS;
    vm.AuthService = AuthService;
    vm.DialogaService = DialogaService;
    vm.Session = Session;
    vm.$log = $log;

    vm.init();
    vm.loadData();
    vm.attachListeners();

    vm.$rootScope.focusMainContent();

    vm.$log.debug('AuthPageController');
  }

  AuthPageController.prototype.init = function() {
    var vm = this;

    // init variables
    vm.signin = {};
    vm.signup = {};
    vm.terms = null;
    vm.loadingTerms = null;
    vm.delay = 3; // segundos
    vm.countdown = 0;

    vm.search = vm.$location.search();
    var redirect = vm.search.redirect_uri || '';
    if (redirect && redirect.length > 0) {
      vm.params = JSON.parse('{"' + decodeURI(redirect).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
      vm.hasRedirect = true;
    }

    // attach events
    vm.currentUser = vm.Session.getCurrentUser();

    // handle login
    vm.$scope.$on(vm.AUTH_EVENTS.loginSuccess, function() {
      vm.currentUser = vm.Session.getCurrentUser();
    });

    // handle logout
    vm.$scope.$on(vm.AUTH_EVENTS.logoutSuccess, function() {
      vm.currentUser = vm.Session.getCurrentUser();
    });
  };

  AuthPageController.prototype.loadData = function() {
    var vm = this;

    // load terms
    vm.loadingTerms = true;
    vm.DialogaService.getTerms(function(data) {
      vm.loadingTerms = false;
      vm.terms = data.article;
    }, function(error) {
      // vm.$log.debug('handleSuccess.error', error);
      vm.loadingTerms = false;
      vm.error = error;
    });
  };

  AuthPageController.prototype.attachListeners = function() {
    var vm = this;

    vm.$scope.$on(vm.AUTH_EVENTS.registerSuccess, function(event, response) {
      vm.$log.debug('TODO: handle register success');
      vm.$log.debug('[register success] response', response);
    });

    vm.$scope.$on(vm.AUTH_EVENTS.registerFailed, function(event, response) {
      vm.$log.debug('TODO: handle register error');
      vm.$log.debug('[register error] response', response);

      var reason = response.data.message;
      vm.errorMessage = reason;
    });

    vm.$scope.$on('oauthClientPluginResult', function(event, response) {
      vm.$log.debug('response', response);

      // var logged_id = response.data.logged_id;
      // var private_token = response.data.private_token;
      // var user = response.data.user;
    });

    var stop = null;
    stop = vm.$interval(function(){
      var $el = angular.element('#serpro_captcha');

      if ($el && $el.length > 0 ){
        vm.$window.initCaptcha($el[0]);
        vm.$interval.cancel(stop);
        stop = undefined;
      }

    }, 200);
  };

  AuthPageController.prototype.onClickLogout = function() {
    var vm = this;

    vm.AuthService.logout();
  };

  AuthPageController.prototype.submitSignup = function($event, credentials) {
    var vm = this;

    var target = $event.target;
    var $target = angular.element(target);
    var $captcha = $target.find('[name="txtToken_captcha_serpro_gov_br"]');
    credentials.txtToken_captcha_serpro_gov_br = $captcha.val();

    // vm.signupFormStatus = 'SENDIN';
    vm.AuthService.register(credentials).then(function(response) {
      vm.$log.debug('register success.response', response);

      // TODO: mensagens de sucesso
      // 'Cadastro efetuado com sucesso.'
      // 'Verifique seu email para confirmar o cadastro.'
      vm.messageTitle = 'Cadastro efetuado com sucesso!';
      vm.successMessage = 'Verifique seu e-mail para confirmar o cadastro.';
      vm.redirectBack();
    }, function(response) {
      vm.$log.debug('register error.response', response);

      var message = response.data.message;
      vm.errorMessage = message;

      if(response.data.code === 500){
        vm.internalError = true;
      }


      // TODO: mensagens de erro
      // TODO: tratar multiplos erros

      // javascript_console_message: "Unable to reach Serpro's Captcha validation service"
      // message: "Internal captcha validation error"
    });
  };

  AuthPageController.prototype.submitSignin = function(credentials) {
    var vm = this;

    vm.AuthService.login(credentials).then(function(user) {
      // handle view
      vm.$log.debug('user', user);

      vm.successMessage = 'Login efetuado com sucesso!';
      vm.redirectBack();
    }, function() {
      // handle view
    });
  };

  AuthPageController.prototype.submitRecover = function($event, recoverForm) {
    var vm = this;

    // get form data
    var data = {
      login: recoverForm.login.$modelValue,
      captcha_text: recoverForm.captcha_text.$modelValue
    };

    // get captcha token
    var target = $event.target;
    var $target = angular.element(target);
    var $captcha = $target.find('[name="txtToken_captcha_serpro_gov_br"]');
    data.txtToken_captcha_serpro_gov_br = $captcha.val();

    vm.AuthService.forgotPassword(data).then(function(response) {
      vm.$log.debug('recover success.response', response);

      vm.successRecoverMessageTitle = 'Pedido enviado sucesso!';
      vm.successRecoverMessage = 'Verifique seu e-mail. Em instantes você receberá um e-mail com um link para redefinir sua senha.';
      // vm.redirectBack();
    }, function(response){
      vm.$log.debug('recover error.response', response);

      var message = response.data.message;
      vm.errorRecoverMessage = message;

      if(response.data.code === 500){
        vm.internalError = true;
      }
    }).catch(function(error){
      vm.$log.debug('recover catch.error', error);
    });
  };

  AuthPageController.prototype.redirectBack = function() {
    var vm = this;

    if (!vm.hasRedirect) {
      vm.$log.debug('No redirect params defined.');
      return;
    }

    // start countdown
    vm.countdown = vm.delay;
    var stop = null;
    stop = vm.$interval(function() {
      vm.countdown--;
      if (vm.countdown <= 0) {
        vm.$interval.cancel(stop);
        stop = undefined;
      }
    }, 1000);

    vm.$timeout(function() {
      var state = vm.params.state;
      switch (state){
        case 'inicio':
          vm.$state.go(state, {
            event_id: vm.params.event_id,
            task: vm.params.task
          });
          break;
        case 'programa':
          vm.$state.go(state, {
            slug: vm.params.slug,
            task: vm.params.task,
            proposal_id: vm.params.proposal_id,
          });
          break;
        default:
          vm.$log.debug('State not handled yet:', state);
          break;
      }
    }, vm.delay * 1000);
  };

  AuthPageController.prototype.authWithFacebook = function() {
    var vm = this;
    // var url = 'http://login.dialoga.gov.br/plugin/oauth_client/facebook?oauth_client_popup=true&id=1';
    var url = 'http://login.dialoga.gov.br/plugin/oauth_client/facebook?oauth_client_popup=true&id=' + vm.APP.facebook_app_id;
    vm.$window.oauthClientAction(url);
  };

  AuthPageController.prototype.authWithGooglePlus = function() {
    var vm = this;

    var url = 'http://login.dialoga.gov.br/plugin/oauth_client/google_oauth2?oauth_client_popup=true&id=' + vm.APP.goople_app_id;
    vm.$window.oauthClientAction(url);
  };
})();
