(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('programaBox', programaBox);

  /** @ngInject */
  function programaBox() {

    /** @ngInject */
    function ProgramaController($log) {
      $log.debug('ProgramaController');

      var vm = this;
      vm.$log = $log;

      vm.init();
    }

    ProgramaController.prototype.init = function () {

    };

    ProgramaController.prototype.getCategory = function () {
      var vm = this;

      return vm.program.categories[0];
    };

    ProgramaController.prototype.getCategoryName = function () {
      var vm = this;

      return vm.getCategory().name;
    };

    ProgramaController.prototype.getImageUrl = function () {
      var vm = this;

      return 'http://login.dialoga.gov.br/' + vm.program.image.url;
    };

    ProgramaController.prototype.getImageAlt = function () {
      var vm = this;

      vm.$log.warn('image is not accessible.');
      return 'TODO: create image alt on server-side.';
    };

    ProgramaController.prototype.showContent = function () {
      var vm = this;

      vm.$log.debug('TODO: showContent()', vm.program);
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/programa/programa.html',
      scope: {
        program: '='
      },
      controller: ProgramaController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
