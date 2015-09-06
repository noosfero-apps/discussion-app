(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('articlePreview', articlePreview);

  /** @ngInject */
  function articlePreview($rootScope) {

    /** @ngInject */
    function ArticlePreviewController($state, $log) {
      $log.debug('ArticlePreviewController');

      var vm = this;
      vm.$state = $state;
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
          src: $rootScope.basePath + vm.article.image.url,
          alt: 'Imagem de destaque do programa'
        };
      }

      // if(vm.article.color && !vm.article.bgColor){
      //   // 15% more darker
      //   vm.article.colorDarker = window.ColorLuminance(vm.article.color, 0.15);
      // }
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
