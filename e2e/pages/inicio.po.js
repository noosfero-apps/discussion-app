module.exports = (function() {
  'use strict';

  var PageObject = function() {
    this.video = element(by.css('.video-player'));

    this.agenda = element(by.css('.event-list'));
  };

  return (new PageObject());
})();
