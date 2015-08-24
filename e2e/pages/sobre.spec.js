(function(){
  'use strict';

  describe('The "Sobre" page', function () {

    beforeEach(function () {
      browser.get('/');
    });

    describe('Common layout', function (){
      require('layout')();
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
