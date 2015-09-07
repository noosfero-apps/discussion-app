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
      // vm.attachListeners();
    }

    EventListController.prototype.init = function () {
      var vm = this;

      if(!vm.events){
        throw { name: 'NotDefined', message: 'The attribute "events" is undefined.'};
      }

      if(!vm.isCollapsed){
        vm.isCollapsed = true;
      }
    };

    EventListController.prototype.toggleView = function () {
      var vm = this;
      vm.isCollapsed = !vm.isCollapsed;
    };

    EventListController.prototype.subscribe = function (data) {
      var vm = this;

      vm.$log.debug('data', data);
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/event-list/event-list.html',
      scope: {
        events: '=',
        isCollapsed: '='
      },
      controller: EventListController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

  }
})();
