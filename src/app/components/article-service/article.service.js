(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('ArticleService', ArticleService);

  /** @ngInject */
  function ArticleService($http, $q, $rootScope, API, UtilService, Slug, $log) {
    $log.debug('ArticleService');

    var service = {
      apiArticles: $rootScope.basePath + '/api/v1/articles/',
      apiCommunities: $rootScope.basePath + '/api/v1/communities/',
      getArticleById: getArticleById,
      getArticleBySlug: getArticleBySlug,
      getCategories: getCategories,
      getCategoryBySlug: getCategoryBySlug,
      getTopics: getTopics,
      getTopicById: getTopicById,
      getProposals: getProposals,
      getProposalsByTopicId: getProposalsByTopicId,
      getEvents: getEvents,
      searchTopics: searchTopics,
      searchProposals: searchProposals
    };

    return service;

    function _getArticleById (articleId, params, cbSuccess, cbError) {

      var url = service.apiArticles + articleId;
      var paramsExtended = angular.extend({}, params);

      UtilService.get(url, {params: paramsExtended}).then(function(data){
        cbSuccess(data);
      }).catch(function(error){
        cbError(error);
      });
    }

    function getArticleById (articleId, params, cbSuccess, cbError) {
      _getArticleById(articleId, params, cbSuccess, cbError);
    }

    function getArticleBySlug (/*slug, params, cbSuccess, cbError*/) {
      throw { name: 'NotImplementedYet', message: 'The service "getArticleBySlug" is not implemented yet.'};
    }

    function getCategories (articleId, cbSuccess, cbError) {
      // Ex.: /api/v1/articles/103358?fields=

      var url = service.apiArticles + articleId;

      UtilService.get(url, {params: {
        'fields[]': ['id', 'categories']
      }}).then(function(data){
        cbSuccess(data);
      }).catch(function(error){
        cbError(error);
      });
    }

    function getCategoryBySlug () {
      throw { name: 'NotImplementedYet', message: 'The service "getArticleBySlug" is not implemented yet.'};
    }

    function getTopics (cbSuccess, cbError) {
      // Ex.: /api/v1/articles/103358/children?fields=

      var url = service.apiArticles + API.articleId.home + '/children';

      UtilService.get(url, {params: {
        'fields[]': ['id', 'title', 'slug', 'abstract', 'categories', 'setting', 'children_count', 'hits']
      }}).then(function(data){
        cbSuccess(data);
      }).catch(function(error){
        cbError(error);
      });
    }

    function getTopicById (topicId, cbSuccess, cbError) {
      // Ex.: /api/v1/articles/103358/children/121521?fields=

      // var url = service.apiArticles + API.articleId.home + '/children/' + topicId; // dont need to chain
      var url = service.apiArticles + topicId;

      UtilService.get(url, {params: {
        'fields[]': ['id', 'title', 'body', 'slug', 'abstract', 'categories', 'setting', 'children_count', 'hits']
      }}).then(function(data){
        cbSuccess(data);
      }).catch(function(error){
        cbError(error);
      });
    }

    function getProposals (params, cbSuccess, cbError) {
      // Ex.: /api/v1/articles/103358?fields=

      var url = service.apiArticles + API.articleId.home;

      var paramsExtended = angular.extend({
        'fields[]': ['id', 'title', 'slug', 'abstract', 'categories', 'setting', 'children_count', 'hits'],
        'content_type':'ProposalsDiscussionPlugin::Proposals'
      }, params);

      UtilService.get(url, {params: paramsExtended}).then(function(data){
        cbSuccess(data);
      }).catch(function(error){
        cbError(error);
      });
    }

    function getProposalsByTopicId (topicId, params, cbSuccess, cbError) {
      var url = service.apiArticles + topicId;

      var paramsExtended = angular.extend({
        'fields[]': ['id', 'title', 'abstract', 'children', 'children_count'],
        'content_type':'ProposalsDiscussionPlugin::Proposals'
      }, params);

      UtilService.get(url, {params: paramsExtended}).then(function(data){
        cbSuccess(data);
      }).catch(function(error){
        cbError(error);
      });
    }

    function getRandomProposal (cbSuccess, cbError) {}
    
    function getEvents (community_id, params, cbSuccess, cbError) {
      // Ex.: /api/v1/communities/' + community_id + '/articles?categories_ids[]=' + cat_id + '&content_type=Event';
      
      var url = service.apiCommunities + community_id + '/articles';
      var paramsExtended = angular.extend({
        'fields[]': ['id', 'slug', 'title', 'abstract', 'body', 'categories', 'created_at', 'start_date', 'end_date', 'hits'],
        'content_type':'Event'
      }, params);

      UtilService.get(url, {params: paramsExtended}).then(function(data){
        cbSuccess(data);
      }).catch(function(error){
        cbError(error);
      });
    }

    function searchTopics (params, cbSuccess, cbError) {
      // Ex.: /api/v1/search/article?type=ProposalsDiscussionPlugin::Topic&query=cisternas
      var url = '/api/v1/search/article';
      var paramsExtended = angular.extend({
        'fields[]': ['id', 'title', 'slug', 'abstract', 'categories', 'setting', 'children_count', 'hits'],
        'type': 'ProposalsDiscussionPlugin::Topic'
      }, params);

      UtilService.get(url, {params: paramsExtended}).then(function(data){
        cbSuccess(data);
      }).catch(function(error){
        cbError(error);
      });
    }

    function searchProposals (params, cbSuccess, cbError) {
      // Ex.: /api/v1/search/article?type=ProposalsDiscussionPlugin::Proposal&query=cisternas
      var url = '/api/v1/search/article';
      var paramsExtended = angular.extend({
        'fields[]': ['id', 'title', 'slug', 'abstract', 'categories', 'setting', 'children_count', 'hits'],
        'type': 'ProposalsDiscussionPlugin::Proposal'
      }, params);

      UtilService.get(url, {params: paramsExtended}).then(function(data){
        cbSuccess(data);
      }).catch(function(error){
        cbError(error);
      });
    }
  }
})();
