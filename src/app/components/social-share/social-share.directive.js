(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('socialShare', socialShare);

  /** @ngInject */
  function socialShare() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/social-share/social-share.html',
      scope: {
        socialVia: '=',
        socialUrl: '=',
        socialImage: '=',
        socialText: '=',
        arrowClass: '@'
      },
      controller: SocialShareController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SocialShareController($log) {
      $log.debug('SocialShareController');

      var vm = this;

      vm.socialVia = vm.socialVia || "687948707977695"; // 476168325877872
      vm.socialUrl = vm.socialUrl || "http://dialoga.gov.br/";
      vm.socialImage = vm.socialImage || "http://dialoga.gov.br/images/logo.png";
      vm.socialText = vm.socialText || "Conheça o Dialoga Brasil. Dialoga Brasil | O País fica melhor quando VOCÊ PARTICIPA.";

    }
  }

})();
