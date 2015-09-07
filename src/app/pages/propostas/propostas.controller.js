(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('PropostasPageController', PropostasPageController);

  /** @ngInject */
  function PropostasPageController(DialogaService, $log) {
    var vm = this;

    vm.DialogaService = DialogaService;
    vm.$log = $log;

    vm.init();
    $log.debug('PropostasPageController');
  }

  PropostasPageController.prototype.init = function () {
    var vm = this;

    vm.article = null;
    vm.themes = null;
    vm.selectedTheme = null;
    vm.proposals = null;
    vm.filtredProposals = null;
    vm.query = null;

    vm.loading = null;
    vm.error = null;

    vm.loadData();
  };


  PropostasPageController.prototype.loadData = function () {
    var vm = this;

    vm.loading = true;

    // load Proposals
    vm.loadingProposals = true;
    vm.DialogaService.getProposalsByTopicId(103644, {}, function(data){
      vm.proposals = data.articles;
      vm.filtredProposals = vm.proposals;
      vm.loadingProposals = false;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
      vm.loadingProposals = false;
    });

    // load themes
    vm.loadingThemes = true;
    vm.DialogaService.getThemes(function(themes){
      vm.themes = themes;
      vm.loadingThemes = false;
    }, function (error) {
      vm.error = error;
      vm.$log.error(error);
      vm.loadingThemes = false;
    });
  };
})();
