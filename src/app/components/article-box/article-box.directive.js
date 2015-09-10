(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('articleBox', articleBox);

  /** @ngInject */
  function articleBox() {

    /** @ngInject */
    function ArticleBoxController($state, PATH, $log) {
      $log.debug('ArticleBoxController');

      var vm = this;
      vm.$state = $state;
      vm.PATH = PATH;
      vm.$log = $log;

      vm.init();
    }

    ArticleBoxController.prototype.init = function () {
      var vm = this;

      if(!vm.article.slug){
        throw { name: 'NotDefined', message: 'The attribute "slug" is undefined.'};
      }

      if(!vm.category){
        throw { name: 'NotDefined', message: 'The attribute "category" is undefined.'};
      }

      if(!vm.image && vm.article.image){
        vm.image = {
          src: vm.PATH.image + vm.article.image.url,
          alt: 'Imagem de destaque do conteúdo'
        };
      }
    };

    ArticleBoxController.prototype.showContent = function () {
      var vm = this;

      vm.$state.go('programa', {
        slug: vm.article.slug
      }, {
        location: true
      });
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/article-box/article-box.html',
      scope: {
        article: '=',
        category: '='
      },
      controller: ArticleBoxController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
