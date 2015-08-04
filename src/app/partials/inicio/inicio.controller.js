(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('InicioController', InicioController);

  /** @ngInject */
  function InicioController(ArticleService, $sce, $log) {
    $log.debug('InicioController');

    var vm = this;


    $log.log('ArticleService', ArticleService);

    vm.loading = true;
    ArticleService.getHome().then(function(homeArticle){
      vm.article = homeArticle.article;
      vm.article.abstract = $sce.trustAsHtml(vm.article.abstract);
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
