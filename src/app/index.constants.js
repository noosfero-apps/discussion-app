/* global Modernizr:false, jQuery:false */
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
    .constant('Modernizr', Modernizr)
    .constant('jQuery', jQuery)
    // .constant('key', value)
    ;

})();
