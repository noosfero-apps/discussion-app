(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('programaBox', programaBox);

  /** @ngInject */
  function programaBox($log) {

    /** @ngInject */
    function ProgramaController() {
      $log.debug('ProgramaController');

      var vm = this;

      $log.debug('this.programa', vm.programa);
      vm.program = vm.programa;
    }

    ProgramaController.prototype.getCategory = function () {
      // return this.program.categories[0];
      return 'category-object';
    };
    ProgramaController.prototype.getCategoryName = function () {
      // return this.getCategory().name;
      return 'category-name';
    };

    ProgramaController.prototype.getImageUrl = function () {
      return 'http://login.dialoga.gov.br/image_uploads/dialoga/0000/0053/requalif_redim.jpg';
    };
    ProgramaController.prototype.getImageAlt = function () {
      return 'TODO: descrição da imagem.';
    };

    ProgramaController.prototype.showContent = function () {
      $log.debug('TODO: showContent()', this.program);
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/programa/programa.html',
      scope: {
        programa: '=programa'
      },
      controller: ProgramaController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
