(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ActivePageController', ActivePageController);

  /** @ngInject */
  function ActivePageController(AuthService, $state, $log) {
    var vm = this;

    vm.AuthService = AuthService;
    vm.$state = $state;
    vm.$log = $log;

    vm.init();
    vm.doActivation();

    vm.$log.debug('ActivePageController');
  }

  ActivePageController.prototype.init = function() {
    var vm = this;

    // init variables
    vm.loading = true;
    vm.activation_code = vm.$state.params.activation_code;
  };

  ActivePageController.prototype.doActivation = function() {
    var vm = this;

    vm.AuthService.activate(vm.activation_code).
    then(function(response){
      // SUCCESS
      vm.$log.info('response', response);

      vm.successMessageTitle = 'Pronto!';
      vm.successMessageContent = 'Conta ativada com sucesso!';
    }, function(response){
      // ERROR
      vm.$log.error('response', response);

      vm.errorMessageTitle = 'Erro!';
      
      // Server Error
      if(response.status >= 500 || response.status < 600){
        vm.errorMessageContent = 'Código de ativação incorreto.';
      }
    })
    .finally(function(data){
      vm.$log.debug('finally', data);
      vm.loading = false;
    });
  };
})();
