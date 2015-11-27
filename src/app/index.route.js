(function() {
  'use strict';

  angular
    .module('dialoga')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('inicio', {
        url: '/?tema&filtro&scroll',
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
            controllerAs: 'pageAuth'
          }
        }
      })
      .state('reenviar-email', {
        url: '/reenviar-email',
        ncyBreadcrumb: {label: 'Re-enviar e-mail de confirmação'},
        views: {
          'main': {
            templateUrl: 'app/pages/auth/resend-confirmation.html',
            controller: 'AuthPageController',
            controllerAs: 'pageAuth'
          }
        }
      })
      .state('ativar', {
        url: '/ativar/:activation_code',
        ncyBreadcrumb: {label: 'Ativar e-mail'},
        views: {
          'main': {
            templateUrl: 'app/pages/auth/active.html',
            controller: 'ActivePageController',
            controllerAs: 'pageActive'
          }
        }
      })
      .state('recuperar', {
        url: '/recuperar',
        ncyBreadcrumb: {label: 'Recuperar senha'},
        views: {
          'main': {
            templateUrl: 'app/pages/auth/recover.html',
            controller: 'AuthPageController',
            controllerAs: 'pageAuth'
          }
        }
      })
      .state('nova-senha', {
        url: '/nova-senha/:token',
        ncyBreadcrumb: {label: 'Nova senha'},
        views: {
          'main': {
            templateUrl: 'app/pages/auth/new-password.html',
            controller: 'NewPasswordPageController',
            controllerAs: 'pageNewPassword'
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
        ncyBreadcrumb: {label: 'Ranking'},
        views: {
          'main': {
            templateUrl: 'app/pages/ranking/ranking.html',
            controller: 'RankingPageController',
            controllerAs: 'pageRanking'
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
      .state('respostas', {
        url: '/respostas?tema&filtro',
        reloadOnSearch: false,
        ncyBreadcrumb: {label: 'Respostas'},
        views: {
          'main': {
            templateUrl: 'app/pages/respostas/respostas.html',
            controller: 'RespostasPageController',
            controllerAs: 'pageRespostas'
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
