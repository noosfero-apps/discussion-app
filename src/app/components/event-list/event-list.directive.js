(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('eventList', eventList);

  /** @ngInject */
  function eventList() {
    /** @ngInject */
    function EventListController($scope, $rootScope, $state, $log) {
      $log.debug('EventListController');

      var vm = this;

      vm.$scope = $scope;
      vm.$rootScope = $rootScope;
      vm.$state = $state;
      vm.$log = $log;

      vm.init();
    }

    EventListController.prototype.init = function () {
      var vm = this;

      vm.eventList = [];
      vm.isListVisible = false;
    };

    EventListController.prototype.toggleView = function () {
      var vm = this;

      if(vm.isListVisible) {
        // animate hide
      } else {
        // animate show
      }

      vm.isListVisible = !vm.isListVisible;
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/event-list/event-list.html',
      controller: EventListController,
      controllerAs: 'eventListCtrl',
      bindToController: true
    };

    return directive;

  }
})();
