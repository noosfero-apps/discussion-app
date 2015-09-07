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

      UtilService.get(url, {params: paramsExtended})
      .then(function(data){
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

    function getCategories (articleId, params, cbSuccess, cbError) {
      // Ex.: /api/v1/articles/103358?fields=

      var url = service.apiArticles + articleId;
      var paramsExtended = angular.extend({
        'fields[]': ['id', 'categories']
      }, params);

      UtilService.get(url, {params: paramsExtended})
      .then(function(data){
        cbSuccess(data);
      }).catch(function(error){
        cbError(error);
      });
    }

    function getCategoryBySlug (/*slug, params, cbSuccess, cbError*/) {
      throw { name: 'NotImplementedYet', message: 'The service "getArticleBySlug" is not implemented yet.'};
    }

    function getTopics (params, cbSuccess, cbError) {
      // Ex.: /api/v1/articles/103358/children?fields=
      getTopicById(API.articleId.home);
    }

    function getTopicById (topicId, params, cbSuccess, cbError) {
      // Ex.: /api/v1/articles/103358/children?fields=

      var url = service.apiArticles + topicId + '/children';
      var paramsExtended = angular.extend({
        'fields[]': ['id', 'categories']
      }, params);

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

    /**
     * Ex.: /api/v1/articles/[article_id]/children?[params]content_type=ProposalsDiscussionPlugin::Proposal
     * Ex.: /api/v1/articles/103644/children?limit=20&fields=id,name,slug,abstract,created_by&content_type=ProposalsDiscussionPlugin::Proposal
     *
     * @param  {Integer}  topicId   topic where has those proposals
     * @param  {Object}   params    params for pagination ant others
     * @param  {Function} cbSuccess callback for success
     * @param  {Function} cbError   callback for error
     * @return {Array}           [description]
     */
    function getProposalsByTopicId (topicId, params, cbSuccess, cbError) {
      var url = service.apiArticles + topicId + '/children';

      var paramsExtended = angular.extend({
        'fields[]': ['id', 'title', 'abstract', 'children', 'children_count'],
        'limit':'20',
        'page':'1',
        'content_type':'ProposalsDiscussionPlugin::Proposals'
      }, params);

      UtilService.get(url, {params: paramsExtended}).then(function(data){
        cbSuccess(data);
      }).catch(function(error){
        cbError(error);
      });
    }

    function getEvents (community_id, params, cbSuccess, cbError) {
      // Ex.: /api/v1/communities/19195/articles?categories_ids[]=' + cat_id + '&content_type=Event';
      // Ex.: /api/v1/communities/' + community_id + '/articles?categories_ids[]=' + cat_id + '&content_type=Event';

      var url = service.apiCommunities + community_id + '/articles';
      var paramsExtended = angular.extend({
        'fields[]': ['id', 'slug', 'title', 'abstract', 'body', 'categories', 'created_at', 'start_date', 'end_date', 'hits'],
        'content_type':'Event'
      }, params);

      UtilService.get(url, {params: paramsExtended}).then(function(data){
        cbSuccess(data.articles);
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