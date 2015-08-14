(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('programaBox', programaBox);

  /** @ngInject */
  function programaBox(api) {

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
      return this.getCategory().name;
    };

    ProgramaController.prototype.getCategorySlug = function () {
      return this.getCategory().slug;
    };

    ProgramaController.prototype.getImageUrl = function () {
      var vm = this;

      return api.host + vm.program.image.url;
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
