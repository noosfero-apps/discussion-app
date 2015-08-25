module.exports = (function() {
  'use strict';

  var PageObject = function() {
    this.skipToContent = element(by.id('skip-to-content'));
    this.skipToNavigation = element(by.id('skip-to-navigation'));
    this.skipToSearch = element(by.id('skip-to-search'));
    this.skipToFooter = element(by.id('skip-to-footer'));

    this.actionAccessibility = element(by.id('siteaction-accessibility'));
    this.actionContrast = element(by.id('siteaction-contrast'));
    this.actionSitemap = element(by.id('siteaction-sitemap'));
  };

  return (new PageObject());
})();
