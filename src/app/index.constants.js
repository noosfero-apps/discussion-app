/* global window:true */
(function() {
  'use strict';

  angular
    .module('dialoga')
    .constant('api', {
      token: null,
      host: 'http://login.dialoga.gov.br/api/v1/',
      articleId: {
        home: 103358
      }
    })
    .constant('Modernizr', window.Modernizr)
    .constant('jQuery', window.jQuery)
    // .constant('key', value)
    ;

})();
