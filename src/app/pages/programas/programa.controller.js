(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ProgramaPageController', ProgramaPageController);

  /** @ngInject */
  function ProgramaPageController(DialogaService, PATH, VOTE_OPTIONS, PROPOSAL_STATUS, $state, $location, $scope, $rootScope, $element, $sce, $log) {
    var vm = this;

    vm.DialogaService = DialogaService;
    vm.PATH = PATH;
    vm.VOTE_OPTIONS = VOTE_OPTIONS;
    vm.PROPOSAL_STATUS = PROPOSAL_STATUS;
    vm.$state = $state;
    vm.$location = $location;
    vm.$scope = $scope;
    vm.$rootScope = $rootScope;
    vm.$element = $element;
    vm.$sce = $sce;
    vm.$log = $log;

    vm.init();
    vm.loadData();
    vm.attachListeners();
    vm.$rootScope.focusMainContent();

    vm.$log.debug('ProgramaPageController');
  }

  ProgramaPageController.prototype.init = function() {
    var vm = this;

    vm.article = null;
    vm.category = null;
    vm.loading = null;
    vm.loadingTopProposals = null;
    vm.loadingProposalBox = null;
    vm.sendProposalRedirectURI = null;
    vm.showDetailAboutArchived = false;
    // vm.voteProposalRedirectURI = null;
    vm.search = vm.$location.search();

    vm.error = false;
  };

  ProgramaPageController.prototype.loadData = function() {
    var vm = this;

    vm.loading = true;
    vm.proposalStatus = null;

    // Get program by slug
    var slug = vm.$state.params.slug;

    if (!slug) {
      vm.$log.warn('slug not defined.');
      vm.$log.info('Rollback to home page.');
      vm.$state.go('inicio', {}, {location: 'replace'});
      return;
    }

    vm.DialogaService.getProgramBySlug(slug, function(article) {
      vm.article = article;
      vm.category = vm.article.categories[0];
      vm.sendProposalRedirectURI = 'state=programa&task=send-proposal&slug=' + slug;
      // vm.voteProposalRedirectURI = 'state=programa&task=vote-proposal&slug=' + slug;

      // update the breadcrumb
      vm.$rootScope.contentTitle = vm.article.title;

      // set the banner image with full image path
      if (!vm.banner && vm.article.image) {
        vm.banner = {
          src: vm.PATH.image + vm.article.image.url,
          alt: 'Imagem de destaque do conteúdo'
        };
      }

      if (vm.article.body && !vm.article.bodyTrusted) {
        vm.article.bodyTrusted = vm.$sce.trustAsHtml(vm.article.body);
      }

      vm.loadingTopProposals = true;
      vm.DialogaService.getProposalsByTopicIdRanked(vm.article.id, {
        'limit': 5
      }, function(data) {
        vm.total_proposals = parseInt(vm.article.children_count);
        // vm.total_proposals = parseInt(vm.article.amount_of_children); // DEPRECATED?!
        if (data.articles) {
          vm.proposals = data.articles;
        } else {
          vm.proposals = data.proposals;
        }
        console.log("-------------",vm.proposals);
        vm.proposalsTopFive = vm.proposals.slice(0, 5);
        vm.proposalsTopRated = vm.proposals.slice(0, 3);
        vm.loadingTopProposals = false;

        if (vm.article.archived) {

          // show 'respostas e compromissos',
          // ONLY IF the proposal is below or equal 3th position.
          if (vm.search.proposal_id) {
            var found = false;
            var proposal_id = parseInt(vm.search.proposal_id);
            for (var i = vm.proposalsTopRated.length - 1; i >= 0; i--) {
              var proposal = vm.proposalsTopRated[i];

              if(proposal.id === proposal_id){
                found = true;
                break;
              }
            }

            if (!found){
              vm.$log.debug('Proposal is not one of top 3.');
              return;
            }

            // set focus at proposal, ASYNC
            vm.$rootScope.findElAsyncAndFocus('.sub-section-' + proposal_id);

            // TODO: load and show proposal response
          }
        }

        // HACK: get image from body 'proposal'
        // remove tags html
        for (var j = vm.proposalsTopRated.length - 1; j >= 0; j--) {
          var proposalTopRated = vm.proposalsTopRated[j];
          if (proposalTopRated && proposalTopRated.body && proposalTopRated.body.length > 0) {
            proposalTopRated.body = String(proposalTopRated.body).replace(/<[^>]+>/gm, '');
          }else{
            proposalTopRated.body = vm.banner.src;
          }
        }

      }, function(error) {
        vm.$log.error(error);
        vm.loadingTopProposals = false;
      });

      // load content of 'proposal-box'
      if (!vm.article.archived) {

        if (vm.search.proposal_id) {
          // load the proposal and set focus on proposal-box
          vm.loadProposalById(vm.search.proposal_id);
        }else {
          // load a random proposal at proposal-box
          vm.loadRandomProposal();
        }
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

      vm.proposalStatus = vm.PROPOSAL_STATUS.SENDING;

      var category_id = vm.article.categories[0].id;
      vm.DialogaService.createProposal(proposal, vm.article.id, category_id,  function(response) {
        vm.$log.debug('response', response);
        // vm.message =
        // vm.proposalStatus = vm.PROPOSAL_STATUS.SENT | vm.PROPOSAL_STATUS.SUCCESS;
        vm.proposalStatus = vm.PROPOSAL_STATUS.SUCCESS;
      }, function(error) {
        vm.$log.error(error);

        vm.error = error;

        if (vm.error.code === 400) {
          // Bad Request
          vm.error.message = '';
          vm.error.message += 'Não foi possível enviar a proposta.<br>';
          vm.error.message += 'Este problema já foi registrado em nossos servidores.<br>';
          vm.error.message += 'Por favor, tente novamente mais tarde.';
        }

        // vm.proposalStatus = vm.PROPOSAL_STATUS.SENT | vm.PROPOSAL_STATUS.ERROR;
        vm.proposalStatus = vm.PROPOSAL_STATUS.ERROR;
      });
    });
  };

  ProgramaPageController.prototype.loadProposalById = function(proposal_id) {
    var vm = this;

    vm.loadingProposalBox = true;
    vm.DialogaService.getProposalById(proposal_id, {
      'limit': '1'
    }, vm._handleSuccessOnGetProposal.bind(vm), vm._handleErrorOnGetProposal.bind(vm));
  };

  ProgramaPageController.prototype.loadRandomProposal = function() {
    var vm = this;

    vm.loadingProposalBox = true;
    vm.DialogaService.getProposalsByTopicId(vm.article.id, {
      'order': 'random()',
      'limit': '1',
      't': Date.now() // add a timestamp to get a non-cached resource
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
      vm.$rootScope.findElAsyncAndFocus('.focused-proposal');
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

    if (vm.article.archived) {
      vm.$log.info('Article archived. Abort.');
      return;
    }

    if (value === vm.VOTE_OPTIONS.SKIP) {
      vm.voteSkip();
      return;
    }

    vm.DialogaService.voteProposal(proposal_id, {
      value: value
    }).then(function(response) {
      vm.$log.debug('voteProposal response', response);

      response.success = true;
      vm.$scope.$broadcast('proposal-box:vote-response', response);
    }, function(response) {
      vm.$log.debug('voteProposal error', response);

      response.error = true;
      vm.$scope.$broadcast('proposal-box:vote-response', response);
    }).finally(function(response) {
      vm.$log.debug('voteProposal finally', response);

    });
  };

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

    if (vm.article.archived) {
      vm.$log.info('Article archived. Abort.');
      return;
    }

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
    angular.element('html,body').animate({scrollTop: el.offset().top}, 'fast');
  };

  ProgramaPageController.prototype.findAndHide = function(rule) {
    var vm = this;
    vm.$element.find(rule).slideUp();
  };

  ProgramaPageController.prototype.sendAnotherProposal = function() {
    var vm = this;

    vm.proposalStatus = null;
  };

  ProgramaPageController.prototype.toggleContentVisibility = function() {
    var vm = this;
    var $sectionContent = angular.element('.section-content');

    if (!$sectionContent || $sectionContent.length === 0) {
      vm.$log.warn('".section-content" not found.');
      return;
    }

    if ($sectionContent.is(':visible')) {
      $sectionContent.slideUp();
    }else {
      $sectionContent.slideDown();
      angular.element('html,body').animate({scrollTop: $sectionContent.offset().top}, 'fast');
    }
  };

  ProgramaPageController.prototype.toggleResponseVisibility = function(proposal) {
    var vm = this;

    if(!proposal){
      vm.$log.error('Error - proposal is:', proposal);
      return;
    }

    if(proposal.response){
      // show response
      toggle();
    }else{

      // load response
      proposal.response = {
        loading: true,
        error: false,
        content: null
      };

      vm.DialogaService.getResponseByProposalId(proposal.proposal_id)
      .then(function(data){

        proposal.response.content = data.articles[0].body;
        toggle();

      }).catch(function(){
        proposal.response.error = false;
      }).finally(function(){
        proposal.response.loading = false;
      });
    }

    function toggle () {
      var $el = angular.element('.gov-response-' + proposal.id);

      if ($el.is(':visible')) {
        $el.slideUp();
      }else {
        $el.slideDown(100, function(){
          angular.element('html,body').animate({scrollTop: $el.offset().top}, 'fast');
        });
      }
    }
  };



})();