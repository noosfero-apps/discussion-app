(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('topicsSelect', topicsSelect);

  /** @ngInject */
  function topicsSelect() {

    /** @ngInject */
    function TopicsSelectController($rootScope, $log) {
      $log.debug('TopicsSelectController');

      // alias
      var vm = this;

      // dependencies
      vm.$rootScope = $rootScope;
      vm.$log = $log;

      // initialization
      vm.init();
    }

    TopicsSelectController.prototype.init = function() {
      // var vm = this;
    };

    TopicsSelectController.prototype.selectTopic = function() {
      var vm = this;

      if (vm.selectedTopic === null) {
        vm.$log.debug('Default topic selected.');
        return;
      }

      // send event to all controllers
      vm.$rootScope.$broadcast('change-selectedTopic', vm.selectedTopic);
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/topics-select/topics-select.html',
      scope: {
        topics: '=',
        selectedTopic: '='
      },
      controller: TopicsSelectController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();
