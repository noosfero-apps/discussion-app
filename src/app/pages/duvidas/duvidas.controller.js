(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('DuvidasPageController', DuvidasPageController);

  /** @ngInject */
  function DuvidasPageController(DialogaService, $interval, $window, $log) {
    $log.debug('DuvidasPageController');

    var vm = this;

    vm.DialogaService = DialogaService;
    vm.$interval = $interval;
    vm.$window = $window;
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

    vm._attachCaptcha();
  };

  DuvidasPageController.prototype._attachCaptcha = function() {
    var vm = this;

    var stop = null;
    stop = vm.$interval(function(){
      var $el = angular.element('#serpro_captcha');

      if ($el && $el.length > 0 ){
        vm.$window.initCaptcha($el[0]);
        vm.$interval.cancel(stop);
        stop = undefined;
      }

    }, 200);
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
    
    var target = $event.target;
    var $target = angular.element(target);
    var $captcha = $target.find('[name="txtToken_captcha_serpro_gov_br"]');
    data.txtToken_captcha_serpro_gov_br = $captcha.val();

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
