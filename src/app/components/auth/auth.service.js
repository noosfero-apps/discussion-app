(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('Session', Session)
    .factory('AuthService', AuthService)
    .factory('AuthInterceptor', AuthInterceptor);

  /** @ngInject */
  function AuthService($http, $rootScope, Session, AUTH_EVENTS, API, $log) {

    function register (data){
      var url = API.host + '/api/v1/register';
      $log.debug('data', data);
      // var encodedData = data;
      var encodedData = '';
      encodedData += 'name=' + data.name;
      encodedData += '&email=' + data.email;
      encodedData += '&login=' + data.email.substr(0, data.email.indexOf('@')).toLowerCase().replace(/\W+/g,"").substr(0,25) + "-" + Date.now();
      encodedData += '&email=' + data.email;
      encodedData += '&password=' + data.password;
      encodedData += '&password_confirmation=' + data.password_confirmation;
      encodedData += '&user_terms_accepted=' + data.user_terms_accepted;

      // var encodedData = _encodeObj(data);
      // var encodedData = angular.element.param(data);
      // '&email=&login=&name=&password=&password_confirmation';
      // oauth_providers
      // oauth_signup_token
      // captcha_text
      // user_terms_accepted

      return $http.post(url, encodedData)
        .then(function(response) {
          $log.debug('AuthService.register [SUCCESS] response', response);

          var currentUser = Session.create(response.data);

          $rootScope.$broadcast(AUTH_EVENTS.registerSuccess, currentUser);
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, currentUser);

          return response;
        }, function(response) {
          $log.debug('AuthService.register [FAIL] response', response);

          $rootScope.$broadcast(AUTH_EVENTS.registerFailed);
          return response;
        });
    }

    function activate (code) {
      var url = '/api/v1/activate';
      var data = {
        private_token: API.token,
        activation_code: code
      };
      var encodedData = 'private_token=' + API.token;
      encodedData += '&activation_code=' + code;

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
        });
    }

    function changePassword (code, newPassword, newPasswordConfirmation){
      var url = '/api/v1/new_password';
      var data = {
        code: code,
        password: newPassword,
        password_confirmation: newPasswordConfirmation
      };
      var encodedData = 'code=' + code;
      encodedData += '&password=' + newPassword;
      encodedData += '&password_confirmation=' + newPasswordConfirmation;

      return $http
        .patch(url, encodedData)
        .then(function(response) {
          $log.debug('AuthService.changePassword [SUCCESS] response', response);

          // 'Senha alterada com sucesso.'
          $rootScope.$broadcast(AUTH_EVENTS.changePasswordSuccess, response);
          return response;
        }, function(response) {
          // 'Não foi possível trocar a senha com os dados informados.'
          $log.debug('AuthService.changePassword [FAIL] response', response);
          $rootScope.$broadcast(AUTH_EVENTS.changePasswordFailed);
        });
    }

    function forgotPassword (form){
      var url = '/api/v1/forgot_password';
      var data = form.serialize();
      var encodedData = data;

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
        });
    }

    function login (credentials) {
      var hostProd = 'http://login.dialoga.gov.br';
      var url = hostProd + '/api/v1/login';
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
        });
    }

    function logout () {

      Session.destroy();
      $rootScope.currentUser = null;
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

    function _encodeObj(obj){
      var result = [];
      var str = null;
      var p = null;

      for (p in obj) {
        if (obj.hasOwnProperty(p)) {
          // str = encodeURIComponent(p) + '=' + obj[p];
          str = p + '=' + obj[p];
          result.push(str);
        }
      }

      return result.join('&');
    }

    var service = {
      register: register,
      activate: activate,
      changePassword: changePassword,
      forgotPassword: forgotPassword,
      login: login,
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

      $localStorage.currentUser = data;
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
