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
      vm.isListVisible = !vm.isListVisible;
    };

    EventListController.prototype.subscribe = function (data) {
      var vm = this;

      vm.$log.debug('data', data);
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
