(function(){
  'use strict';

  describe('The index page', function () {

    beforeEach(function () {
      browser.get('/');
    });

    describe('Common layout', function (){
      require('layout')();
    });
  });
})();
