(function(){
  'use strict';

  describe('The index page', function () {
    var page = browser.get('/');

    // beforeEach(function () {
    //   browser.get('/');
    // });

    describe('Common layout', function (){
      require('./layout.js')();
    });

  });
})();
