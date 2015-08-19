(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('ArticleService', ArticleService);

  /** @ngInject */
  function ArticleService($http, $q, $rootScope, UtilService, Slug, $log) {
    $log.debug('ArticleService');

    var idArticleHome = '103358';
    var _savedAbstract = null;

    var service = {
      apiArticles: $rootScope.basePath + '/api/v1/articles/',
      getHome: getHome,
      getArticleById: getArticleById,
      getArticleBySlug: getArticleBySlug,
      setHomeAbstract: setHomeAbstract,
      getHomeAbstract: getHomeAbstract
    };

    var CACHE = {}; // cache by article id

    return service;

    function loadArticleById (articleId, cbSuccess, cbError) {

      var url = service.apiArticles + articleId;
      var params = {
        fields: 'id,children,categories,abstract,title,image,url,setting,position',
        private_token: 'null'
      };

      UtilService.get(url, {params: params}).then(function(data){
        CACHE[articleId] = data;
        cbSuccess(data);
      }, function(error){
        cbError(error);
      });
    }

    function getArticleById (articleId, cbSuccess, cbError) {
      var cachedArticle = CACHE[articleId];

      if(cachedArticle){
        cbSuccess(cachedArticle);
      }else{
        loadArticleById(articleId, cbSuccess, cbError);
      }
    }

    function getArticleBySlug (slug, cbSuccess, cbError) {
      var vm = this;

      vm.getHome(function (data) {
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
          cbSuccess(result);
        }else{
          cbError('None program with slug "' + slug + '"" was found.');
        }
      }, cbError);
    }

    function getHome (cbSuccess, cbError) {
      return getArticleById(idArticleHome, _handleCategoryColors(cbSuccess), cbError);
    }

    function _handleCategoryColors (cbSuccess) {
      var darkFactor = 0.15;

      return function (data) {
        // if(data.article.categories){
        //   var categories = data.article.categories;

        //   for (var i = categories.length - 1; i >= 0; i--) {
        //     var category = categories[i];
        //     if(category.color && !category.bgColor){
        //       category.colorDarker = $window.ColorLuminance(category.color, 0.15);
        //     }
        //   };
        // }
        cbSuccess(data);
      };
    }

    function setHomeAbstract (newAbstract) {
      _savedAbstract = newAbstract;
    }

    function getHomeAbstract () {
      return _savedAbstract;
    }
  }
})();
