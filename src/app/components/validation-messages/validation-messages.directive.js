(function() {
  'use strict';

  angular
  .module('dialoga')
  .directive('validationMessages', validationMessages);

  /** @ngInject */
  function validationMessages() {

    /** @ngInject */
    function validationMessagesController($log) {
      $log.debug('validationMessagesController');

      var vm = this;
      vm.$log = $log;

      vm.init();

    }

    validationMessagesController.prototype.init = function () {
      // async values
      var vm = this;

      if (!vm.required) {vm.required = 'Ops, o campo é obrigatório.';}
      if (!vm.minlength) {vm.minlength = 'O campo deve ser maior.';}
      if (!vm.maxlength) {vm.maxlength = 'O campo deve ser menor';}
      if (!vm.email) {vm.email = 'O endereço de e-mail deve ser válido';}

    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/validation-messages/validation-messages.html',
      scope: {
        field: '=',
        required: '=',
        minlength: '=',
        maxlength: '=',
        email: '='
      },
      controller: validationMessagesController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();

