(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('UtilService', UtilService);

  /** @ngInject */
  function UtilService($http, $q, $log) {
    $log.debug('UtilService');

    var service = {
      get: get,
      post: post,
      // put: put,
      // delete: delete,
      // head: head,
      handleSuccess: handleSuccess,
      handleError: handleError
    };

    return service;

    function get (url, config) {
      return $http.get(url, config)
        .then(handleSuccess)
        .catch(handleError);
    }

    function post (url, config) {
      return $http.post(url, config)
        .then(handleSuccess)
        .catch(handleError);
    }

    /**
     * Transform the successful response, unwrapping the application data
     * from the API response payload.
     *
     * @param  {Object} response from the server.
     *         data – {string|Object} – The response body transformed with the transform functions.
     *         status – {number} – HTTP status code of the response.
     *         headers – {function([headerName])} – Header getter function.
     *         config – {Object} – The configuration object that was used to generate the request.
     *         statusText – {string} – HTTP status text of the response.
     *
     * @return {Object}          the data unwrapped.
     */
    function handleSuccess (response) {
      $log.debug('[SUCCESS]', response);
      response.data._obj = response;
      return response.data;
    }

    /**
     * Transform the error response, unwrapping the application data from
     * the API response payload.
     *
     * @param  {Object} error from the server.
     * @return {Promise}      promise rejection called.
     */
    function handleError (error) {
      $log.debug('[ERROR]', error);

      $log.error('XHR Failed on Service.\n' + angular.toJson(error.data, true));

      // The API response from the server should be returned in a
      // nomralized format. However, if the request was not handled by the
      // server (or what not handles properly - ex. server error), then we
      // may have to normalize it on our end, as best we can.
      if (!angular.isObject(error.data)) {
        return $q.reject('An unknown error occurred.');
      }

      // Otherwise, use expected error message.
      return $q.reject(error.data);
    }
  }
})();
