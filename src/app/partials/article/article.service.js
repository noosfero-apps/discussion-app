(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('ArticleService', ArticleService);

  /** @ngInject */
  function ArticleService(Restangular, api, $log) {
    $log.debug('ArticleService');

    var articlesRest = Restangular.all('articles');

    var _savedAbstract = null;

    var service = {
      getList: articlesRest.getList,
      getHome: getHome,
      setHomeAbstract: setHomeAbstract,
      getHomeAbstract: getHomeAbstract
    };

    return service;

    function getHome () {
      return articlesRest.get(api.articleId.home, {
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
