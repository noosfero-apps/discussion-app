(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ProgramaContentPageController', ProgramaContentPageController);

  /** @ngInject */
  function ProgramaContentPageController(DialogaService, $state, $scope, $rootScope, $log) {
    $log.debug('ProgramaContentPageController');

    var vm = this;

    vm.DialogaService = DialogaService;
    vm.$state = $state;
    vm.$scope = $scope;
    vm.$rootScope = $rootScope;
    vm.$log = $log;

    vm.init();
    vm.loadData();
    vm.attachListeners();
  }

  ProgramaContentPageController.prototype.init = function() {
    var vm = this;

    vm.article = null;
    vm.category = null;

    vm.error = false;
  };

  ProgramaContentPageController.prototype.loadData = function() {
    var vm = this;

    vm.loading = true;

    // Get program by slug
    var slug = vm.$state.params.slug;
    vm.DialogaService.getProgramBySlug(slug, function(article) {
      vm.article = article;
      vm.category = vm.article.categories[0];

      // update the breadcrumb
      vm.$rootScope.contentTitle = vm.article.title;

      // set the banner image with full image path
      if (!vm.banner) {
        vm.banner = {
          src: vm.$rootScope.basePath + vm.article.image.url,
          alt: 'Imagem de destaque do conteúdo'
        };
      }

      vm.DialogaService.getProposalsByTopicId(vm.article.id, {}, function(data){
        vm.proposals = data.children;
        vm.proposalsTopRated = [
          {abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique consectetur neque, at tincidunt enim volutpat sit amet. Integer sed cursus metus, non luctus risus. Mauris elementum est quis vehicula ullamcorper.'},
          {abstract: 'Mauris elementum est quis vehicula ullamcorper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique consectetur neque, at tincidunt enim volutpat sit amet. Integer sed cursus metus, non luctus risus.'},
          {abstract: 'Integer sed cursus metus, non luctus risus. Mauris elementum est quis vehicula ullamcorper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique consectetur neque, at tincidunt enim volutpat sit amet.'},
        ];
      }, function (error) {
        vm.$log.error(error);
      });
      
      vm.loading = false;
    }, function(error) {
      vm.$log.error(error);
      vm.error = error;
      vm.loading = false;
      
      // vm.$log.info('Rollback to home page.');
      // vm.$state.go('inicio', {}, {location: true});
    });

  };

  ProgramaContentPageController.prototype.attachListeners = function() {
    var vm = this;

    vm.$scope.$on('proposal-carousel:toProposals', function() {
      vm.$log.warn('TODO: handle see proposals / ranking');
    });
  };

  ProgramaContentPageController.prototype.makeProposal = function() {
    var vm = this;

    vm.$log.warn('Not implemented yet: "makeProposal"');
  };
})();
