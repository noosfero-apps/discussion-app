(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('ArticleService', ArticleService);

  /** @ngInject */
  function ArticleService($http, $q, api, UtilService, Slug, $log) {
    $log.debug('ArticleService');

    var idArticleHome = '103358';
    var _savedAbstract = null;

    var service = {
      apiArticles: api.host + '/api/v1/articles/',
      getHome: getHome,
      getArticleBySlug: getArticleBySlug,
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

    function getArticleBySlug (slug) {
      var deferred = $q.defer();

      this.getHome().then(function (data) {
        var mainArticle = data.article;
        var programList = mainArticle.children;
        var result = null;

        for (var i = programList.length - 1; i >= 0; i--) {
          var program = programList[i];

          if(!program.slug){
            program.slug = Slug.slugify(program.title);
          }

          if(program.slug === slug){
            result = program;
            break;
          }
        }

        if(result){
          deferred.resolve(result);
        }else{
          deferred.reject('None program with slug "' + slug + '"" was found.');
        }
      });

      return deferred.promise;
    }
  }
})();
