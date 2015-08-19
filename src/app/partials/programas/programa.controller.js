(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('ProgramaController', ProgramaController);

  /** @ngInject */
  function ProgramaController(ArticleService, $state, $rootScope, $log) {
    $log.debug('ProgramaController');

    var vm = this;

    vm.ArticleService = ArticleService;
    vm.$state = $state;
    vm.$log = $log;

    vm.init();
  }

  ProgramaController.prototype.init = function () {
    var vm = this;

    var params = vm.$state.params;
    var slug = params.slug;

    vm.program = null;

    vm.ArticleService.getArticleBySlug(slug, function(program){
      vm.program = program;

      // load proposals
      // vm.ArticleService.getRandomProposals(program.id).then(function(proposal){
      //   vm.program.proposal = proposal;
      // }, function (error){
      //   vm.$log.error(error);
      // });

      // load events
      // vm.ArticleService.getEvents(program.id).then(function(proposal){
      //   vm.program.proposal = proposal;
      // }, function (error){
      //   vm.$log.error(error);
      // });

      // load body content
      // vm.ArticleService.getBodyContent(program.id).then(function(proposal){
      //   vm.program.proposal = proposal;
      // }, function (error){
      //   vm.$log.error(error);
      // });

    }, function (error) {
      vm.$log.error(error);
      vm.$log.info('Rollback to home page.');
      vm.$state.go('inicio', {}, {location: true});
    });
  };

  ProgramaController.prototype.goBack = function () {
    var vm = this;

    vm.$log.warn('Not implemented yet!');
  };
})();
