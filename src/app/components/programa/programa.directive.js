(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('programaBox', programaBox);

  /** @ngInject */
  function programaBox($rootScope) {

    /** @ngInject */
    function ProgramaController(ArticleService, $scope, $state, Slug, $log) {
      $log.debug('ProgramaController');

      var vm = this;
      vm.ArticleService = ArticleService;
      vm.$scope = $scope;
      vm.$state = $state;
      vm.Slug = Slug;
      vm.$log = $log;

      vm.init();
    }

    ProgramaController.prototype.init = function () {
      var vm = this;

      if(!vm.program.slug){
        vm.program.slug = vm.Slug.slugify(vm.program.title);
      }

      if(!vm.category){
        vm.category = vm.program.categories[0];
      }

      if(!vm.banner){
        vm.banner = {
          src: $rootScope.basePath + vm.program.image.url,
          alt: 'Imagem de destaque do programa'
        };
      }

      vm.displayType = vm.display;

      // if(vm.program.color && !vm.program.bgColor){
      //   // 15% more darker
      //   vm.program.colorDarker = window.ColorLuminance(vm.program.color, 0.15);
      // }
    };

    ProgramaController.prototype.isDisplay = function (display) {
      return this.display === display;
    };

    ProgramaController.prototype.isDisplayBox = function () {
      return this.isDisplay('box');
    };

    ProgramaController.prototype.isDisplayPreview = function () {
      return this.isDisplay('preview');
    };

    ProgramaController.prototype.showContent = function () {
      var vm = this;

      vm.$state.go('programa-conheca', {
        slug: vm.program.slug
      }, {
        location: true
      });
    };

    ProgramaController.prototype.showPreview = function () {
      var vm = this;

      vm.$state.go('programa', {
        slug: vm.program.slug
      }, {
        location: true
      });
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/programa/programa.html',
      scope: {
        program: '=',
        display: '='
      },
      controller: ProgramaController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
