/* global window:true */
(function() {
  'use strict';

  angular
    .module('dialoga')
    .constant('API', {
      token: null,
      hostDev: '',
      hostHom: 'http://hom.dialoga.gov.br',
      hostProd: 'http://login.dialoga.gov.br',
      articleId: {
        home: '103358',
        about: '108073',
        terms: '107880'
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
