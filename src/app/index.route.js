(function() {
  'use strict';

  angular
    .module('dialoga')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('inicio', {
        url: '/',
        views: {
          'header': { templateUrl: 'app/partials/header/header.html' },
          'main': {
            templateUrl: 'app/partials/inicio/inicio.html',
            controller: 'InicioController',
            controllerAs: 'inicio'
          },
          'footer': { templateUrl: 'app/partials/footer/footer.html' }
        }
      })
      .state('programas', {
        url: '/programas',
        views: {
          'header': { templateUrl: 'app/partials/header/header.html' },
          'main': {
            templateUrl: 'app/partials/programas/programas.html',
            controller: 'ProgramasController',
            controllerAs: 'programas'
          },
          'footer': { templateUrl: 'app/partials/footer/footer.html' }
        }
      })
      .state('sobre', {
        url: '/sobre',
        views: {
          'header': { templateUrl: 'app/partials/header/header.html' },
          'main': {
            templateUrl: 'app/partials/article/article.html',
            controller: 'ArticleController',
            controllerAs: 'article'
          },
          'footer': { templateUrl: 'app/partials/footer/footer.html' }
        }
      })
      .state('termos-de-uso', {
        url: '/termos-de-uso',
        controller: 'ArticleController',
        views: {
          'header': { templateUrl: 'app/partials/header/header.html' },
          'main': {
            templateUrl: 'app/partials/article/article.html',
            controller: 'ArticleController',
            controllerAs: 'article'
          },
          'footer': { templateUrl: 'app/partials/footer/footer.html' }
        }
      })
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
