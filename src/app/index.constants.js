/* global window:true */
(function() {
  'use strict';

  angular
    .module('dialoga')
    .constant('PATH', {
      host: 'http://dialoga.gov.br',
      image: 'http://login.dialoga.gov.br'
    })
    .constant('API', {
      token: null,
      articleId: {
        home: '103358',
        about: '108073',
        terms: '107880'
      },
      communityId: '19195'
    })
    .constant('AUTH_EVENTS', {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      registerSuccess: 'auth-register-success',
      registerFailed: 'auth-register-failed',
      activateSuccess: 'auth-activate-success',
      activateFailed: 'auth-activate-failed',
      changePasswordSuccess: 'auth-changePassword-success',
      changePasswordFailed: 'auth-changePassword-failed',
      forgotPassowrdSuccess: 'auth-forgotPassowrd-success',
      forgotPassowrdFailed: 'auth-forgotPassowrd-failed',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    })
    .constant('VOTE_STATUS', {
      SUCCESS: 0x1,
      ERROR: 0x10,
      LOADING: 0x100
    })
    .constant('VOTE_OPTIONS', {
      UP: 0x1,
      DOWN: 0x10,
      SKIP: 0x100
    })
    .constant('USER_ROLES', {
      all: '*',
      admin: 'admin',
      restrict: 'restrict',
      visitor: 'visitor'
    })
    .constant('Modernizr', window.Modernizr)
    .constant('jQuery', window.jQuery)
    ;

})();
