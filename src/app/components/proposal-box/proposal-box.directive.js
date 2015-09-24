(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalBox', proposalBox);

  /** @ngInject */
  function proposalBox() {

    /** @ngInject */
    function ProposalBoxController($scope, $rootScope, $state, $timeout, $interval, $window, VOTE_STATUS, VOTE_OPTIONS, AuthService, $log) {
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

    ProposalBoxController.prototype.init = function () {

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

    ProposalBoxController.prototype.addListeners = function () {
      var vm = this;

      vm.$scope.$on('proposal-box:proposal-loaded', function(event, data){
        if(data.success){
          vm.STATE = null;
        }

        if(data.error){
          vm.errorOnSkip = data.error;
        }
      });

      vm.$scope.$on('proposal-box:vote-response', function(event, data){
        vm.$log.debug('proposal-box:vote-response');
        vm.$log.debug('event', event);
        vm.$log.debug('data', data);

        if(data.success) {
          vm.STATE = vm.VOTE_STATUS.SUCCESS;
        }

        if(data.error) {
          vm.STATE = vm.VOTE_STATUS.ERROR;
        }

        vm.message = data.message;
      });

      // Load captcha
      var stop = null;
      stop = vm.$interval(function(){
        var $el = angular.element('#serpro_captcha');

        if ($el && $el.length > 0 ){
          vm.$window.initCaptcha($el[0]);
          vm.$interval.cancel(stop);
          stop = undefined;
        }else{
          vm.$log.debug('captcha element not found.');
        }

      }, 10);
    };

    ProposalBoxController.prototype.showContent = function (slug) {
      var vm = this;

      vm.$state.go('programa', {
        slug: slug,
        proposal_id: vm.proposal.id
      }, {
        location: true
      });
    };

    ProposalBoxController.prototype.canVote = function () {
      return false;
    };

    ProposalBoxController.prototype.submitCaptcha = function ($event, captchaForm) {
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

        // get captcha_token
      }, function(data) {
        // ERROR
        vm.$log.debug('register error.data', data);

        vm.sendingCaptchaError = {code: data.status };

        if(data.status === 404){
          vm.$log.error('The api service is out!?');
        }

      }, function(data){
        // UPDATE
        vm.$log.debug('register update.data', data);
      }).finally(function(){
        vm.sendingCaptcha = false;
      });
    };

    ProposalBoxController.prototype.vote = function (value) {
      var vm = this;

      if(vm.canVote()){
        vm.$scope.$emit('proposal-box:vote', {
          OPTION: value,
          proposal_id: vm.proposal.id
        });
        vm.$log.debug('Sending vote', value);
      }else{
        vm.$log.debug('You cannot vote.');
        vm.showCaptchaForm = true;
      }
    };

    ProposalBoxController.prototype.voteDown = function () {
      var vm = this;

      vm.STATE = vm.VOTE_STATUS.LOADING;
      vm.$scope.$emit('proposal-box:vote', {
        OPTION: vm.VOTE_OPTIONS.DOWN,
        proposal_id: vm.proposal.id
      });
      vm.$log.debug('Sending vote');
    };

    ProposalBoxController.prototype.skip = function () {
      var vm = this;

      vm.errorOnSkip = false;
      vm.STATE = vm.VOTE_STATUS.LOADING;
      vm.$scope.$emit('proposal-box:vote', {
        OPTION: vm.VOTE_OPTIONS.SKIP,
        proposal_id: vm.proposal.id
      });
      vm.$log.debug('Sending vote');
    };

    ProposalBoxController.prototype.getSocialUrl = function () {
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
        focus: '@'
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
