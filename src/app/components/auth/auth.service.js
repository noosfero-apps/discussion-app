(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('Session', Session)
    .factory('AuthService', AuthService)
    .factory('AuthInterceptor', AuthInterceptor);

  /** @ngInject */
  function AuthService($http, $rootScope, Session, AUTH_EVENTS, API, $log) {

    var service = {
      login: login,
      logout: logout,
      isAuthenticated: isAuthenticated,
      isAuthorized: isAuthorized
    };

    $log.debug('AuthService', service);
    return service;

    function login (credentials) {
      var url = API.host + '/api/v1/login';
      var encodedData = 'login=' + credentials.username + '&password=' + credentials.password;

      return $http
        .post(url, encodedData)
        .then(function(response) {
          $log.debug('AuthService.login [SUCCESS] response', response);

          var currentUser = Session.create(response.data);

          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, currentUser);
          return currentUser;
        }, function(response) {
          $log.debug('AuthService.login [FAIL] response', response);
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    }

    function logout () {
      Session.destroy();
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
  }

  /** @ngInject */
  function Session($cookies, $log) {

    var service = {};

    var currentUser = $cookies.getObject('currentUser') || {};

    service.create = function(data) {

      currentUser.id = data.id;
      currentUser.email = data.email;
      currentUser.login = data.login;
      currentUser.permissions = data.permissions;
      currentUser.person = data.person;
      currentUser.private_token = data.private_token;
      currentUser.activated = data.activated;

      $cookies.putObject('currentUser', currentUser);

      $log.debug('User session created.', currentUser);
      return currentUser;
    };

    service.destroy = function() {

      currentUser = {};

      $cookies.remove('currentUser');

      $log.debug('User session destroyed.');
    };

    service.getCurrentUser = function () {
      return currentUser;
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
