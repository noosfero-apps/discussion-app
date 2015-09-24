(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('articlePreview', articlePreview);

  /** @ngInject */
  function articlePreview() {

    /** @ngInject */
    function ArticlePreviewController($state, PATH, $log) {
      $log.debug('ArticlePreviewController');

      var vm = this;
      vm.$state = $state;
      vm.PATH = PATH;
      vm.$log = $log;

      vm.init();
    }

    ArticlePreviewController.prototype.init = function () {
      var vm = this;

      if(!vm.article.slug){
        throw { name: 'NotDefined', message: 'The attribute "slug" is undefined.'};
      }

      if(!vm.category){
        vm.category = vm.article.categories[0];
      }

      if(!vm.banner){
        vm.banner = {
          src: vm.PATH.image + vm.article.image.url,
          alt: 'Imagem de destaque do programa'
        };
      }
    };

    ArticlePreviewController.prototype.showContent = function () {
      var vm = this;

      vm.$state.go('conheca-o-programa', {
        slug: vm.article.slug
      }, {
        location: true
      });
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/article-preview/article-preview.html',
      scope: {
        article: '='
      },
      controller: ArticlePreviewController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
