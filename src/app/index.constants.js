/* global window:true */
(function() {
  'use strict';

  angular
    .module('dialoga')
    .constant('PATH', {
      host: 'http://hom.dialoga.gov.br',
      image: 'http://hom.login.dialoga.gov.br'
    })
    .constant('APP', {
      facebook_app_id: '1',
      google_app_id: '4',
      recaptcha_key: '6LeDTRUTAAAAAA1VMOmIa2oqqWaPfXsv7J90r_49',
    })
    .constant('API', {
      token: null,
      articleId: {
        home: '103358',
        about: '108073',
        acessibility: '117319',
        terms: '107880',
        faq: '117322'
      },
      communityId: '19195',
    })
    .constant('AUTH_EVENTS', {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      registerSuccess: 'auth-register-success',
      registerFailed: 'auth-register-failed',
      activateSuccess: 'auth-activate-success',
      activateFailed: 'auth-activate-failed',
      resendConfirmationSuccess: 'auth-resend-confirmation-success',
      resendConfirmationFailed: 'auth-resend-confirmation-failed',
      changePasswordSuccess: 'auth-changePassword-success',
      changePasswordFailed: 'auth-changePassword-failed',
      forgotPassowrdSuccess: 'auth-forgotPassowrd-success',
      forgotPassowrdFailed: 'auth-forgotPassowrd-failed',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    })
    .constant('VOTE_STATUS', {
      SUCCESS: 1,
      ERROR: 2,
      LOADING: 4,
      LOADED: 8
    })
    .constant('VOTE_OPTIONS', {
      UP: 1,
      DOWN: -1,
      SKIP: 0
    })
    .constant('PROPOSAL_STATUS', {
      SUCCESS: 1,
      ERROR: 2,
      LOADING: 4,
      LOADED: 8,
      SENDING: 16,
      SENT: 32
    })
    .constant('USER_ROLES', {
      all: '*',
      admin: 'admin',
      restrict: 'restrict',
      visitor: 'visitor'
    })
    .constant('Modernizr', window.Modernizr)
    .constant('jQuery', window.jQuery)
    .constant('outdatedBrowser', window.outdatedBrowser)
    ;

})();
