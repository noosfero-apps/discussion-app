(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('InicioController', InicioController);

  /** @ngInject */
  function InicioController(ArticleService, $log) {
    $log.debug('InicioController');

    var vm = this;


    $log.log('ArticleService', ArticleService);

    // ArticleService.getList().then(function(articles){
    vm.loading = true;
    ArticleService.getHome().then(function(homeArticle){
      $log.log('ArticleService.getList().then() homeArticle.article', homeArticle.article);

      vm.article = homeArticle.article;
      vm.loading = false;
    }, function () {
      $log.error('error');
      vm.loading = false;
    });

    // vm.awesomeThings = [];
    // vm.classAnimation = '';
    // vm.creationDate = 1438689506090;

    // activate();

    // function activate() {
    //   $timeout(function() {
    //     vm.classAnimation = 'rubberBand';
    //   }, 4000);
    // }
  }
})();
