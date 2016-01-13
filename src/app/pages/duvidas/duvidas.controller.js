(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('DuvidasPageController', DuvidasPageController);

  /** @ngInject */
  function DuvidasPageController(DialogaService, APP, $interval, $window, vcRecaptchaService, $log) {
    $log.debug('DuvidasPageController');

    var vm = this;

    vm.DialogaService = DialogaService;
    vm.APP = APP;
    vm.$interval = $interval;
    vm.$window = $window;
    vm.vcRecaptchaService = vcRecaptchaService;
    vm.$log = $log;

    vm.init();
    vm.loadData();
    vm.attachListeners();
  }

  DuvidasPageController.prototype.init = function () {
    var vm = this;

    vm.loadingQuestions = false;
    vm.error = false;
    vm.sendingContactForm = false;
    vm.questions = [];
    vm.recaptchaResponse = null;
    vm.recaptchaWidgetId = null;

  };

  DuvidasPageController.prototype.loadData = function () {
    var vm = this;

    vm.loadingQuestions = true;
    vm.DialogaService.getQuestions()
    .then(function(data) {
      // vm.$log.debug('data', data);
      vm.questions = data.articles;
    })
    .catch(function(error){
      vm.$log.error('error', error);
    })
    .finally(function(){
      vm.loadingQuestions = false;
    });
  };

  DuvidasPageController.prototype.attachListeners = function () {
    var vm = this;

    // reCaptcha Listeners
    vm.setWidgetId = function(widgetId) {
      // store the `widgetId` for future usage.
      // For example for getting the response with
      // `recaptcha.getResponse(widgetId)`.
      vm.$log.info('Created widget ID:', widgetId);
      vm.recaptchaWidgetId = widgetId;
      
    };

    vm.setResponse = function(response) {
      
      // Update local captcha response
      vm.$log.debug('Response available', response);
      vm.recaptchaResponse = response;
    };

    vm.cbExpiration = function() {
      // reset the 'response' object that is on scope 
      vm.$log.debug('cbExpiration');
    };
  };

  DuvidasPageController.prototype.submitContactForm = function ($event, contactForm) {
    var vm = this;

    vm.$log.debug('submitContactForm contactForm', contactForm);
    vm.sendingContactForm = true;

    var data = {
      name: contactForm.inputName.$modelValue,
      email: contactForm.inputEmail.$modelValue,
      subject: contactForm.inputSubject.$modelValue,
      message: contactForm.inputMessage.$modelValue
    };

    data.recaptcha_response = vm.recaptchaResponse;

    vm.DialogaService.sendContactForm(data)
    .then(function(response){
      vm.$log.debug('sendContactForm success', response);
      vm.successMessage = 'Mensagem enviada com sucesso!';
    }, function(response){
      vm.$log.warn('sendContactForm error', response);
      vm.errorMessage = 'Erro ao enviar mensagem. Tente novamente mais tarde.';
    })
    .finally(function(response){
      vm.$log.debug('sendContactForm finally', response);
      vm.sendingContactForm = false;
    });
  };
})();
