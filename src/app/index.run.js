/* globals document:true*/
(function() {
  'use strict';

  angular
    .module('dialoga')
    .run(runAuth)
    .run(runAccessibility)
    .run(runPath)
    .run(runBlock);

  /** @ngInject */
  function runAuth($rootScope, $cookies, USER_ROLES, AUTH_EVENTS, AuthService, $log){

    // Listner url/state changes, and check permission
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if(!next.data || !next.data.authorizedRoles){
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

    var contrast = $cookies.get('dialoga_contraste') === "true";
    adjustContrast(contrast);

    function adjustContrast(state){
      var bodyEl = angular.element(document).find('body');
      angular.element(bodyEl).toggleClass('contraste', !!state);
    }

    $rootScope.toggleContrast = function () {
      contrast = !contrast;
      $cookies.put('dialoga_contraste', contrast);
      adjustContrast(contrast);
    };

    $rootScope.focusMainContent = function ($event) {

      // prevent skip link from redirecting
      if ($event) { $event.preventDefault(); }

      var mainContentArea = document.querySelector('[role="main"]');

      if ( mainContentArea ) {
        $timeout(function(){
          mainContentArea.focus();
        },90);
      }else{
        $log.warn('role="main" not found.');
      }
    };

    $log.debug('runAccessibility end.');
  }

  /** @ngInject */
  function runPath($rootScope, api, $log) {
    var isProduction = (/^http:\/\/dialoga\.gov\.br\//.test(window.location.href));
    $rootScope.basePath = isProduction ? api.hostProd :  api.hostHom;

    $log.debug('runPath end.');
  }

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end.');
  }

})();
