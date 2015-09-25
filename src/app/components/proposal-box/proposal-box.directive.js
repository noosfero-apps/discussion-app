(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalBox', proposalBox);

  /** @ngInject */
  function proposalBox() {

    /** @ngInject */
    function ProposalBoxController($scope, $rootScope, $state, $timeout, $interval, $window, VOTE_STATUS, VOTE_OPTIONS, AuthService, DialogaService, $log) {
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

      vm.init();
      vm.addListeners();
    }

    ProposalBoxController.prototype.init = function() {

      var vm = this;

      vm.showVote = vm.showVote || false;
      vm.focus = vm.focus || false;
      vm.STATE = null;
      vm.errorOnSkip = false;
      vm.showCaptchaForm = null;
      vm.voteProposalRedirectURI = null;

      var slug = vm.topic.slug;
      var proposal_id = vm.proposal.id;
      vm.voteProposalRedirectURI = 'state=programa&task=vote-proposal&slug=' + slug + '&proposal_id=' + proposal_id;
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
        vm.$log.debug('proposal-box:vote-response');
        vm.$log.debug('event', event);
        vm.$log.debug('data', data);

        if (data.success) {
          vm.STATE = vm.VOTE_STATUS.SUCCESS;
        }

        if (data.error) {
          vm.STATE = vm.VOTE_STATUS.ERROR;
        }

        if (data.code === 401) {
          vm.message = 'Não autorizado.';
        }
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

    ProposalBoxController.prototype.showContent = function(slug) {
      var vm = this;

      vm.$state.go('programa', {
        slug: slug,
        proposal_id: vm.proposal.id
      }, {
        location: true
      });
    };

    ProposalBoxController.prototype.canVote = function() {
      var vm = this;

      return !!vm.$rootScope.temporaryToken;
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
          // hide captcha form
          vm.showCaptchaForm = false;
          vm.vote(vm._oldVoteValue);
        }

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

      if (vm.canVote()) {
        if (vm.doVote) {
          var data = {
            proposal_id: vm.proposal.id,
            value: value
          };
          vm.doVote(data);
        }else {
          vm.$log.error('No vote function to handler votes');
        }
      }else {
        vm.$log.debug('You cannot vote.');
        vm._oldVoteValue = value;
        vm.showCaptchaForm = true;

        angular.element('#captcha_text').focus();
      }
    };

    ProposalBoxController.prototype.skip = function() {
      var vm = this;

      vm.errorOnSkip = false;
      vm.STATE = vm.VOTE_STATUS.LOADING;
      vm.$scope.$emit('proposal-box:vote', {
        OPTION: vm.VOTE_OPTIONS.SKIP,
        proposal_id: vm.proposal.id
      });
      vm.$log.debug('Sending vote');
    };

    ProposalBoxController.prototype.getSocialUrl = function() {
      var vm = this;

      return vm.$state.href('programa', {
        slug: vm.topic.slug,
        proposal_id: vm.proposal.id,
      });
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/proposal-box/proposal-box.html',
      scope: {
        proposal: '=',
        topic: '=',
        category: '=',
        showVote: '=',
        focus: '@',
        doVote: '&'
        // @ -> Text binding / one-way binding
        // = -> Direct model binding / two-way binding
        // & -> Behaviour binding / Method binding
      },
      controller: ProposalBoxController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

})();
