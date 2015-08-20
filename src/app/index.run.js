/* globals document:true*/
(function() {
  'use strict';

  angular
    .module('dialoga')
    .run(runAuth)
    .run(runAccessibility)
    .run(runHistory)
    .run(runPath)
    .run(runColorUtils)
    .run(runBlock);

  /** @ngInject */
  function runAuth($rootScope, $cookies, USER_ROLES, AUTH_EVENTS, AuthService, $log) {

    // Listner url/state changes, and check permission
    $rootScope.$on('$stateChangeStart', function(event, next) {

      if (!next.data || !next.data.authorizedRoles) {
        $log.debug('public url/state');
        return;
      }

      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        if (AuthService.isAuthenticated()) {
          // user is not allowed
          $log.debug('user is not allowed');
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        } else {
          // user is not logged in
          $log.debug('user is not logged in');
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      }
    });

    $log.debug('runAuth end.');
  }

  /** @ngInject */
  function runAccessibility($rootScope, $timeout, $cookies, $log) {

    var contrast = $cookies.get('dialoga_contraste') === 'true';
    adjustContrast(contrast);

    function adjustContrast(state) {
      var bodyEl = angular.element(document).find('body');
      angular.element(bodyEl).toggleClass('contraste', !!state);
    }

    $rootScope.toggleContrast = function() {
      contrast = !contrast;
      $cookies.put('dialoga_contraste', contrast);
      adjustContrast(contrast);
    };

    $rootScope.focusMainContent = function($event) {

      // prevent skip link from redirecting
      if ($event) { $event.preventDefault(); }

      var mainContentArea = document.querySelector('[role="main"]');

      if (mainContentArea) {
        $timeout(function() {
          var $el = angular.element(mainContentArea);

          angular.element('body').animate({scrollTop: $el.offset().top}, 'slow');
        }, 90);
      } else {
        $log.warn('role="main" not found.');
      }
    };

    $log.debug('runAccessibility end.');
  }

  /** @ngInject */
  function runHistory($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams, fromState, fromStateParams) {
      $rootScope.$previousState = { state: fromState, params: fromStateParams};
    });
  }

  /** @ngInject */
  function runPath($rootScope, api, $window, $log) {
    var isProduction = (/^http:\/\/dialoga\.gov\.br\//.test($window.location.href));
    $rootScope.basePath = isProduction ? api.hostProd :  api.hostHom;

    $log.debug('runPath end.');
  }

  /** @ngInject */
  function runColorUtils($window) {

    $window.ColorLuminance = function(hex, lum) {

      // validate hex string
      hex = String(hex).replace(/[^0-9a-f]/gi, '');
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      lum = lum || 0;

      // convert to decimal and change luminosity
      var rgb = '#';
      var c;
      var i;

      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ('00' + c).substr(c.length);
      }

      return rgb;
    };
  }

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end.');
  }

})();
