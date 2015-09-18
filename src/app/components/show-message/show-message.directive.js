(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('showMessage', showMessage);

  /** @ngInject */
  function showMessage() {

    /** @ngInject */
    function ShowMessageController($log) {
      // var vm = this;
      $log.debug('ShowMessageController');
    }

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/show-message/show-message.html',
      scope: {
        type: '=',
        message: '=',
        description: '='
      },
      controller: ShowMessageController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();
