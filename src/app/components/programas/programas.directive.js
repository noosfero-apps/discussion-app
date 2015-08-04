(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('programaList', programaList);

  /** @ngInject */
  function programaList($log) {

    /** @ngInject */
    function ProgramaListController() {
      $log.debug('ProgramaListController');

      var vm = this;
      vm.filter = false;
      vm.categories = [
        {
          name: 'Saúde',
          slug: 'saude'
        },
        {
          name: 'Educação',
          slug: 'educacao'
        }
      ];

      for (var i = vm.categories.length - 1; i >= 0; i--) {
        var category = vm.categories[i];
        category.iconClass = vm.getIconClasses(category);
      };
    }

    ProgramaListController.prototype.getIconClasses = function (tema) {
      return 'glyphicon glyphicon-exclamation-sign';
    };

    ProgramaListController.prototype.filterByTema = function (tema) {
      this.filter = tema.slug;
      $log.debug('[TODO] Filterting by tema:', this.filter);
    };
    ProgramaListController.prototype.showAll = function () {
      this.filter = null;
      $log.debug('[TODO] Filterting by tema:', this.filter);
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/programas/programas.html',
      scope: {
        programas: '=programas',
        temas: '=temas'
      },
      controller: ProgramaListController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
