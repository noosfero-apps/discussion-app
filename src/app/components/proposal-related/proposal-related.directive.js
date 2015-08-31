(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalRelated', proposalRelated);

  /** @ngInject */
  function proposalRelated() {

    /** @ngInject */
    function ProposalRelatedController(ArticleService, $scope, $element, $timeout, $log) {
      $log.debug('ProposalRelatedController');

      var vm = this;
      vm.ArticleService = ArticleService;
      vm.$scope = $scope;
      vm.$element = $element;
      vm.$timeout = $timeout;
      vm.$log = $log;

      vm.init();
    }

    ProposalRelatedController.prototype.init = function () {
      // initial values
      var vm = this;

      vm.activeIndex = 1;
      vm.loading = false;

      if(angular.isDefined(vm.limit) && angular.isString(vm.limit)){
        vm.limit = parseInt(vm.limit);
      }else{
        vm.limit = 3;
      }

      vm.loadData();
    };

    ProposalRelatedController.prototype.loadData = function () {
      // async values
      var vm = this;

      vm.loading = true;

      // simulate delay
      vm.$timeout(function(){
        vm.loading = false;

        // Fake Data
        // vm.proposals = vm.ArticleService.getProposals();
        vm.proposals = [{
          id: 4159,
          abstract: 'Ut odio unde porro in. Aut fuga magni adipisci. Recusandae ipsum distinctio omnis ut illum.',
          effective_support: 0.1572052401746725,
          hits: 4159,
          votes_against: 3779,
          votes_for: 1780
        },{
          id: 935,
          abstract: 'Magni sunt ut molestiae. A porro et quod saepe placeat amet nihil. Aut ut id voluptatem doloribus quia.',
          effective_support: 0.1572052401746725,
          hits: 8602,
          votes_against: 7005,
          votes_for: 8728
        },{
          id: 1008,
          abstract: 'Cum quas assumenda nihil delectus eos. Minus fugit velit voluptatem nisi nam esse ut id.',
          effective_support: 0.1572052401746725,
          hits: 9181,
          votes_against: 612,
          votes_for: 1786
        }];

        if(vm.display === 'list'){
          // wait until DOM be created
          vm.$timeout(function(){
            attachPopover.call(vm);
          }, 20);
        }
      }, 2000);
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/proposal-related/proposal-related.html',
      scope: {
        article: '='
      },
      controller: ProposalRelatedController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
