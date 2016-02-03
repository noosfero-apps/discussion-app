(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalBox', proposalBox);

  /** @ngInject */
  function proposalBox() {

    /** @ngInject */
    function ProposalBoxController($scope, $location, $rootScope, $state, $timeout, $interval, $window, APP, VOTE_STATUS, VOTE_OPTIONS, AuthService, DialogaService, vcRecaptchaService, $log) {
      $log.debug('ProposalBoxController');

      var vm = this;
      vm.$scope = $scope;
      vm.$location = $location;
      vm.$rootScope = $rootScope;
      vm.$state = $state;
      vm.$timeout = $timeout;
      vm.$interval = $interval;
      vm.$window = $window;
      vm.APP = APP;
      vm.VOTE_STATUS = VOTE_STATUS;
      vm.VOTE_OPTIONS = VOTE_OPTIONS;
      vm.AuthService = AuthService;
      vm.vcRecaptchaService = vcRecaptchaService;
      vm.$log = $log;

      vm.init();
      vm.addListeners();
    }

    ProposalBoxController.prototype.init = function() {

      var vm = this;

      vm.showVote = vm.showVote || false;
      vm.archived = vm.archived || false;
      vm.focus = vm.focus || false;
      vm.STATE = null;
      vm.errorOnSkip = false;
      vm.showCaptchaForm = null;
      vm.recaptchaWidgetId = null;
      vm.recaptchaResponse = null;
      vm.voteProposalRedirectURI = null;
      vm.proposalsImg = null;

      var slug = vm.topic.slug;
      var proposal_id = vm.proposal.id;
      vm.voteProposalRedirectURI = 'state=programa&task=vote-proposal&slug=' + slug + '&proposal_id=' + proposal_id;
      
      // Take the coming proposal image of the body
      // Pegar a imagem da proposta vinda do body
      vm.proposalsImg = String(vm.proposal.body).replace(/<[^>]+>/gm, '');
      if(vm.proposalsImg !== "undefined"){
        vm.ProposalBody = false;
      }else{
        vm.ProposalBody = true;
      }
      
    };

    ProposalBoxController.prototype.addListeners = function() {
      var vm = this;

      vm.$scope.$on('proposal-box:proposal-loaded', function(event, data) {
        if (data.success) {
          vm.STATE = null;
        }

        if (data.error) {
          vm.errorOnSkip = data.error;
        }
      });

      vm.$scope.$on('proposal-box:vote-response', function(event, data) {
        if (data.success) {
          vm.STATE = vm.VOTE_STATUS.SUCCESS;
        }

        if (data.error) {
          vm.STATE = vm.VOTE_STATUS.ERROR;
        }

        if (data.code === 401) {
          vm.message = 'Não autorizado.';
        }

        vm.messageCode = data.code;
      });

      // reCaptcha Listeners
      vm.setWidgetId = function(widgetId) {
        // store the `widgetId` for future usage.
        // For example for getting the response with
        // `recaptcha.getResponse(widgetId)`.
        vm.$log.info('Created widget ID:', widgetId);
        vm.recaptchaWidgetId = widgetId;
        
      };

      vm.setResponse = function(response) {
        
        // Update local captcha response
        vm.$log.debug('Response available', response);
        vm.recaptchaResponse = response;
      };

      vm.cbExpiration = function() {
        // reset the 'response' object that is on scope 
        vm.$log.debug('cbExpiration');
      };
    };

    ProposalBoxController.prototype.canVote = function() {
      var vm = this;

      return !!vm.$rootScope.temporaryToken || (vm.$rootScope.currentUser && !!vm.$rootScope.currentUser.private_token);
    };

    ProposalBoxController.prototype.submitCaptcha = function($event, captchaForm) {
      var vm = this;

      var target = $event.target;
      var $target = angular.element(target);

      vm.sendingCaptcha = true;
      vm.AuthService.loginCaptcha({
        g_recaptcha_response: vm.recaptchaResponse
      }).then(function(data) {
        // SUCCESS
        vm.$log.debug('register success.data', data);

        // SEND VOTE
        if (vm._oldVoteValue) {
          vm.vote(vm._oldVoteValue);
          vm._oldVoteValue = null;
        }
        // hide captcha form
        vm.showCaptchaForm = false;

      })
      .catch(function(data) {
        // ERROR
        vm.$log.debug('register error.data', data);

        // In case of a failed validation you need to reload the captcha
        // because each response can be checked just once
        vm.vcRecaptchaService.reload(vm.recaptchaWidgetId);

        vm.sendingCaptchaError = {};
        vm.sendingCaptchaError.code = data.status;
        vm.sendingCaptchaError.message = data.message || ('Erro (' + data.status + '). Já estamos trabalhando para resolver o problema.<br/>Por favor, tente novamente mais tarde');

        if (angular.equals(vm.sendingCaptchaError.message, 'Internal captcha validation error')) {
          vm.sendingCaptchaError.message = 'Erro interno ao tentar validar captcha.<br/><br/>Já estamos trabalhando para resolver o problema.<br/>Por favor, tente novamente mais tarde.';
        }

      }).finally(function() {
        vm.sendingCaptcha = false;
      });
    };

    ProposalBoxController.prototype.captchaTryAgain = function() {
      var vm = this;

      vm.showCaptchaForm = true;
      vm.sendingCaptcha = false;
      vm.sendingCaptchaError = false;
      vm.message = null;

      // reload new captcha
      vm.vcRecaptchaService.reload(vm.recaptchaWidgetId);

      // focus on input
      // angular.element('#captcha_text').val('').focus();
    };

    ProposalBoxController.prototype.vote = function(value) {
      var vm = this;

      if(vm.archived === true){
        vm.$log.info('Article archived. Abort.');
        return;
      }

      vm._oldVoteValue = value;
      if (vm.canVote()) {
        if (vm.doVote) {
          vm.doVote({
            proposal_id: vm.proposal.id,
            value: value
          });
        }else {
          vm.$log.error('No vote function to handler votes');
        }
      }else {
        vm.$log.debug('You cannot vote.');
        vm.showCaptchaForm = true;

        angular.element('#captcha_text').focus();
      }
    };

    ProposalBoxController.prototype.skip = function() {
      var vm = this;

      if(vm.archived === true){
        vm.$log.info('Article archived. Abort.');
        return;
      }

      vm.errorOnSkip = false;
      vm.STATE = vm.VOTE_STATUS.LOADING;
      vm.doVote({
        proposal_id: vm.proposal.id,
        value: vm.VOTE_OPTIONS.SKIP
      });
      vm.$log.debug('Sending vote');
    };

    ProposalBoxController.prototype.getSocialUrl = function() {
      var vm = this;

      return vm.$state.href('programa', {
        slug: vm.topic.slug,
        proposal_id: vm.proposal.id,
      }, {
        absolute: true
      });
    };

    ProposalBoxController.prototype.getSocialText = function() {
      var vm = this;

      return vm.proposal.abstract;
    };

    ProposalBoxController.prototype.getSocialImage = function() {
      var vm = this;

      return vm.$rootScope.basePath + vm.topic.image.url;
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/proposal-box/proposal-box.html',
      scope: {
        // @ -> Text binding / one-way binding
        // = -> Direct model binding / two-way binding
        // & -> Behaviour binding / Method binding
        archived: '=',
        category: '=',
        doVote: '&',
        focus: '@',
        proposal: '=',
        showVote: '=',
        topic: '=',
        location: '=',
      },
      controller: ProposalBoxController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();
