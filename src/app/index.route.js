(function() {
  'use strict';

  angular
    .module('dialoga')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('inicio', {
        url: '/?limite&tema',
        reloadOnSearch: false,
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/inicio/inicio.html',
            controller: 'InicioPageController',
            controllerAs: 'pageInicio'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      .state('entrar', {
        url: '/entrar',
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/auth/signin.html',
            controller: 'AuthPageController',
            controllerAs: 'pageSignin'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      .state('cadastrar', {
        url: '/cadastrar',
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/auth/signup.html',
            controller: 'AuthPageController',
            controllerAs: 'pageSignup'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      .state('programa', {
        url: '/programa/:slug',
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/programas/programa.html',
            controller: 'ProgramaPageController',
            controllerAs: 'pagePrograma'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      .state('sobre', {
        url: '/sobre',
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/article/article.html',
            controller: 'ArticlePageController',
            controllerAs: 'pageArticle'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      .state('termos-de-uso', {
        url: '/termos-de-uso',
        controller: 'ArticlePageController',
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/article/article.html',
            controller: 'ArticlePageController',
            controllerAs: 'pageArticle'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
