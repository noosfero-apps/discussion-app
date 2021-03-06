(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('Session', Session)
    .factory('AuthService', AuthService)
    .factory('AuthInterceptor', AuthInterceptor);

  /** @ngInject */
  function AuthService($q, $http, $rootScope, Session, AUTH_EVENTS, API, PATH, $log) {

    function register (data){
      var url = PATH.host + '/api/v1/register';
      $log.debug('data', data);
      // var encodedData = data;
      var encodedData = '';
      encodedData += 'name=' + data.name;
      encodedData += '&email=' + data.email;
      encodedData += '&login=' + data.email.substr(0, data.email.indexOf('@')).toLowerCase().replace(/\W+/g,'').substr(0,25) + '-' + Date.now();
      encodedData += '&email=' + data.email;
      encodedData += '&password=' + data.password;
      encodedData += '&password_confirmation=' + data.password_confirmation;
      encodedData += '&user_terms_accepted=' + data.user_terms_accepted;
      encodedData += '&g_recaptcha_response=' + data.g_recaptcha_response;

      // var encodedData = _encodeObj(data);
      // var encodedData = angular.element.param(data);
      // '&email=&login=&name=&password=&password_confirmation';
      // oauth_providers
      // oauth_signup_token
      // g_recaptcha_response
      // user_terms_accepted

      return $http.post(url, encodedData)
        .then(function(response) {
          $log.debug('AuthService.register [SUCCESS] response', response);

          var data = response.data;

          if ( data.user && data.user.activated === false){
            // usuário criado E não verificado o e-mail
            
          }

          if ( data.user && data.user.activated === true){
            // usuário criado E não verificado o e-mail
            var currentUser = Session.create(data);

            $rootScope.currentUser = currentUser;
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, currentUser);
          }
          
          $rootScope.$broadcast(AUTH_EVENTS.registerSuccess, data.user);
          return response;
          
        }, function(response) {

          $log.debug('AuthService.register [FAIL] response', response);
          $rootScope.$broadcast(AUTH_EVENTS.registerFailed, response);

          return $q.reject(response);
        });
    }

    function activate (code) {
      var url = PATH.host + '/api/v1/activate';
      var encodedData = 'activation_code=' + code;

      return $http
        .patch(url, encodedData)
        .then(function(response) {
          $log.debug('AuthService.activate [SUCCESS] response', response);

          // 'Usuário ativado com sucesso'
          $rootScope.$broadcast(AUTH_EVENTS.activateSuccess, response);
          return response;
        }, function(response) {
          // 'Erro: O código de ativação é inválido.'
          $log.debug('AuthService.activate [FAIL] response', response);
          $rootScope.$broadcast(AUTH_EVENTS.activateFailed);

          return $q.reject(response);
        });
    }

    function resendConfirmation (data) {
      var url = PATH.host + '/api/v1/resend_activation_code';
      var encodedData = ([
        'value=' + data.login,
        'g_recaptcha_response=' + data.g_recaptcha_response
        ]).join('&');

      url += '?' + encodedData;

      return $http
        .post(url)
        .then(function(response) {
          $log.debug('AuthService.resendConfirmation [SUCCESS] response', response);

          // 'Usuário ativado com sucesso'
          $rootScope.$broadcast(AUTH_EVENTS.resendConfirmationSuccess, response);
          return response;
        }, function(response) {
          // 'Erro: O código de ativação é inválido.'
          $log.debug('AuthService.resendConfirmation [FAIL] response', response);
          $rootScope.$broadcast(AUTH_EVENTS.resendConfirmationFailed);

          return $q.reject(response);
        });
    }

    function changePassword (data){
      var url = PATH.host + '/api/v1/new_password';
      var encodedData = 'code=' + data.code;
      encodedData += '&password=' + data.newPassword;
      encodedData += '&password_confirmation=' + data.newPasswordConfirmation;

      return $http
        .patch(url + '?' + encodedData)
        .then(function(response) {
          $log.debug('AuthService.changePassword [SUCCESS] response', response);

          // 'Senha alterada com sucesso.'
          $rootScope.$broadcast(AUTH_EVENTS.changePasswordSuccess, response);
          return response;
        }, function(response) {
          // 'Não foi possível trocar a senha com os dados informados.'
          $log.debug('AuthService.changePassword [FAIL] response', response);
          $rootScope.$broadcast(AUTH_EVENTS.changePasswordFailed);

          return $q.reject(response);
        });
    }

    function forgotPassword (data){
      var url = PATH.host + '/api/v1/forgot_password';
      var encodedData = ([
        'value=' + data.login,
        'g_recaptcha_response=' + data.g_recaptcha_response
        ]).join('&');

      return $http
        .post(url, encodedData)
        .then(function(response) {
          $log.debug('AuthService.forgotPassword [SUCCESS] response', response);

          // 'Verifique seu email para efetuar a troca da senha.'
          $rootScope.$broadcast(AUTH_EVENTS.forgotPasswordSuccess, response);

          return response;
        }, function(response) {
          // 'Não foi possível requisitar a troca de senha para os dados informados.'
          $log.debug('AuthService.forgotPassword [FAIL] response', response);
          $rootScope.$broadcast(AUTH_EVENTS.forgotPasswordFailed);

          return $q.reject(response);
        });
    }

    function login (credentials) {
      var url = PATH.host + '/api/v1/login';
      var encodedData = 'login=' + credentials.username + '&password=' + credentials.password;

      return $http
        .post(url, encodedData)
        .then(function(response) {
          $log.debug('AuthService.login [SUCCESS] response', response);

          var currentUser = Session.create(response.data);
          $rootScope.currentUser = currentUser;

          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, currentUser);
          return currentUser;
        }, function(response) {
          $log.debug('AuthService.login [FAIL] response', response);
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);

          return $q.reject(response);
        });
    }

    function loginCaptcha (data) {
      var url = PATH.host + '/api/v1/login-captcha';
      var encodedData = angular.element.param(data);

      return $http.post(url, encodedData).then(function(response){
        // SUCCESS
        $log.debug('AuthService.loginCaptcha [SUCCESS] response', response);

        var temporaryToken = response.data.private_token;
        Session.setTemporaryToken(temporaryToken);
        $rootScope.temporaryToken = temporaryToken;
        return temporaryToken;
      }, function(response){
        return $q.reject(response.data);
      });
    }

    function logout () {

      Session.destroy();
      $rootScope.currentUser = undefined;
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    function isAuthenticated () {
      return !!Session.userId;
    }

    function isAuthorized (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }

      return (service.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
    }

    var service = {
      register: register,
      activate: activate,
      resendConfirmation: resendConfirmation,
      changePassword: changePassword,
      forgotPassword: forgotPassword,
      login: login,
      loginCaptcha: loginCaptcha,
      logout: logout,
      isAuthenticated: isAuthenticated,
      isAuthorized: isAuthorized
    };

    $log.debug('AuthService', service);
    return service;
  }

  /** @ngInject */
  function Session($localStorage, $log) {

    var service = {};

    // $localStorage.currentUser = $localStorage.currentUser || null;

    service.create = function(data) {

      $localStorage.currentUser = data.user;
      $log.debug('User session created.', $localStorage.currentUser);

      return $localStorage.currentUser;
    };

    service.destroy = function() {

      delete $localStorage.currentUser;

      $log.debug('User session destroyed.');
    };

    service.getCurrentUser = function () {
      return $localStorage.currentUser;
    };

    service.setTemporaryToken = function (private_token) {
      $localStorage.temporaryToken = private_token;
    };

    service.getTemporaryToken = function () {
      return $localStorage.temporaryToken;
    };

    return service;
  }

  /** @ngInject */
  function AuthInterceptor ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function(response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized,
          419: AUTH_EVENTS.sessionTimeout,
          440: AUTH_EVENTS.sessionTimeout
        }[response.status], response);
        return $q.reject(response);
      }
    };
  }

  // /** @ngInject */
  // function AuthResolver($q, $rootScope, $state){
  //   return {
  //     resolve: function () {
  //       var deferred = $q.defer();
  //       var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
  //         if (angular.isDefined(currentUser)) {
  //           if (currentUser) {
  //             deferred.resolve(currentUser);
  //           } else {
  //             deferred.reject();
  //             // TODO: too many responsibilities?
  //             $state.go('login');
  //           }
  //           unwatch();
  //         }
  //       });
  //       return deferred.promise;
  //     }
  //   };
  // }

})();
