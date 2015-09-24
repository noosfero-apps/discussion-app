(function(){
  'use strict';

  describe('The "Sobre" page', function () {
    var page = browser.get('/');

    // beforeEach(function () {
    //   browser.get('/');
    // });

    describe('Common layout', function (){
      require('./layout.js')();
    });

    describe('Breadcrumb', function(){
      it('should have two itens', function() {});
    });

    describe('Content', function(){
      it('should have a main video', function() {});
      it('should have a main video thumb image', function() {});
      it('should have a main video thumb image alternative text', function() {});

      it('should have a "Programas" description', function() {});
      it('should have a "Propostas" tutorial', function() {});
      it('should be accessible', function() {});
    });
  });
})();
