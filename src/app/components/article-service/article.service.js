(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('ArticleService', ArticleService);

  /** @ngInject */
  function ArticleService($http, $q, $rootScope, API, UtilService, Slug, GUID, $log) {
    $log.debug('ArticleService');

    var service = {
      apiArticles: $rootScope.basePath + '/api/v1/articles/',
      apiCommunities: $rootScope.basePath + '/api/v1/communities/',
      apiProposals: $rootScope.basePath + '/api/v1/proposals_discussion_plugin/',
      getArticleById: getArticleById,
      getArticleBySlug: getArticleBySlug,
      getCategories: getCategories,
      getCategoryBySlug: getCategoryBySlug,
      getTopics: getTopics,
      getTopicById: getTopicById,
      getProposals: getProposals,
      getProposalById: getProposalById,
      getProposalsByTopicId: getProposalsByTopicId,
      createProposal: createProposal,
      voteProposal: voteProposal,
      getEvents: getEvents,
      subscribeToEvent: subscribeToEvent,
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
      getTopicById(API.articleId.home, params, cbSuccess, cbError);
    }

    function getTopicById (topicId, params, cbSuccess, cbError) {
      // Ex.: /api/v1/articles/103358/children?fields=

      var url = service.apiArticles + topicId + '/children';
      var paramsExtended = angular.extend({
        'fields[]': ['id', 'categories']
        // 'fields[]': ['id', 'title', 'body', 'slug', 'abstract', 'categories', 'setting', 'children_count', 'hits']
      }, params);

      UtilService.get(url, {params: paramsExtended})
      .then(function(data){
        cbSuccess(data);
      }).catch(function(error){
        cbError(error);
      });
    }

    function getProposals (params, cbSuccess, cbError) {
      var paramsExtended = angular.extend({
        query: ''
      }, params);

      searchProposals(paramsExtended, cbSuccess, cbError);
    }

    function getProposalById (proposalId, params, cbSuccess, cbError) {
      var url = service.apiArticles + proposalId;

      var paramsExtended = angular.extend({
        // 'fields[]': ['id', 'title', 'abstract', 'children', 'children_count', 'ranking_position', 'hits', 'votes_for', 'votes_against'],
        // 'per_page':'1',
        'limit':'1',
        'content_type':'ProposalsDiscussionPlugin::Proposal'
      }, params);

      UtilService.get(url, {params: paramsExtended}).then(function(data){
        _pipeInjectSlugIntoParentProgram(data);
        _pipeSortByRankinPosition(data);
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
      getProposalById(topicId + '/children', params, cbSuccess, cbError);
    }

    function createProposal (proposal, targetId, cbSuccess, cbError){

      if(!$rootScope.currentUser){
        cbError({message: 'Usuário não logado.'});
      }else{
        // /api/v1/proposals_discussion_plugin/' + targetId + '/propose
        var url = service.apiProposals + targetId + '/propose';

        var encodedParams = [];
        encodedParams.push('article%5Babstract%5D=' + proposal);
        encodedParams.push('article%5Btype%5D=ProposalsDiscussionPlugin%3A%3AProposal');
        encodedParams.push('content_type=ProposalsDiscussionPlugin%3A%3AProposal');
        encodedParams.push('private_token=' + $rootScope.currentUser.private_token);
        encodedParams.push('fields=id');
        encodedParams.push('article[name]=article_' + GUID.generate());
        encodedParams = encodedParams.join('&');

        UtilService.post(url, encodedParams).then(function(response){
          cbSuccess(response);
        }).catch(function(error){
          cbError(error);
        });
      }
    }

    function voteProposal (proposal_id, params, cbSuccess, cbError){
      var url = service.apiArticles + proposal_id + '/vote';
      var paramsExtended = angular.extend({
        private_token: $rootScope.currentUser.private_token
        // private_token: 'e2198fdbcc20409f082829b4b5c0848e'
      }, params);

      var encodedParams = angular.element.param(paramsExtended);

      UtilService.post(url, encodedParams).then(function(response){
        cbSuccess(response);
      }).catch(function(error){
        cbError(error);
      });
    }

    function getEvents (community_id, params, cbSuccess, cbError) {
      // Ex.: /api/v1/communities/19195/articles?categories_ids[]=' + cat_id + '&content_type=Event';
      // Ex.: /api/v1/communities/' + community_id + '/articles?categories_ids[]=' + cat_id + '&content_type=Event';

      var url = service.apiCommunities + community_id + '/articles';
      var paramsExtended = angular.extend({
        // 'fields[]': ['id', 'title', 'abstract', 'body', 'categories', 'created_at', 'start_date', 'end_date', 'followers_count', 'image', 'url'],
        'content_type':'Event'
      }, params);

      UtilService.get(url, {params: paramsExtended}).then(function(data){
        _pipeIsInThePast(data);
        cbSuccess(data.articles);
      }).catch(function(error){
        cbError(error);
      });
    }

    // function getSubscribers (event_id, params, cbSuccess, cbError) {
    //   var url = service.apiArticles + event_id + '/followers?_=' + new Date().getTime();
    //   var paramsExtended = angular.extend({
    //     // 'fields[]': ['id', 'slug', 'title', 'abstract', 'body', 'categories', 'created_at', 'start_date', 'end_date', 'hits'],
    //     'content_type':'Event'
    //   }, params);

    //   UtilService.get(url, {params: paramsExtended}).then(function(data){
    //     cbSuccess(data.articles);
    //   }).catch(function(error){
    //     cbError(error);
    //   });
    // }

    function subscribeToEvent (event_id, params, cbSuccess, cbError) {

      if(!$rootScope.currentUser){
        cbError({message: 'Usuário não logado.'});

      }else{
        var url = service.apiArticles + event_id + '/follow';
        var encodedParams = 'private_token=' + $rootScope.currentUser.private_token;

        UtilService.post(url, encodedParams).then(function(response){
          cbSuccess(response);
        }).catch(function(error){
          cbError(error);
        });
      }
    }

    function searchTopics (params, cbSuccess, cbError) {
      // Ex.: /api/v1/search/article?type=ProposalsDiscussionPlugin::Topic&query=cisternas
      var url = '/api/v1/search/article';
      var paramsExtended = angular.extend({
        // 'fields[]': ['id', 'title', 'slug', 'abstract', 'categories', 'setting', 'children_count', 'hits'],
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
        page: 1,
        per_page: 20,
        type: 'ProposalsDiscussionPlugin::Proposal'
      }, params);

      UtilService.get(url, {params: paramsExtended}).then(function(data){
        _pipeInjectSlugIntoParentProgram(data);
        _pipeSortByRankinPosition(data);
        cbSuccess(data);
      }).catch(function(error){
        cbError(error);
      });
    }

    function _pipeInjectSlugIntoParentProgram(data){
      if(!data.articles && data.article){
        data.articles = [data.article];
      }
      var proposals = data.articles;
      for (var i = proposals.length - 1; i >= 0; i--) {
        var proposal = proposals[i];
        if(proposal.parent && !proposal.parent.slug){
          proposal.parent.slug = Slug.slugify(proposal.parent.title);
        }
      }
    }

    function _pipeSortByRankinPosition(data){
      if(!data.articles && data.article){
        data.articles = [data.article];
      }
      data.articles = data.articles.sort(function(pA, pB){
        return pA.ranking_position - pB.ranking_position;
      });
    }

    function _pipeIsInThePast(data){
      if(!data.articles && data.article){
        data.articles = [data.article];
      }
      var now = (new Date()).getTime();
      var eventDate = null;
      var events = data.articles;

      for (var i = events.length - 1; i >= 0; i--) {
        var event = events[i];

        if(event.end_date){
          eventDate = new Date(event.end_date);
        }

        if(eventDate.getTime() < now){
          event.isOld = true;
        }
      }
    }
  }
})();
