(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('ArticleService', ArticleService);

  /** @ngInject */
  function ArticleService(Restangular, api, $log) {
    $log.debug('ArticleService');

    var articlesRest = Restangular.all('articles');

    var service = {
      getList: articlesRest.getList,
      getHome: getHome
    };

    return service;

    function getHome () {
      return articlesRest.get(api.articleId.home, {
        private_token: api.token,
        fields: 'id,children,categories,abstract,title,image,url,setting,position'
      });
    }
  }
})();
