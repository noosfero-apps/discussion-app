(function(){
  'use strict';

  describe('The "Programa" page', function () {

    beforeEach(function () {
      browser.get('/');

    });

    describe('Common layout', function (){
      require('layout')();
    });

    describe('Component: article-preview', function (){});

    describe('Component: article-content', function (){});

    // describe('Component: article-template-1', function (){});

    describe('Component: proposal-random', function (){
      it('should have a loading state', function() {});
      it('should have a breadcrumb', function() {});
      it('should have the text-content of proposal', function() {});
      it('should have a vote up button', function() {});
      it('should have a vote skip button', function() {});
      it('should have a vote down button', function() {});
      it('should have a social share area', function() {});
      it('should have the ranking position', function() {});
      it('should have a ranking button trigger', function() {});
      it('should be accessible', function() {});
    });

    describe('Component: proposal-ranking', function (){
      it('should have a loading state', function() {});
      it('should have a close button trigger', function() {});
      it('should have the ranking position of proposal', function() {});
      it('should have the text-content of proposal', function() {});
      it('should have the number of views', function() {});
      it('should have the number of votes up', function() {});
      it('should have the number of votes down', function() {});
      it('should have a link to proposal', function() {});
      it('should have a link to all proposals', function() {});
      it('should be accessible', function() {});
    });

    describe('Component: proposal-maker', function (){
      it('should be accessible', function() {});
    });

    describe('Component: proposal-ranking', function (){
      it('should be accessible', function() {});
    });
  });
})();
