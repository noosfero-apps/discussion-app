/* globals document:true, window:true */
(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('InicioPageController', InicioPageController);

  /** @ngInject */
  function InicioPageController(DialogaService, $scope, $sce, $log) {
    var vm = this;

    // aliases
    vm.DialogaService = DialogaService;
    vm.$scope = $scope;
    vm.$sce = $sce;
    vm.$log = $log;

    vm.init();
    vm.$log.debug('InicioPageController');
  }

  InicioPageController.prototype.init = function() {
    var vm = this;

    vm.article = null;
    vm.themes = null;
    vm.selectedTheme = null;
    vm.programs = null;
    vm.filtredPrograms = null;
    vm.query = null;

    vm.error = null;

    vm.loadData();
    vm.attachListeners();
  };

  InicioPageController.prototype.loadData = function() {
    var vm = this;

    vm.loading = true;
    vm.loadingEvents = true;
    vm.loadingThemes = true;
    vm.loadingPrograms = true;

    // Load main content
    vm.DialogaService.getHome(function(data) {
      vm.article = data.article;

      if (vm.article.videoIsLoaded) {
        hideBackground(2000);
      }

      loadAfterHome();
      
      vm.loading = false;
    }, function(error) {
      vm.$log.error('Error on getHome.', error);
    });

    // Load event list
    vm.DialogaService.getEvents({}, function(data) {
      vm.events = data;
      vm.loadingEvents = false;
    }, function(error) {
      vm.$log.error('Error on getEvents.', error);
      vm.loadingEvents = false;
      vm.eventsError = true;
    });

    function loadAfterHome () {

      // Load theme list
      vm.DialogaService.getThemes(function(data) {
        vm.themes = data;
        vm.loadingThemes = false;
      }, function(error) {
        vm.$log.error('Error on getThemes.', error);
      });

      // Load program list
      vm.DialogaService.getProgramsRandom(function(data) {
        vm.programs = vm.article.children;
        vm.filtredPrograms = data;
        vm.loadingPrograms = false;
      }, function(error) {
        vm.$log.error('Error on getPrograms.', error);
      });
    }

  };

  InicioPageController.prototype.showVideo = function() {
    var vm = this;

    // we need handle home content
    if (vm.article.videoIsLoaded) {
      hideBackground(0); // force to hide
      vm.$log.debug('The content already cached. Show-it!');
      return;
    }

    // inject dependencies
    injectIframeApiJs();
    window.onYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady || onYouTubeIframeAPIReady;
    window.onYouTubePlayerReady = window.onYouTubePlayerReady || onYouTubePlayerReady;

    vm.article.videoIsLoaded = true;
  };

  InicioPageController.prototype.attachListeners = function() {
    var vm = this;

    vm.$scope.$on('change-selectedCategory', function (selectedCategory) {
      vm.selectedTheme = selectedCategory;
    });
  };

  function injectIframeApiJs() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  function onYouTubeIframeAPIReady() {
    var ytIframe = angular.element.find('.js-iframe iframe');
    var YTPlayer = window.YT.Player;
    new YTPlayer(ytIframe[0], {
      events: {
        'onReady': onYouTubePlayerReady
      }
    });
  }

  function onYouTubePlayerReady (event) {
    event.target.playVideo();
    hideBackground(1000);
  }

  function hideBackground (ms) {
    var $elBg = angular.element.find('.video-background');
    angular.element($elBg).fadeOut(ms || 100);
    // angular.element($elBg).hide();
  }
})();
