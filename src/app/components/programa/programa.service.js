(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('ProgramaService', ProgramaService);

  /** @ngInject */
  function ProgramaService($http, $q, private_token, ErrorService, $log) {
    var apiHost = 'http://login.dialoga.gov.br/api/v1';

    var endpoint = {
      home: apiHost + '/articles/103358?private_token=null&fields=id,children,categories,abstract,title,image,url,setting,position',
      articles: apiHost + '/articles?private_token=' + private_token + '&fields=id,children,created_by,categories,tag_list,abstract,setting,profile&content_type=ProposalsDiscussionPlugin::Proposal',
      tasks: apiHost + '/task?private_token=' + private_token + '&fields=id,children,created_by,categories,tag_list,abstract,setting,profile&content_type=ProposalsDiscussionPlugin::Proposal'
    };

    var service = {

      // mock
      mockPrograma: mockPrograma,

      // api
      getArticles: getArticles,
      getProposal: getProposal
    };

    return service;

    // ---
    // PUBLIC METHODS
    // ---

    /**
     * Mock Data
     * @return {Object} a new instance with dumb data;
     */
    function mockPrograma () {
      return {
        id: -1,
        title: "Valorização dos Professores",
        abstract: "<p>Caminho para uma educação de qualidade.</p>",
        image: {url: "/image_uploads/dialoga/0000/0140/valorizacao_professor.jpg"},
        categories: [{name: "[category]", id: -1, slug: "[category-slug]", image: null}],
        author: '[author]',
        position: -1, // ?
        profile: { // ?
          id: -1,
          identifier: '[profile.identifier]',
          name: '[profile.name]',
        },
        setting: { // ?
          author_name: '[setting.author_name]',
          comment_paragraph_plugin_activate: false
        },
        children: [], // ?
        tag_list: []
      };
    }

    /**
     * Get a list of articles
     * @param  {Number} limit per_page (default is 30)
     * @return {Array} a list of articles
     */
    function getArticles (limit) {
      if (!limit) {
        limit = 30;
      }

      return $http.get(endpoint.articles)
        .then(handleSuccess)
        .catch(handleError);
    }

    /**
     * Get a task by id
     * @param  {Number} id of task
     * @return {Object} the wanted task or a new one.
     */
    function getProposal (id) {
      if (!id) {
        throw new Error(ErrorService.paramRequired('id'));
      }

      return $http.get(endpoint.tasks)
        .then(handleSuccess)
        .catch(handleError);
    }

    // ---
    // PRIVATE METHODS
    // ---

    /**
     * Transform the successful response, unwrapping the application data
     * from the API response payload.
     *
     * @param  {Object} response from the server.
     * @return {Object}          the data unwrapped.
     */
    function handleSuccess (response){
      return response.data;
    }

    /**
     * Transform the error response, unwrapping the application data from
     * the API response payload.
     *
     * @param  {Object} error from the server.
     * @return {Promise}      promise rejection called.
     */
    function handleError (error){

      $log.error('XHR Failed on ProgramaService.\n' + angular.toJson(error.data, true));

      // The API response from the server should be returned in a
      // nomralized format. However, if the request was not handled by the
      // server (or what not handles properly - ex. server error), then we
      // may have to normalize it on our end, as best we can.
      if ( !angular.isObject( error.data ) || !error.data.message) {
        return( $q.reject( 'An unknown error occurred.' ) );
      }

      // Otherwise, use expected error message.
      return $q.reject(error.data.message);
    }
  }
})();
