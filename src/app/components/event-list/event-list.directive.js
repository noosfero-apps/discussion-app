(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('eventList', eventList);

  /** @ngInject */
  function eventList() {
    /** @ngInject */
    function EventListController(ArticleService, $scope, $rootScope, $state, $log) {
      $log.debug('EventListController');

      var vm = this;

      vm.ArticleService = ArticleService;
      vm.$scope = $scope;
      vm.$rootScope = $rootScope;
      vm.$state = $state;
      vm.$log = $log;

      vm.init();
      // vm.attachListeners();
    }

    EventListController.prototype.init = function() {
      var vm = this;

      if (!vm.events) {
        throw { name: 'NotDefined', message: 'The attribute "events" is undefined.'};
      }

      if (!vm.isCollapsed) {
        vm.isCollapsed = true;
      }
    };

    EventListController.prototype.toggleView = function() {
      var vm = this;
      vm.isCollapsed = !vm.isCollapsed;
    };

    EventListController.prototype.subscribe = function(event) {
      var vm = this;

      var event_id = event.id;

      // must be authenticated
      if (!vm.$rootScope.currentUser) {
        vm.$log.info('User is not logged in. Redirect to Auth page.');
        vm.$state.go('entrar', {
          redirect_uri: 'state=inicio&task=subscribe&event_id=' + event_id
        }, {
          location: true
        });

        return;
      }

      // do the subscription
      event._loading = true;
      vm.ArticleService.subscribeToEvent(event_id).then(function (data) {
        vm.$log.debug('success', data);

        if(data.success === true){
          // subscribed with success
          event.already_follow = true;
        }

        if(data.success === false && data.already_follow === true){
          // already subscribed
          event.already_follow = true;
        }
      }, function (data) {
        vm.$log.debug('error', data);
      }, function (data){
        vm.$log.debug('update', data);
      }).finally(function(data){
        vm.$log.debug('finally', data);
        event._loading = false;
      });
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
