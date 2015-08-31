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
    .run(runUtils)
    .run(runBlock);

  /** @ngInject */
  function runAuth($rootScope, $localStorage, USER_ROLES, AUTH_EVENTS, AuthService, $log) {

    // Listner url/state changes, and check permission
    $rootScope.$on('$stateChangeStart', function(event, next) {

      if (!next.data || !next.data.authorizedRoles) {
        $log.debug('[RUN] Auth: public url/state');
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

    $rootScope.currentUser = $localStorage.currentUser;

    $log.debug('[RUN] Auth end.');
  }

  /** @ngInject */
  function runAccessibility($rootScope, $timeout, $cookies, $log) {

    var contrast = $cookies.get('dialoga_contraste') === 'true';
    adjustContrast(contrast);

    function adjustContrast(state) {
      var bodyEl = angular.element(document).find('body');
      angular.element(bodyEl).toggleClass('contraste', !!state);
    }

    $rootScope.actionContrast = function() {
      // toggle contrast
      contrast = !contrast;
      $cookies.put('dialoga_contraste', contrast);
      adjustContrast(contrast);
    };

    $rootScope.focusOn = function(elId, $event) {
      var el = angular.element(elId);
      $rootScope.scrollTo(el, $event);
      el.attr('tabIndex', -1).focus();
    };

    $rootScope.focusMainContent = function($event) {

      var mainContentArea = document.querySelector('[role="main"]');

      if (mainContentArea) {
        $timeout(function() {
          $rootScope.scrollTo(mainContentArea, $event);
        }, 90); // force queue
      } else {
        $log.warn('role="main" not found.');
      }
    };

    $rootScope.scrollTo = function(target, $event) {

      // prevent skip link from redirecting
      if ($event) { $event.preventDefault(); }

      if(angular.isString(target)){
        target = angular.element(target);
      }

      angular.element('body').animate({scrollTop: target.offset().top}, 'fast');
    };

    $log.debug('[RUN] Accessibility end.');
  }

  /** @ngInject */
  function runHistory($rootScope) {
    var MAX_HISTORY = 20;
    $rootScope.$previousState = $rootScope.$previousState || [];
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams, fromState, fromStateParams) {
      $rootScope.$previousState.push({ state: fromState, params: fromStateParams});
      $rootScope.$previousState.splice(-MAX_HISTORY, MAX_HISTORY);
    });

    $rootScope.goBack = $rootScope.goBack || function () {
      return $rootScope.$previousState.pop();
    };
  }

  /** @ngInject */
  function runPath($rootScope, API, $window, $log) {
    var isProd = (/^http:\/\/dialoga\.gov\.br\//.test($window.location.href));
    var isHom = (/^http:\/\/hom.dialoga\.gov\.br\//.test($window.location.href));
    $rootScope.basePath = isProd ? API.hostProd : (isHom ? API.hostHom : API.hostDev);

    $log.debug('[RUN] Path end.');
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
  function runUtils($rootScope) {
    $rootScope.stripHtml = function (text) {
      return String(text).replace(/<[^>]+>/gm, '');
    };
  }

  /** @ngInject */
  function runBlock($log) {
    $log.debug('[RUN] Block end.');
  }

})();
