(function() {
  'use strict';

  angular
    .module('dialoga')
    .directive('proposalRanking', proposalRanking);

  /** @ngInject */
  function proposalRanking($rootScope) {

    /** @ngInject */
    function ProposalRankingController(ArticleService, $scope, $log) {
      $log.debug('ProposalRankingController');

      var vm = this;
      vm.ArticleService = ArticleService;
      vm.$scope = $scope;
      vm.$log = $log;

      vm.init();
    }

    ProposalRankingController.prototype.init = function () {
      // initial values
      var vm = this;

      vm.loadData();
    };

    ProposalRankingController.prototype.loadData = function () {
      // async values
      // var vm = this;

    };

    ProposalRankingController.prototype.showProposals = function () {
      var vm = this;

      // notify parents
      vm.$scope.$emit('see-proposals');
    };

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/proposal-ranking/proposal-ranking.html',
      scope: {
        limit: '=',
        display: '='
      },
      controller: ProposalRankingController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;
  }

})();
