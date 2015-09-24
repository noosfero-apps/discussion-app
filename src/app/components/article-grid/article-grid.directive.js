(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('articleGrid', articleGrid);

  /** @ngInject */
  function articleGrid() {

    /** @ngInject */
    function ArticleGridController($scope, $rootScope, $element, $location, $filter, $log) {
      $log.debug('ArticleGridController');

      // alias
      var vm = this;

      // dependencies
      vm.$scope = $scope;
      vm.$rootScope = $rootScope;
      vm.$element = $element;
      vm.$location = $location;
      vm.$filter = $filter;
      vm.$log = $log;
      vm.defaultLimit = 6;

      // initialization
      vm.init();
      vm.attachListeners();
    }

    ArticleGridController.prototype.init = function() {
      // var vm = this;
      // vm.programs = null; // scope var
    };

    ArticleGridController.prototype.attachListeners = function() {
      // var vm = this;
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/article-grid/article-grid.html',
      scope: {
        articles: '='
      },
      controller: ArticleGridController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }
})();
