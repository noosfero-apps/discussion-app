(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('ArticleService', ArticleService);

  /** @ngInject */
  function ArticleService($http, $q, $rootScope, API, UtilService, Slug, $log) {
    $log.debug('ArticleService');

    var idArticleHome = API.articleId.home;
    var idArticleAbout = API.articleId.about;
    var idArticleTerms = API.articleId.terms;

    var _savedAbstract = null;

    var service = {
      apiArticles: $rootScope.basePath + '/api/v1/articles/',
      getHome: getHome,
      getAbout: getAbout,
      getTerms: getTerms,
      getArticleById: getArticleById,
      getArticleBySlug: getArticleBySlug,
      getCategories: getCategories,
      getCategoryBySlug: getCategoryBySlug,
      getPrograms: getPrograms,
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

    function getCategories (cbSuccess, cbError) {
      return getHome(function(data){
        cbSuccess(data.article.categories);
      }, cbError);
    }

    function getCategoryBySlug (slug, cbSuccess, cbError) {
      return getHome(function (data){
        var result = null;

        for (var i = data.article.categories.length - 1; i >= 0; i--) {
          var category = data.article.categories[i];
          if (category.slug === slug) {
            result = category;
            break;
          }
        }

        cbSuccess(result);
      }, cbError);
    }

    function getPrograms (cbSuccess, cbError) {
      return getHome(function(data){
        cbSuccess(data.article.children);
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
      }, _handleCategory(cbSuccess), cbError);
    }

    function getAbout (cbSuccess, cbError) {
      return getArticleById(idArticleAbout, {}, cbSuccess, cbError);
    }

    function getTerms (cbSuccess, cbError) {
      return getArticleById(idArticleTerms, {}, cbSuccess, cbError);
    }

    function _handleCategory (cbSuccess) {
      // var darkFactor = 0.15;

      return function (data) {
        if(data.article.categories){
          // var categories = data.article.categories;

          // Handle Category Data

          // Handle Category Colors
        //   for (var i = categories.length - 1; i >= 0; i--) {
        //     var category = categories[i];
        //     if(category.color && !category.bgColor){
        //       category.colorDarker = $window.ColorLuminance(category.color, 0.15);
        //     }
        //   };
        }
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
