(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalBox', proposalBox);

  /** @ngInject */
  function proposalBox() {

    /** @ngInject */
    function ProposalBoxController($scope, $location, $rootScope, $state, $timeout, $interval, $window, VOTE_STATUS, VOTE_OPTIONS, AuthService, DialogaService, $log) {
      $log.debug('ProposalBoxController');

      var vm = this;
      vm.$scope = $scope;
      vm.$rootScope = $rootScope;
      vm.$state = $state;
      vm.$timeout = $timeout;
      vm.$interval = $interval;
      vm.$window = $window;
      vm.VOTE_STATUS = VOTE_STATUS;
      vm.VOTE_OPTIONS = VOTE_OPTIONS;
      vm.AuthService = AuthService;
      vm.$log = $log;
      vm.$location = $location;

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

      // Load captcha
      var stop = null;
      stop = vm.$interval(function() {
        var $el = angular.element('#serpro_captcha');

        if ($el && $el.length > 0) {
          vm.$window.initCaptcha($el[0]);
          vm.$interval.cancel(stop);
          stop = undefined;
        }else {
          vm.$log.debug('captcha element not found.');
        }

      }, 10);
    };

    ProposalBoxController.prototype.canVote = function() {
      var vm = this;

      return !!vm.$rootScope.temporaryToken || (vm.$rootScope.currentUser && !!vm.$rootScope.currentUser.private_token);
    };

    ProposalBoxController.prototype.submitCaptcha = function($event, captchaForm) {
      var vm = this;

      var target = $event.target;
      var $target = angular.element(target);
      var $captcha = $target.find('[name="txtToken_captcha_serpro_gov_br"]');

      vm.sendingCaptcha = true;
      vm.AuthService.loginCaptcha({
        captcha_text: captchaForm.captcha_text.$modelValue,
        txtToken_captcha_serpro_gov_br: $captcha.val()
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

      }, function(data) {
        // ERROR
        vm.$log.debug('register error.data', data);

        vm.sendingCaptchaError = {
          code: data.status,
          message: data.message || ('Erro (' + data.status + '). Já estamos trabalhando para resolver o problema.<br/>Por favor, tente novamente mais tarde')
        };

        if (angular.equals(vm.sendingCaptchaError.message, 'Internal captcha validation error')) {
          vm.sendingCaptchaError.message = 'Erro interno ao tentar validar captcha.<br/><br/>Já estamos trabalhando para resolver o problema.<br/>Por favor, tente novamente mais tarde.';
        }

      }, function(data) {
        // UPDATE
        vm.$log.debug('register update.data', data);
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
      var $el = angular.element('#serpro_captcha');
      vm.$window.reloadCaptcha($el[0]);

      // focus on input
      angular.element('#captcha_text').val('').focus();
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
