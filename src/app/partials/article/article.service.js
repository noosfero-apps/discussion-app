(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('ArticleService', ArticleService);

  /** @ngInject */
  function ArticleService($http, $q, api, $log) {
    $log.debug('ArticleService');

    var idArticleHome = '103358';
    var _savedAbstract = null;

    var service = {
      apiArticles: api.host + 'articles/',
      getHome: getHome,
      setHomeAbstract: setHomeAbstract,
      getHomeAbstract: getHomeAbstract
    };

    return service;

    function getHome () {
      return getArticleById(idArticleHome);
    }

    function getArticleById (articleId) {
      return $http.get(service.apiArticles + articleId, {
        private_token: api.token,
        fields: 'id,children,categories,abstract,title,image,url,setting,position'
      });
    }

    function setHomeAbstract (newAbstract) {
      _savedAbstract = newAbstract;
    }

    function getHomeAbstract () {
      return _savedAbstract;
    }
  }
})();
