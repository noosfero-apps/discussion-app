(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('DuvidasPageController', DuvidasPageController);

  /** @ngInject */
  function DuvidasPageController(DialogaService, $log) {
    $log.debug('DuvidasPageController');

    var vm = this;

    vm.DialogaService = DialogaService;
    vm.$log = $log;

    vm.init();
    vm.loadData();
  }

  DuvidasPageController.prototype.init = function () {
    var vm = this;

    vm.questions = [{
        question: 'O que é o Dialoga Brasil?',
        answer: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven`t heard of them accusamus labore sustainable VHS.'
      },{
        question: 'O que ... ?',
        answer: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven`t heard of them accusamus labore sustainable VHS.'
      }
    ];
    vm.loading = true;
    vm.error = false;
  };

  DuvidasPageController.prototype.loadData = function () {
    var vm = this;

    // vm.DialogaService.getQuestions(function(questions){
    //   vm.questions = questions;
    // }, function (error) {
    //   vm.error = error;
    //   vm.$log.error(error);
    // });
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

    vm.DialogaService.sendContactForm(data)
    .then(function(response){
      // vm.$log.debug('sendContactForm success', response);
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
