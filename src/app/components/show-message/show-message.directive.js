(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('showMessage', showMessage);

  /** @ngInject */
  function showMessage() {

    /** @ngInject */
    function ShowMessageController($log) {
      $log.debug('ShowMessageController');

      var vm = this;

    }

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/show-message/show-message.html',
      scope: {
        type: '=',
        title: '=',
        message: '='
      },
      controller: ShowMessageController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();
