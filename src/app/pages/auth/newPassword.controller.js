(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('NewPasswordPageController', NewPasswordPageController);

  /** @ngInject */
  function NewPasswordPageController(AuthService, $state, $log) {
    var vm = this;

    vm.AuthService = AuthService;
    vm.$state = $state;
    vm.$log = $log;

    vm.init();

    vm.$log.debug('NewPasswordPageController');
  }

  NewPasswordPageController.prototype.init = function() {
    var vm = this;

    // init variables
    vm.loading = false;
    vm.submitNewPasswordSuccess = false;
    vm.submitNewPasswordError = false;
    vm.token = vm.$state.params.token;
  };

  NewPasswordPageController.prototype.submitNewPassword = function($event, newPasswordForm) {
    var vm = this;

    if(!newPasswordForm.$valid){
      vm.$log.warn('Form validation: fail.');
      return;
    }

    // init vars
    vm.loading = true;
    vm.submitNewPasswordSuccess = false;
    vm.submitNewPasswordError = false;

    // get form data
    var data = {
      code: vm.token,
      newPassword: newPasswordForm.newPassword.$modelValue,
      newPasswordConfirmation: newPasswordForm.newPasswordConfirmation.$modelValue
    };

    // Create the promise request
    var promiseRequest = vm.AuthService.changePassword(data);
    
    promiseRequest
    .then(function(response) {
      vm.$log.debug('new password success:', response);

      vm.submitNewPasswordSuccess = true;
    })
    .catch(function(response){
      vm.$log.debug('new password error:', response);

      vm.submitNewPasswordError = true;
      vm.submitNewPasswordErrorMessage = response.data.message || 'Não foi possível configurar nova senha.';

      // Client Error
      // if (response.status >= 400 && response.status < 500){
      //   if(response.status === 404){
      //     vm.submitNewPasswordErrorMessage = 'Não foi possível configurar nova senha.';
      //   }
      // }
      
      // Server Error
      if (response.status >= 500 && response.status < 600){
        vm.internalError = true;
      }
    })
    .finally(function(){
      vm.loading = false;
    });
  };
})();
