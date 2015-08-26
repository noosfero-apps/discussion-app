(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('articleBar', articleBar);

  /** @ngInject */
  function articleBar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/article-bar/article-bar.html',
      scope: {
        category: '=',
        categories: '='
      },
      controller: ArticleBarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ArticleBarController($scope, $rootScope, $state, $log) {
      $log.debug('ArticleBarController');

      var vm = this;

      vm.$scope = $scope;
      vm.$rootScope = $rootScope;
      vm.$state = $state;
      vm.theme = 'blue';

      // if(!vm.category) {
      //   throw 'article bar without category';
      // }

      // if(!vm.categories) {
      //   throw 'article bar without categories list';
      // }

      vm.currentCategory = vm.category;

      vm.$scope.$watch('vm.currentCategory', function(newValue, oldValue){
        if(newValue !== oldValue){
          vm.$state.go('inicio', {
            tema: newValue.slug
          }, {
            location: true
          });
        }
      });

      vm.goBack = function (){
        var vm = this;
        var prevState = vm.$rootScope.$previousState;
        if(prevState && prevState.state.name){
          vm.$state.go(prevState.state.name, prevState.params);
        } else {
          vm.$state.go('inicio');
        }
      };
    }

  }

})();
