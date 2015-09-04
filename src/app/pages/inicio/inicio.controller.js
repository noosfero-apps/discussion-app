/* globals document:true, window:true */
(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('InicioPageController', InicioPageController);

  /** @ngInject */
  function InicioPageController(DialogaService, $sce, $log) {
    var vm = this;

    // aliases
    vm.DialogaService = DialogaService;
    vm.$sce = $sce;
    vm.$log = $log;

    vm.init();
    vm.$log.debug('InicioPageController');
  }

  InicioPageController.prototype.init = function() {
    var vm = this;

    vm.error = null;
    vm.loading = true;

    vm.loadData();
  };

  InicioPageController.prototype.loadData = function() {
    var vm = this;

    vm.content = vm.DialogaService.getHomeAbstract();
    vm.isCached = !!vm.content;

    if (vm.isCached) {
      hideBackground(2000);
    }

    vm.DialogaService.getHome(function(data) {
      vm.loading = false;
      vm.article = data.article;
    }, function(error) {
      vm.$log.error('Error on getHome article.', error);
      vm.error = 'Erro ao carregar o conteúdo principal.';
    });
  };

  InicioPageController.prototype.showVideo = function() {
    var vm = this;

    // we need handle home content
    if (vm.isCached) {
      hideBackground(0); // force to hide
      vm.$log.debug('The content already cached. Show-it!');
      return;
    }

    vm.content = vm.handleHomeAbstract(vm.article.abstract);
    vm.DialogaService.setHomeAbstract(vm.content);

    // inject dependencies
    injectIframeApiJs();
    window.onYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady || onYouTubeIframeAPIReady;
    window.onYouTubePlayerReady = window.onYouTubePlayerReady || onYouTubePlayerReady;
  };

  // TODO: move this to DialogaService
  InicioPageController.prototype.handleHomeAbstract = function(abstract) {
    var vm = this;

    abstract = forceIframeParams(abstract);
    abstract = removeStylefromIframe(abstract);

    return vm.$sce.trustAsHtml(abstract);
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

  function forceIframeParams(abstract) {
    var patternIframe = '<iframe src="';
    var indexOfIframe = abstract.indexOf(patternIframe);

    if (indexOfIframe === -1) {
      return abstract;
    }

    var startSrcUrl = indexOfIframe + patternIframe.length;
    var endSrcUrl = abstract.indexOf('"', startSrcUrl);
    var srcUrl = abstract.substring(startSrcUrl , endSrcUrl);
    var resultUrl = srcUrl;
    var c = (srcUrl.indexOf('?') !== -1) ? '&' : ''; // already have url params. So, append-it

    // enable js api
    if (srcUrl.indexOf('enablejsapi=1') === -1) {
      resultUrl += c + 'enablejsapi=1';
      c = '&'; // force to always use '&' after here
    }

    // set opaque mode
    if (srcUrl.indexOf('wmode=opaque') === -1) {
      resultUrl += c + 'wmode=opaque';
      // c = '&'; // force to always use '&' after here
    }

    abstract = abstract.replace(srcUrl, resultUrl);

    return abstract;
  }

  function removeStylefromIframe (abstract) {
    var patternIframe = 'style="';
    var indexOfIframe = abstract.indexOf('<iframe');
    var indexOfStyleOnIframe = abstract.indexOf('style="', indexOfIframe);

    if (indexOfStyleOnIframe === -1) {
      return abstract;
    }

    var startStyleContent = indexOfStyleOnIframe + patternIframe.length;
    var endStyleContent = abstract.indexOf('"', startStyleContent);
    var style = abstract.substring(startStyleContent , endStyleContent);

    return abstract.replace(style, '');
  }
})();
