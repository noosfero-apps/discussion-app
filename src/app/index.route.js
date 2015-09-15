(function() {
  'use strict';

  angular
    .module('dialoga')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('inicio', {
        url: '/?tema&filtro',
        ncyBreadcrumb: {label: 'Home'},
        reloadOnSearch: false,
        views: {
          'main': {
            templateUrl: 'app/pages/inicio/inicio.html',
            controller: 'InicioPageController',
            controllerAs: 'pageInicio'
          }
        }
      })
      .state('entrar', {
        url: '/entrar?redirect_uri&message',
        ncyBreadcrumb: {label: 'Entrar'},
        views: {
          'main': {
            templateUrl: 'app/pages/auth/signin.html',
            controller: 'AuthPageController',
            controllerAs: 'pageSignin'
          }
        }
      })
      .state('recuperar', {
        url: '/recuperar',
        ncyBreadcrumb: {label: 'Recuperar'},
        views: {
          'main': {
            templateUrl: 'app/pages/auth/recover.html',
            controller: 'AuthPageController',
            controllerAs: 'pageSignin'
          }
        }
      })
      .state('alterar', {
        url: '/alterar',
        ncyBreadcrumb: {label: 'Alterar'},
        views: {
          'main': {
            templateUrl: 'app/pages/auth/change.html',
            controller: 'AuthPageController',
            controllerAs: 'pageSignin'
          }
        }
      })
      .state('cadastrar', {
        url: '/cadastrar',
        ncyBreadcrumb: {label: 'Cadastrar'},
        views: {
          'main': {
            templateUrl: 'app/pages/auth/signup.html',
            controller: 'AuthPageController',
            controllerAs: 'pageSignup'
          }
        }
      })
      .state('programas', {
        url: '/programas?tema&filtro&task',
        reloadOnSearch: false,
        ncyBreadcrumb: {label: 'Programas'},
        views: {
          'main': {
            templateUrl: 'app/pages/programas/programas.html',
            controller: 'ProgramasPageController',
            controllerAs: 'pageProgramas'
          }
        }
      })
      .state('programa', {
        url: '/programa/:slug?proposal_id&task',
        reloadOnSearch: false,
        ncyBreadcrumb: {
          label: '{{$parent.$root.contentTitle}}',
          parent: 'programas'
        },
        views: {
          'main': {
            templateUrl: 'app/pages/programas/programa.html',
            controller: 'ProgramaPageController',
            controllerAs: 'pagePrograma'
          }
        }
      })
      .state('propostas', {
        url: '/propostas?tema&filtro',
        reloadOnSearch: false,
        ncyBreadcrumb: {label: 'Propostas'},
        views: {
          'main': {
            templateUrl: 'app/pages/propostas/propostas.html',
            controller: 'PropostasPageController',
            controllerAs: 'pagePropostas'
          }
        }
      })
      .state('ranking', {
        url: '/ranking?tema&programa&filtro',
        reloadOnSearch: false,
        ncyBreadcrumb: {label: 'Propostas'},
        views: {
          'main': {
            templateUrl: 'app/pages/propostas/ranking.html',
            controller: 'PropostasPageController',
            controllerAs: 'pagePropostas'
          }
        }
      })
      .state('duvidas', {
        url: '/duvidas',
        ncyBreadcrumb: {label: 'Dúvidas'},
        views: {
          'main': {
            templateUrl: 'app/pages/duvidas/duvidas.html',
            controller: 'DuvidasPageController',
            controllerAs: 'pageDuvidas'
          }
        }
      })
      .state('sobre', {
        url: '/sobre',
        ncyBreadcrumb: {label: 'Sobre'},
        views: {
          'main': {
            templateUrl: 'app/pages/article/article.html',
            controller: 'ArticlePageController',
            controllerAs: 'pageArticle'
          }
        }
      })
      .state('termos-de-uso', {
        url: '/termos-de-uso',
        ncyBreadcrumb: {label: 'Termos de Uso'},
        controller: 'ArticlePageController',
        views: {
          'main': {
            templateUrl: 'app/pages/article/article.html',
            controller: 'ArticlePageController',
            controllerAs: 'pageArticle'
          }
        }
      })
     .state('mapa-do-site', {
        url: '/mapa-do-site',
        ncyBreadcrumb: {label: 'Mapa do Site'},
        views: {
          'main': {
            templateUrl: 'app/pages/mapa-do-site/mapa-do-site.html',
            controller: 'SitemapPageController',
            controllerAs: 'sitemap'
          }
        }
      })
      .state('erro', {
        url: '/erro',
        ncyBreadcrumb: {label: 'Erro'},
        views: {
          'main': { templateUrl: 'app/pages/erro/erro.html' }
        }
      })
      ;

    $urlRouterProvider.otherwise('/erro');
  }

})();
