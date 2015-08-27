(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('articleBox', articleBox);

  /** @ngInject */
  function articleBox($rootScope) {

    /** @ngInject */
    function ArticleBoxController(ArticleService, $scope, $state, Slug, $log) {
      $log.debug('ArticleBoxController');

      var vm = this;
      vm.ArticleService = ArticleService;
      vm.$scope = $scope;
      vm.$state = $state;
      vm.Slug = Slug;
      vm.$log = $log;

      vm.init();
    }

    ArticleBoxController.prototype.init = function () {
      var vm = this;

      if(!vm.article.slug){
        vm.article.slug = vm.Slug.slugify(vm.article.title);
      }

      if(!vm.category){
        vm.category = vm.article.categories[0];
      }

      if(!vm.banner){
        vm.banner = {
          src: $rootScope.basePath + vm.article.image.url,
          alt: 'Imagem de destaque do conteúdo'
        };
      }

      // if(vm.article.color && !vm.article.bgColor){
      //   // 15% more darker
      //   vm.article.colorDarker = window.ColorLuminance(vm.article.color, 0.15);
      // }
    };

    ArticleBoxController.prototype.showContent = function () {
      var vm = this;

      vm.$state.go('programa-conteudo', {
        slug: vm.article.slug
      }, {
        location: true
      });
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/article-box/article-box.html',
      scope: {
        article: '='
      },
      controller: ArticleBoxController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
