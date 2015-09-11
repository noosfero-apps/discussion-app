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
        url: '/entrar?redirect_uri&message',
        ncyBreadcrumb: {label: 'Entrar'},
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
      .state('recuperar', {
        url: '/recuperar',
        ncyBreadcrumb: {label: 'Recuperar'},
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/auth/recover.html',
            controller: 'AuthPageController',
            controllerAs: 'pageSignin'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      .state('alterar', {
        url: '/alterar',
        ncyBreadcrumb: {label: 'Alterar'},
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/auth/change.html',
            controller: 'AuthPageController',
            controllerAs: 'pageSignin'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      .state('cadastrar', {
        url: '/cadastrar',
        ncyBreadcrumb: {label: 'Cadastrar'},
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
        url: '/programas?tema&filtro&task',
        reloadOnSearch: false,
        ncyBreadcrumb: {label: 'Programas'},
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/programas/programas.html',
            controller: 'ProgramasPageController',
            controllerAs: 'pageProgramas'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
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
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/programas/programa.html',
            controller: 'ProgramaPageController',
            controllerAs: 'pagePrograma'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      .state('propostas', {
        url: '/propostas?tema&filtro',
        reloadOnSearch: false,
        ncyBreadcrumb: {label: 'Propostas'},
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
      .state('ranking', {
        url: '/ranking?tema&programa&filtro',
        reloadOnSearch: false,
        ncyBreadcrumb: {label: 'Propostas'},
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/propostas/ranking.html',
            controller: 'PropostasPageController',
            controllerAs: 'pagePropostas'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      .state('propostas-conteudo', {
        url: '/propostas/:id',
        ncyBreadcrumb: {
          label: '{{$parent.$root.contentTitle}}',
          parent: 'propostas'
        },
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/propostas/proposta.html',
            controller: 'PropostasPageController',
            controllerAs: 'pagePropostas'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      .state('duvidas', {
        url: '/duvidas',
        ncyBreadcrumb: {label: 'Dúvidas'},
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
        ncyBreadcrumb: {label: 'Sobre'},
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
        ncyBreadcrumb: {label: 'Termos de Uso'},
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
        ncyBreadcrumb: {label: 'Mapa do Site'},
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': {
            templateUrl: 'app/pages/mapa-do-site/mapa-do-site.html',
            controller: 'SitemapPageController',
            controllerAs: 'sitemap'
          },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      .state('erro', {
        url: '/erro',
        ncyBreadcrumb: {label: 'Erro'},
        views: {
          'header': { templateUrl: 'app/pages/header/header.html' },
          'main': { templateUrl: 'app/pages/erro/erro.html' },
          'footer': { templateUrl: 'app/pages/footer/footer.html' }
        }
      })
      ;

    $urlRouterProvider.otherwise('/erro');
  }

})();
