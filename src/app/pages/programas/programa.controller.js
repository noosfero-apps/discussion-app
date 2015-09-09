(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ProgramaPageController', ProgramaPageController);

  /** @ngInject */
  function ProgramaPageController(DialogaService, PATH, $state, $location, $scope, $rootScope, $element, $timeout, $log) {
    $log.debug('ProgramaPageController');

    var vm = this;

    vm.DialogaService = DialogaService;
    vm.PATH = PATH;
    vm.$state = $state;
    vm.$location = $location;
    vm.$scope = $scope;
    vm.$rootScope = $rootScope;
    vm.$element = $element;
    vm.$timeout = $timeout;
    vm.$log = $log;

    vm.init();
    vm.loadData();
    vm.attachListeners();
  }

  ProgramaPageController.prototype.init = function() {
    var vm = this;

    vm.article = null;
    vm.category = null;
    vm.search = vm.$location.search();

    vm.error = false;
  };

  ProgramaPageController.prototype.loadData = function() {
    var vm = this;

    vm.loading = true;

    // Get program by slug
    var slug = vm.$state.params.slug;

    if(!slug){
      vm.$log.error('slug not defined.');
      vm.$log.info('Rollback to home page.');
      vm.$state.go('inicio', {}, {location: true});
    }

    vm.DialogaService.getProgramBySlug(slug, function(article) {
      vm.article = article;
      vm.category = vm.article.categories[0];

      // update the breadcrumb
      vm.$rootScope.contentTitle = vm.article.title;

      // set the banner image with full image path
      if (!vm.banner) {
        vm.banner = {
          src: vm.PATH.image + vm.article.image.url,
          alt: 'Imagem de destaque do conteúdo'
        };
      }

      vm.DialogaService.getProposalsByTopicId(vm.article.id, {}, function(data){
        vm.proposals = data.articles;
        vm.proposalsTopRated = vm.proposals.slice(0, 3);
      }, function (error) {
        vm.$log.error(error);
      });

      if(vm.search.proposal_id){
        var proposalUrlId = vm.search.proposal_id;
        vm.DialogaService.getProposalById(proposalUrlId, {
          'limit': '1'
        }, _handleSuccessGetProposal, _handleErrorGetProposal);

      }else{
        // get random proposal
        vm.DialogaService.getProposalsByTopicId(vm.article.id, {
          'order': 'random()',
          'limit': '1'
        }, _handleSuccessGetProposal, _handleErrorGetProposal);
      }

      function _handleSuccessGetProposal(data){
        if(data && data.articles){
          vm.randomProposal = data.articles[0];
        }

        // scroll to focused proposal
        if(vm.search.proposal_id){
          vm.$timeout(function(){
            var target = angular.element('.focused-proposal');
            angular.element('body').animate({scrollTop: target.offset().top}, 'fast');
          }, 300);
        }
      }

      function _handleErrorGetProposal(error){
        vm.$log.error(error);
      }

      vm.loading = false;
    }, function(error) {
      vm.$log.error(error);
      vm.error = error;
      vm.loading = false;

      // vm.$log.info('Rollback to home page.');
      // vm.$state.go('inicio', {}, {location: true});
    });
  };

  ProgramaPageController.prototype.attachListeners = function() {
    var vm = this;

    vm.$scope.$on('proposal-carousel:showProposals', function() {
      if(!vm._proposal_list){
        vm._proposal_list = vm.$element.find('.proposal-ranking-section');
      }

      vm._proposal_list.slideDown();
      angular.element('body').animate({scrollTop: vm._proposal_list.offset().top}, 'fast');
    });
  };

  ProgramaPageController.prototype.hideProposals = function() {
    var vm = this;

    if(!vm._proposal_list){
      vm._proposal_list = vm.$element.find('.proposal-ranking-section');
    }

    vm._proposal_list.slideUp();
  };

  ProgramaPageController.prototype.makeProposal = function() {
    var vm = this;

    vm.$log.warn('Not implemented yet: "makeProposal"');
  };
})();
