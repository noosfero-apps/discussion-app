(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('ArticleService', ArticleService);

  /** @ngInject */
  function ArticleService($http, $q, api, UtilService, $log) {
    $log.debug('ArticleService');

    var idArticleHome = '103358';
    var _savedAbstract = null;

    var service = {
      apiArticles: api.host + '/api/v1/articles/',
      getHome: getHome,
      setHomeAbstract: setHomeAbstract,
      getHomeAbstract: getHomeAbstract
    };

    return service;

    function getHome () {
      return getArticleById(idArticleHome);
    }

    function getArticleById (articleId) {
      var url = service.apiArticles + articleId;
      var params = {
        fields: 'id,children,categories,abstract,title,image,url,setting,position',
        private_token: 'null'
      };

      return UtilService.get(url, {params: params});
    }

    function setHomeAbstract (newAbstract) {
      _savedAbstract = newAbstract;
    }

    function getHomeAbstract () {
      return _savedAbstract;
    }
  }
})();
