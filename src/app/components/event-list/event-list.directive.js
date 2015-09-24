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

    EventListController.prototype.subscribe = function (event) {
      var vm = this;

      if(event.isOld){
        vm.$log.debug('Event already happened. Abort.');
        return;
      }

      var event_id = event.id;
      vm.$log.debug('event_id', event_id);

      if(!vm.$rootScope.currentUser){
        vm.$log.info('User is not logged in. Redirect to Auth page.');
        vm.$state.go('entrar',{
          redirect_uri: 'state=inicio&task=subscribe&event_id=' + event_id
        },{
          location: true
        });
      }else{
        vm.ArticleService.subscribeToEvent(event_id, {}, function(response){
          vm.$log.debug('response', response);
        }, function(error){
          vm.$log.debug('error', error);
        });
      }
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
