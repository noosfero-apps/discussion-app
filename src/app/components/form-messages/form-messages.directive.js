(function() {
  'use strict';

  angular
  .module('dialoga')
  .directive('formMessages', formMessages);

  /** @ngInject */
  function formMessages() {

    /** @ngInject */
    function FormMessagesController($log) {
      $log.debug('FormMessagesController');

      var vm = this;
      vm.$log = $log;

      vm.init();

    }

    FormMessagesController.prototype.init = function () {
      // async values
      var vm = this;

      if (!vm.required) {vm.required = "Ops, o campo é obrigatório."};
      if (!vm.minlength) {vm.minlength = "O campo deve ser maior."};
      if (!vm.maxlength) {vm.maxlength = "O campo deve ser menor"};
      if (!vm.email) {vm.email = "O endereço de e-mail deve ser válido"};

    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/form-messages/form-messages.html',
      scope: {
        field: '=',
        required: '=',
        minlength: '=',
        maxlength: '=',
        email: '='
      },
      controller: FormMessagesController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();

