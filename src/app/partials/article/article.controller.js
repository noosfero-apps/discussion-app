(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ArticleController', ArticleController);

  /** @ngInject */
  function ArticleController($state, $log) {
    $log.debug('ArticleController');

    var vm = this;

    vm.page = $state.current.name;

    switch ( $state.current.name ) {
      case 'sobre':
        break;
      case 'termos-de-uso':
        break;
      default:
        $log.debug('$state.current.name', $state.current.name);
        break;
    }

    // page = $state.is('sobre');
  }
})();
