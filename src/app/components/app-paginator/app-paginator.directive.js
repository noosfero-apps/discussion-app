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

    AppPaginatorController.prototype.init = function () {
      var vm = this;

      vm.page = vm.page || 1;
      vm.perPage = vm.perPage || 20;
      vm.total = vm.total || 0;
    };

    AppPaginatorController.prototype.showPage = function (pageIndex) {
      var vm = this;

      if (pageIndex < 0) {
        pageIndex = 0;
      }

      if (pageIndex > (vm.arraypages.length-1)) {
        pageIndex = vm.arraypages.length-1;
      }

      if(vm.changePage){
        vm.changePage({pageIndex: (pageIndex + 1 )});
      }else{
        vm.proposalsPerPage = vm.getProposalsPerPage(pageIndex);
      }
      vm.currentPageIndex = pageIndex;
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
