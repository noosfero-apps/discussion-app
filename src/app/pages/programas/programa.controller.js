(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ProgramaPageController', ProgramaPageController);

  /** @ngInject */
  function ProgramaPageController(DialogaService, PATH, VOTE_OPTIONS, $state, $location, $scope, $rootScope, $element, $timeout, $log) {
    $log.debug('ProgramaPageController');

    var vm = this;

    vm.DialogaService = DialogaService;
    vm.PATH = PATH;
    vm.VOTE_OPTIONS = VOTE_OPTIONS;
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
    vm.loading = null;
    vm.loadingTopProposals = null;
    vm.loadingProposalBox = null;
    vm.sendProposalRedirectURI = null;
    // vm.voteProposalRedirectURI = null;
    vm.search = vm.$location.search();

    vm.error = false;
  };

  ProgramaPageController.prototype.loadData = function() {
    var vm = this;

    vm.loading = true;

    // Get program by slug
    var slug = vm.$state.params.slug;

    if (!slug) {
      vm.$log.error('slug not defined.');
      vm.$log.info('Rollback to home page.');
      vm.$state.go('inicio', {}, {location: true});
    }

    vm.DialogaService.getProgramBySlug(slug, function(article) {
      vm.article = article;
      vm.category = vm.article.categories[0];
      vm.sendProposalRedirectURI = 'state=programa&task=send-proposal&slug=' + slug;
      // vm.voteProposalRedirectURI = 'state=programa&task=vote-proposal&slug=' + slug;

      // update the breadcrumb
      vm.$rootScope.contentTitle = vm.article.title;

      // set the banner image with full image path
      if (!vm.banner) {
        vm.banner = {
          src: vm.PATH.image + vm.article.image.url,
          alt: 'Imagem de destaque do conteúdo'
        };
      }

      vm.loadingTopProposals = true;
      vm.DialogaService.getProposalsByTopicId(vm.article.id, {}, function(data) {
        vm.proposals = data.articles;
        vm.proposalsTopRated = vm.proposals.slice(0, 3);
        vm.loadingTopProposals = false;
      }, function(error) {
        vm.$log.error(error);
        vm.loadingTopProposals = false;
      });


      vm.loadingProposalBox = true;
      if (vm.search.proposal_id) {
        vm.loadProposalById(vm.search.proposal_id);
      }else {
        // random proposal
        vm.loadRandomProposal();
      }

      vm.loading = false;
    }, function(error) {
      vm.$log.error(error);
      vm.error = error;
      vm.loading = false;
    });
  };

  ProgramaPageController.prototype.attachListeners = function() {
    var vm = this;

    vm.$scope.$on('proposal-carousel:showProposalsList', function() {
      vm.showProposalsList();
    });

    vm.$scope.$on('cadastro-proposa:startSendProposal', function(event, proposal) {
      vm.creatingProposal = true;
      vm.DialogaService.createProposal(proposal, vm.article.id, function(response) {
        vm.$log.debug('response', response);
        vm.creatingProposal = false;
      }, function(error) {
        vm.$log.error(error);
        vm.creatingProposal = false;
      });
    });

    vm.$scope.$on('proposal-box:vote', function(event, params) {
      // vm.$log.debug('event', event);
      // vm.$log.debug('params', params);
      var proposal_id = params.proposal_id;
      var OPTION = params.OPTION;

      switch (OPTION){
        case vm.VOTE_OPTIONS.UP:
        case vm.VOTE_OPTIONS.DOWN:
        case vm.VOTE_OPTIONS.SKIP:
          vm.vote(proposal_id, OPTION);
        break;
        default:
          vm.$log.error('Vote option not handled:', OPTION);
        break;
      }
    });
  };

  ProgramaPageController.prototype.loadProposalById = function(proposal_id) {
    var vm = this;

    vm.DialogaService.getProposalById(proposal_id, {
      'limit': '1'
    }, vm._handleSuccessOnGetProposal.bind(vm), vm._handleErrorOnGetProposal.bind(vm));
  };

  ProgramaPageController.prototype.loadRandomProposal = function() {
    var vm = this;

    vm.DialogaService.getProposalsByTopicId(vm.article.id, {
      'order': 'random()',
      'limit': '1'
    }, vm._handleSuccessOnGetProposal.bind(vm), vm._handleErrorOnGetProposal.bind(vm));
  };

  ProgramaPageController.prototype._handleSuccessOnGetProposal = function(data) {
    var vm = this;

    if (data && data.articles) {
      var MAX = data.articles.length;
      vm.randomProposal = data.articles[Math.floor(Math.random() * MAX)];
      vm.loadingProposalBox = false;
      vm.$scope.$broadcast('proposal-box:proposal-loaded', { success: true});
    }

    // scroll to focused proposal
    if (vm.search.proposal_id) {
      vm.$timeout(function() {
        var target = angular.element('.focused-proposal');
        if (target && target.length > 0) {
          angular.element('body').animate({scrollTop: target.offset().top}, 'fast');
        }
      }, 300);
    }
  };

  ProgramaPageController.prototype._handleErrorOnGetProposal = function(error) {
    var vm = this;
    vm.$log.error(error);
    vm.$scope.$broadcast('proposal-box:proposal-loaded', { error: true});
  };

  ProgramaPageController.prototype.voteSkip = function() {
    var vm = this;
    vm.loadRandomProposal();
  };

  ProgramaPageController.prototype.vote = function(proposal_id, value) {
    var vm = this;

    if (value === vm.VOTE_OPTIONS.SKIP) {
      vm.voteSkip();
      return;
    }

    if (!vm.$rootScope.currentUser) {
      // vm.$state.go('entrar', {
      //   redirect_uri: vm.sendProposalRedirectURI,
      //   message: 'Você precisa estar logado para votar em uma proposta.'
      // }, {
      //   location: true
      // });
      return;
    }

    vm.DialogaService.voteProposal(proposal_id, {
      value: value
    }, function(response) {
      vm.$log.debug('response', response);
      
      response.success = true;
      vm.$scope.$broadcast('proposal-box:vote-response', response);
    }, function(error) {
      vm.$log.error('error', error);
      
      error.error = true;
      vm.$scope.$broadcast('proposal-box:vote-response', error);
    });
  };
  ProgramaPageController.prototype.voteHasBeenComputed = function() {};

  ProgramaPageController.prototype.showProposalsList = function() {
    var vm = this;
    vm.findAndShow('#section-proposal-list');
  };

  ProgramaPageController.prototype.hideProposalsList = function() {
    var vm = this;
    vm.findAndHide('#section-proposal-list');
  };

  ProgramaPageController.prototype.showProposalForm = function() {
    var vm = this;
    vm.findAndShow('#section-proposal-form');
  };

  ProgramaPageController.prototype.hideProposalForm = function() {
    var vm = this;
    vm.findAndHide('#section-proposal-form');
  };

  ProgramaPageController.prototype.findAndShow = function(rule) {
    var vm = this;
    var el = vm.$element.find(rule);
    el.slideDown();
    angular.element('body').animate({scrollTop: el.offset().top}, 'fast');
  };

  ProgramaPageController.prototype.findAndHide = function(rule) {
    var vm = this;
    vm.$element.find(rule).slideUp();
  };

  ProgramaPageController.prototype.sendProposal = function() {
    var vm = this;

    vm.$log.warn('Not implemented yet: "sendProposal"');
  };
})();
