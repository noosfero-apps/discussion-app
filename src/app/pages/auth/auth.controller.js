(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('AuthPageController', AuthPageController);

  /** @ngInject */
  function AuthPageController($scope, $rootScope, $window, $location, $state, $timeout, $interval, APP, AUTH_EVENTS, AuthService, DialogaService, Session, vcRecaptchaService, $log) {
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
    vm.vcRecaptchaService = vcRecaptchaService;
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
    vm.recaptchaResponse = null;
    vm.recaptchaWidgetId = null;

    vm.search = vm.$location.search();
    var redirect = vm.search.redirect_uri || '';
    if (redirect && redirect.length > 0) {
      vm.params = JSON.parse('{"' + decodeURI(redirect).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
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
      vm.clearMessages();
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
      vm.$log.debug('[register success] response', response);
    });

    vm.$scope.$on(vm.AUTH_EVENTS.registerFailed, function(event, response) {
      vm.$log.debug('[register error] response', response);

      // REMOVED: feedback alread on "reject handler"
      // var reason = response.data.message;
      // vm.errorMessage = reason;
    });

    vm.$scope.$on('oauthClientPluginResult', function(event, response) {
      vm.$log.debug('response', response);

      var logged_in = response.data.logged_in;
      // var message = response.data.message;
      var private_token = response.data.private_token;

      // Garante que o 'user' sempre terá a propriedade 'private_token'
      if (response.data.user && !response.data.user.private_token) {
        response.data.user.private_token = private_token;
      }

      // Se o usuário autorizou o login via a rede social, 'logged_in' é 'true'
      if (logged_in) {
        var currentUser = vm.Session.create(response.data);

        vm.$rootScope.currentUser = currentUser;
        vm.$rootScope.$broadcast(vm.AUTH_EVENTS.loginSuccess, currentUser);
      }
    });

    // reCaptcha Listeners
    vm.setWidgetId = function(widgetId) {
      // store the `widgetId` for future usage.
      // For example for getting the response with
      // `recaptcha.getResponse(widgetId)`.
      vm.$log.info('Created widget ID:', widgetId);
      vm.recaptchaWidgetId = widgetId;
      
    };

    vm.setResponse = function(response) {
      
      // Update local captcha response
      vm.$log.debug('Response available', response);
      vm.recaptchaResponse = response;
    };

    vm.cbExpiration = function() {
      // reset the 'response' object that is on scope 
      vm.$log.debug('cbExpiration');
    };
  };

  AuthPageController.prototype.onClickLogout = function() {
    var vm = this;

    vm.AuthService.logout();
  };

  AuthPageController.prototype.submitSignup = function($event, credentials) {
    var vm = this;

    credentials.g_recaptcha_response = vm.recaptchaResponse;
    
    vm.AuthService.register(credentials)
    .then(function(/*response*/) {
      // SUCCESS
      
      vm.signupSuccess = true;
      // vm._startRedirect();

    })
    .catch(function(response) {
      
      // In case of a failed validation you need to reload the captcha
      // because each response can be checked just once
      vm.vcRecaptchaService.reload(vm.recaptchaWidgetId);

      vm.signupError = true;
      vm.signupErrorTitle = 'Erro!';
      vm.signupErrorMessage = response.data.message;

      // 4xx client error
      if (response.status >= 400 && response.status < 500) {
        var errors = JSON.parse(response.data.message);
        if (errors && errors.email) {
          vm.signupErrorMessage = 'E-mail já está em uso.';
        }
      }
      
      // 5xx server error
      if (response.status >= 500 && response.status < 600) {
        vm.internalError = true;
      }
    })
    .finally(function(){
      // vm.loadingSubmit = false;
    });
  };

  AuthPageController.prototype.submitSignin = function(credentials) {
    var vm = this;

    vm.AuthService.login(credentials)
    .then(function(/*user*/) {

      vm.showSigninSuccessMessage();
      vm._startRedirect(); //
    }, function(response) {
      // handle view
      vm.$log.error('Error on "submitSignin"', response);

      vm.signinError = true;
      
      // 4xx client error
      if (response.status >= 400 && response.status < 500) {
        
        vm.signinErrorTitle = 'Erro!';
        vm.signinErrorContent = response.data.message;

        if (response.status === 401) {
          vm.signinErrorTitle = 'Acesso não autorizado!';
          vm.signinErrorContent = 'E-mail ou senha incorretos.';
        }
      }

    });
  };

  AuthPageController.prototype.submitRecover = function($event, recoverForm) {
    var vm = this;

    // init vars
    vm.loadingSubmitRecover = true;

    // get form data
    var data = {
      login: recoverForm.login.$modelValue,
      g_recaptcha_response: vm.recaptchaResponse
    };

    var promiseRequest = vm.AuthService.forgotPassword(data);
    
    // SUCCES
    promiseRequest.then(function(response) {
      vm.$log.debug('recover success.response', response);

      vm.recoverSuccess = true;
    });

    // ERROR
    promiseRequest.catch(function(response) {
      vm.$log.debug('recover error.response', response);

      vm.recoverError = true;
      vm.recoverErrorMessage = response.data.message;

      // Client Error
      if (response.status >= 400 && response.status < 500) {
        if (response.status === 404) {
          vm.recoverErrorMessage = 'E-mail não cadastrado no Dialoga Brasil.';
        }
      }
      
      // Server Error
      if (response.status >= 500 && response.status < 600) {
        vm.internalError = true;
      }
    });

    // ALWAYS
    promiseRequest.finally(function() {
      vm.loadingSubmitRecover = false;
    });
  };

  AuthPageController.prototype.submitConfirmationForm = function($event, confirmationForm) {
    var vm = this;

    // get form data
    var data = {
      login: confirmationForm.login.$modelValue,
      g_recaptcha_response: vm.recaptchaResponse
    };

    // get captcha token
    vm.AuthService.resendConfirmation(data)
    .then(function(response) {
      vm.$log.debug('resendConfirmation success.response', response);

      vm.resendConfirmationSuccess = true;
      
      // Feedback para usuário já ativo na plataforma
      var user = response.data.users[0];
      if (user && (user.activated === true)) {
        vm.resendConfirmationSuccessTitle = 'Usuário já está ativo!';
        vm.resendConfirmationSuccessMessage = 'O e-mail informado já foi confirmado.';
      }else {
        vm.resendConfirmationSuccessTitle = 'Pronto!';
        vm.resendConfirmationSuccessMessage = 'Em instantes você receberá em seu e-mail um link para confirmar o seu cadastro.';
      }

    })
    .catch(function(response) {
      vm.$log.debug('resendConfirmation error.response', response);

      vm.resendConfirmationError = true;
      vm.resendConfirmationErrorMessage = response.data.message;

      // Client Error
      // if (response.status >= 400 && response.status < 500){}
      
      // Server Error
      if (response.status >= 500 && response.status < 600) {
        vm.internalError = true;
      }
    })
    .finally(function() {
      
    });
  };

  AuthPageController.prototype.clearMessages = function() {
    var vm = this;

    // success
    vm.signupSuccess = false;
    vm.signinSuccess = false;
    vm.confirmSuccess = false;
    
    // error
    vm.signinError = false;
    vm.signupError = false;

  };
  AuthPageController.prototype.showSigninSuccessMessage = function() {
    var vm = this;

    vm.signinSuccess = true;
    vm.successMessage = 'Login efetuado com sucesso!';
  };

  AuthPageController.prototype._startRedirect = function() {
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

    // start redirect delay
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

    var url = 'http://login.dialoga.gov.br/plugin/oauth_client/facebook?oauth_client_popup=true&id=' + vm.APP.facebook_app_id;
    vm.$window.oauthClientAction(url);
  };

  AuthPageController.prototype.authWithGooglePlus = function() {
    var vm = this;

    var url = 'http://login.dialoga.gov.br/plugin/oauth_client/google_oauth2?oauth_client_popup=true&id=' + vm.APP.google_app_id;
    vm.$window.oauthClientAction(url);
  };
})();
