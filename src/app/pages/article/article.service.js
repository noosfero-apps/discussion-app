(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('ArticleService', ArticleService);

  /** @ngInject */
  function ArticleService($http, $q, $rootScope, UtilService, Slug, $log) {
    $log.debug('ArticleService');

    var idArticleHome = '103358';
    var idArticleAbout = '108073';
    var idArticleTerms = '107880';

    var _savedAbstract = null;

    var service = {
      apiArticles: $rootScope.basePath + '/api/v1/articles/',
      getHome: getHome,
      getAbout: getAbout,
      getTerms: getTerms,
      getArticleById: getArticleById,
      getArticleBySlug: getArticleBySlug,
      getContentById: getContentById,
      setHomeAbstract: setHomeAbstract,
      getHomeAbstract: getHomeAbstract
    };

    var CACHE = {}; // cache by article id

    return service;

    function loadArticleById (articleId, params, cbSuccess, cbError) {

      var url = service.apiArticles + articleId;
      var paramsExtended = angular.extend({}, params);

      UtilService.get(url, {params: paramsExtended}).then(function(data){
        CACHE[articleId] = data;
        cbSuccess(data);
      }, function(error){
        cbError(error);
      });
    }

    function getArticleById (articleId, params, cbSuccess, cbError) {
      var cachedArticle = CACHE[articleId];

      if(cachedArticle){
        cbSuccess(cachedArticle);
      }else{
        loadArticleById(articleId, params, cbSuccess, cbError);
      }
    }

    function getArticleBySlug (slug, cbSuccess, cbError) {
      var vm = this;

      /**
       * XXX: get from home article util we have a endpoint to do-it.
       */
      vm.getHome(function (data) {
        var mainArticle = data.article;
        var programList = mainArticle.children;
        var categories = mainArticle.categories;

        $rootScope._CATEGORIES = $rootScope._CATEGORIES ? $rootScope._CATEGORIES : categories;

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

    function getContentById (contentId, cbSuccess, cbError) {
      return getArticleById(contentId, {
        fields: 'id,body&content_type=ProposalsDiscussionPlugin::Topic'
      }, cbSuccess, cbError);
    }

    function getHome (cbSuccess, cbError) {
      return getArticleById(idArticleHome, {
        fields: 'id,children,categories,abstract,title,image,url,setting,position',
        private_token: 'null'
      }, _handleCategoryColors(cbSuccess), cbError);
    }

    function getAbout (cbSuccess, cbError) {
      return getArticleById(idArticleAbout, {}, cbSuccess, cbError);
    }

    function getTerms (cbSuccess, cbError) {
      return getArticleById(idArticleTerms, {}, cbSuccess, cbError);
    }

    function _handleCategoryColors (cbSuccess) {
      // var darkFactor = 0.15;

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
