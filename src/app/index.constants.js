/* global window:true */
(function() {
  'use strict';

  angular
    .module('dialoga')
    .constant('api', {
      token: null,
      hostHom: 'http://hom.dialoga.gov.br',
      hostProd: 'http://login.dialoga.gov.br',
      // host: 'http://www.participa.br',
      articleId: {
        home: 103358
      }
    })
    .constant('AUTH_EVENTS', {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    })
    .constant('USER_ROLES', {
      all: '*',
      admin: 'admin',
      restrict: 'restrict',
      visitor: 'visitor'
    })
    .constant('Modernizr', window.Modernizr)
    .constant('jQuery', window.jQuery)
    // .constant('key', value)
    ;

})();
