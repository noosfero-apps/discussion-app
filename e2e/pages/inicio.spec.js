/* global require */
(function(){
  'use strict';

  describe('The index page', function () {
    var page = require('./inicio.po.js');
    // beforeEach(function () {
    //   browser.get('/');
    // });

    describe('Common layout', function (){
      require('./layout.js')();
    });

    describe('Component: Main Video', function(){
      it('should have a thumb background image (for async)', function() {
        expect(page.video.element(by.css('.video-thumbnail'))).toBeDefined();
        expect(page.video.element(by.css('.video-thumbnail')).getCssValue('background-image')).toContain('youtube-background.png');
        expect(page.video.element(by.css('.video-thumbnail')).getAttribute('aria-hidden')).toBe('true');
      });

      it('should have a button play trigger', function() {
        expect(page.video.element(by.css('.video-play-button'))).toBeDefined();
        expect(page.video.element(by.css('.video-play-button')).getAttribute('aria-label')).toBeDefined();
      });
    });

    describe('Component: Agenda', function(){
      it('should have a tab-trigger', function() {
        expect(page.agenda.element(by.css('.event-tab--trigger'))).toBeDefined();
        expect(page.agenda.element(by.css('.event-tab--title'))).toBeDefined();
        expect(page.agenda.element(by.css('.event-tab--icon'))).toBeDefined();
        expect(page.agenda.element(by.css('.event-tab--icon')).element(by.css('.glyphicon'))).toBeDefined();
        expect(page.agenda.element(by.css('.event-tab--icon')).element(by.css('.glyphicon')).getAttribute('aria-hidden')).toBe('true');
        expect(page.agenda.element(by.css('.event-tab--button'))).toBeDefined();
        expect(page.agenda.element(by.css('.event-tab--total-scheduled'))).toBeDefined();
        expect(page.agenda.element(by.css('.event-tab--total-scheduled'))).toMatch(/(\d)*/);
      });

      describe('Component: Agenda / Open-panel', function(){
        it('should have a header', function() {
          // the 2 lines below need to open panel and make elements visibles
          expect(page.agenda.element(by.model('eventListCtrl.isListVisible'))).toBeDefined();
          page.agenda.element(by.css('.event-tab--trigger')).click();

          expect(page.agenda.element(by.css('.event-list--title'))).toBeDefined();
          expect(page.agenda.element(by.css('.event-list--title')).getText()).toEqual('Bate-papo com ministr@s');
          expect(page.agenda.element(by.css('.event-list--icon'))).toBeDefined();
          expect(page.agenda.element(by.css('.event-list--icon')).element(by.css('.glyphicon'))).toBeDefined();
          expect(page.agenda.element(by.css('.event-list--icon')).element(by.css('.glyphicon')).getAttribute('aria-hidden')).toBe('true');
          expect(page.agenda.element(by.css('.event-list--minimize'))).toBeDefined();
          expect(page.agenda.element(by.css('.event-list--minimize')).element(by.css('.glyphicon'))).toBeDefined();
          expect(page.agenda.element(by.css('.event-list--minimize')).element(by.css('.glyphicon')).getAttribute('aria-hidden')).toBe('true');
        });

        it('should have a table with content', function() {
          // date/time
          expect(page.agenda.element(by.css('.event-list--minimize')).element(by.css('.glyphicon')).getAttribute('aria-hidden')).toBe('true');
          // title
          // subscribe button
          // total of subscribers
          // show only 5 itens
        });
        // it('should have the title of scheduled chat', function() {});
        // it('should have a subscribe button to scheduled chat', function() {});
        // it('should show the number of subscribers on each item', function() {});
        // it('should show 5 itens at most', function() {});
        // it('should be accessible', function() {});
      });

      describe('Component: Agenda / with Hangout', function(){
        it('should have a title', function() {});
        it('should have a thumb background image (for async)', function() {});
        it('should have a button trigger to start the video', function() {});
        it('should have a description', function() {
          // PATTERN: %DATETIME - %TITLE, %CATEGORY, ?
          // Get it from the endpoint or assembly-it ?
        });
        it('should have a open trigger', function() {
          // with:
          // - total of scheduled events
          // - icon: arrow down
        });
      });
    });

    describe('Component: Category List', function(){
      it('should have a title', function() {});
      it('should have list of category', function() {});
      it('should have the icon of each category', function() {});
      it('should have the name of each category', function() {});
      it('should be accessible', function() {});
      // what expect on hover or focus? Material Desgn likes?
      //
    });

    describe('Component: Article List | Box (each) ', function(){
      it('should have a category label', function() {});
      it('should have a banner image', function() {});
      it('should have a alternatve text for the banner image', function() {});
      it('should have a title', function() {});
      it('should have 50 letters at most on title', function() {});
      it('should have a abstract', function() {});
      it('should have 200 letters at most on abstract', function() {});
      it('should have the number of sent proposals', function() {});
      it('should have a call-to-action button', function() {});
      it('should have the same color of the category-color at call-to-action button', function() {});
      it('should be accessible', function() {});
      // what colors on what?
      // what are links/clickable/focusable
    });

    describe('Component: Search ', function(){
      it('should have a hidden label', function() {});
      it('should have a html5 search input', function() {});
      it('should have be focusable by a11y link', function() {});
      it('should have a more filters?', function() {});
      it('should be accessible', function() {});
      // what behaviours?
      // more filters? ordering by alphabet: name, category, random.
      // show results at another page
    });
  });
})();
