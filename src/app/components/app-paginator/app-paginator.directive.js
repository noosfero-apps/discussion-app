(function() {
  'use strict';

  angular
  .module('dialoga')
  .directive('appPaginator', appPaginator);

  /** @ngInject */
  function appPaginator() {

    /** @ngInject */
    function AppPaginatorController($log) {
      var vm = this;

      vm.$log = $log;

      vm.init();

      $log.debug('AppPaginatorController');
    }

    AppPaginatorController.prototype.init = function() {
      var vm = this;

      vm.page = vm.page || 1;
      vm.perPage = vm.perPage || 20;
      vm.total = vm.total || 0;

      if ((vm.total % vm.perPage) === 0) {
        vm.pages =  vm.total / vm.perPage;
      } else {
        vm.pages =  (vm.total / vm.perPage) + 1;
      }

      vm.arraypages = new Array(Math.floor(vm.pages));
    };

    AppPaginatorController.prototype.showPage = function(pageIndex) {
      var vm = this;

      if (pageIndex < 1) {
        pageIndex = 1;
      }

      if (pageIndex > vm.pages) {
        pageIndex = vm.pages;
      }

      if (vm.changePage) {
        vm.changePage({pageIndex: pageIndex});
      }
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/app-paginator/app-paginator.html',
      scope: {
        page: '=',
        perPage: '=',
        total: '=',
        changePage: '&'
      },
      controller: AppPaginatorController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();
