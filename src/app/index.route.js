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
      .state('programas', {
        url: '/programas',
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/programas/programas.html',
            controller: 'ProgramasPageController',
            controllerAs: 'pagePrograma'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      .state('programa-conteudo', {
        url: '/programa/:slug',
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/programas/programa.html',
            controller: 'ProgramaContentPageController',
            controllerAs: 'pageProgramaContent'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      .state('propostas', {
        url: '/propostas',
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/propostas/propostas.html',
            controller: 'PropostasPageController',
            controllerAs: 'pagePropostas'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      .state('propostas-details', {})
      .state('duvidas', {
        url: '/duvidas',
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/duvidas/duvidas.html',
            controller: 'DuvidasPageController',
            controllerAs: 'pageDuvidas'
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
      .state('mapa-do-site', {
        url: '/mapa-do-site',
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': { templateUrl: 'app/pages/sitemap/sitemap.html' },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
