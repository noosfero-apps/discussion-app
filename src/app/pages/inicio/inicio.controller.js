/* globals document:true, window:true */
(function() {
  'use strict';

  angular
    .module('dialoga')
    .controller('InicioPageController', InicioPageController);

  /** @ngInject */
  function InicioPageController(DialogaService, $scope, $location, $filter, $sce, $timeout, $log) {
    var vm = this;

    // aliases
    vm.DialogaService = DialogaService;
    vm.$scope = $scope;
    vm.$location = $location;
    vm.$filter = $filter;
    vm.$sce = $sce;
    vm.$timeout = $timeout;
    vm.$log = $log;

    vm.init();
    vm.loadData();
    vm.attachListeners();
    vm.$log.debug('InicioPageController');
  }

  InicioPageController.prototype.init = function() {
    var vm = this;

    vm.article = null;
    vm.events = null;
    vm.featuredEvent = null;
    vm.bannerRespostas = true;
    vm.themes = null;
    vm.selectedTheme = null;
    vm.programs = null;
    vm.filtredPrograms = null;
    vm.query = null;
    vm.scroll = null;
    vm.search = vm.$location.search();

    if (vm.search.tema) {
      vm._filtredByThemeSlug = vm.search.tema;
    }

    if (vm.search.filtro) {
      vm._filtredByQuery = vm.search.filtro;
    }

    if (vm.search.tema || vm.search.filtro) {
      vm.loadingFilter = true;
    }

    if (vm.search.scroll) {
      vm.scroll = vm.search.scroll;
    }

    vm.loading = null;
    vm.error = null;
  };

  InicioPageController.prototype.loadData = function() {
    var vm = this;

    // Load main content
    vm.loading = true;
    vm.DialogaService.getHome(function(data) {
      vm.article = data.article;

      if (vm.article.videoIsLoaded) {
        hideBackground(2000);
      }

      _loadAfterHome();

      vm.loading = false;
    }, function(error) {
      vm.$log.error('Error on getHome.', error);
      vm.loading = false;
      vm.error = error;
    });

    // Load event list
    vm.loadingEvents = true;
    vm.DialogaService.getEvents().then(function(data) {
      vm.$log.debug('getEvents.success', data);
      vm.events = data.articles;

      var orderBy = vm.$filter('orderBy');
      vm.featuredEvent = orderBy(vm.events, 'start_date', false)[0];
    }, function(error) {
      vm.$log.debug('Error on getEvents.', error);
      vm.eventsError = error;
    }, function(data) {
      vm.$log.debug('{UPDATE}', data);
    }).finally(function(data){
      vm.$log.debug('{FINALLY}', data);
      vm.loadingEvents = false;
    });

    function _loadAfterHome () {

      // Load theme list
      vm.loadingThemes = true;
      vm.DialogaService.getThemes(function(data) {
        vm.themes = data;
        vm.loadingThemes = false;

        vm.filter();
      }, function(error) {
        vm.$log.error('Error on getThemes.', error);
        vm.loadingThemes = false;
        vm.errorThemes = error;
      });

      // Load program list
      vm.loadingPrograms = true;
      vm.DialogaService.getProgramsRandom({}, function(data) {
        vm.programs = vm.article.children;
        vm.filtredPrograms = data.articles;
        vm.loadingPrograms = false;

        vm.filter();

        _loadAfterPrograms();
      }, function(error) {
        vm.$log.error('Error on getPrograms.', error);
        vm.loadingPrograms = false;
        vm.errorPrograms = error;
      });
    }

    function _loadAfterPrograms () {
      vm._scrollHandler();
    }
  };

  InicioPageController.prototype._scrollHandler = function() {
    var vm = this;

    // scroll handler
    if (vm.search.scroll) {
      var scroll = vm.search.scroll;
      var scrollTop = 0;

      if(angular.isNumber(scroll)){
        scrollTop = parseInt(scroll);
      }else{
        // find by ID
        var $target = angular.element('#' + vm.search.scroll);
        if ($target && $target.length > 0) {
          scrollTop = $target.offset().top;
        }else {
          vm.$log.warn('element not found:', vm.search.scroll);
        }
      }

      vm.$timeout(function() {
        angular.element('html,body').animate({scrollTop: scrollTop}, 'fast');
      }, 0); // force queue
    }
  };

  InicioPageController.prototype.attachListeners = function() {
    var vm = this;

    vm.$scope.$on('change-selectedCategory', function(event, selectedCategory) {
      vm.selectedTheme = selectedCategory;
    });

    vm.$scope.$watch('pageInicio.selectedTheme', function(newValue/*, oldValue*/) {
      vm.search.tema = newValue ? newValue.slug : null;
      vm.$location.search('tema', vm.search.tema);

      if (!vm.loadingFilter) {
        vm.filtredPrograms = vm.getFiltredPrograms();
      }
    });

    vm.$scope.$watch('pageInicio.query', function(newValue/*, oldValue*/) {
      vm.search.filtro = newValue ? newValue : null;
      vm.$location.search('filtro', vm.search.filtro);

      if (!vm.loadingFilter) {
        vm.filtredPrograms = vm.getFiltredPrograms();
      }
    });
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

  InicioPageController.prototype.showEventVideo = function() {
    var vm = this;

    hideBackground(0); // force to hide

    vm.featuredEvent.canView = true;
    vm.featuredEvent.bodyTrusted = vm.$sce.trustAsHtml(vm.featuredEvent.body);
  };

  InicioPageController.prototype.submitSearch = function() {
    var vm = this;

    vm.loadingFilter = true;

    // scroll to result grid
    var $searchResult = angular.element('#search-result');
    if ($searchResult && $searchResult.length > 0) {
      angular.element('html,body').animate({scrollTop: $searchResult.offset().top}, 'fast');
      vm.filtredPrograms = vm.getFiltredPrograms();
    }else {
      vm.$log.warn('#search-result element not found.');
    }
  };

  InicioPageController.prototype.filter = function() {
    var vm = this;

    if (vm.loadingThemes || vm.loadingPrograms) {
      vm.$log.info('No programs or themes loaded yet. Abort.');
      return;
    }

    if (vm._filtredByThemeSlug) {
      var slug = vm._filtredByThemeSlug;

      vm.DialogaService.getThemeBySlug(slug, function(theme) {
        vm.selectedTheme = theme;
      }, function(error) {
        vm.$log.error('Error when try to "getThemeBySlug"', error);
      });
    }

    if (vm._filtredByQuery) {
      vm.query = vm._filtredByQuery;
    }

    if (vm._filtredByThemeSlug || vm._filtredByQuery) {
      vm.filtredPrograms = vm.getFiltredPrograms();
      vm.loadingFilter = false;
    }
  };

  InicioPageController.prototype.showAllPrograms = function($event) {
    var vm = this;
    $event.stopPropagation();

    vm.resetFilterValues();

    vm.filtredPrograms = vm.getFiltredPrograms();
  };

  InicioPageController.prototype.resetFilterValues = function() {
    var vm = this;

    vm.query = null;
    vm.selectedTheme = null;
  };

  InicioPageController.prototype.getFiltredPrograms = function() {
    var vm = this;

    if (!vm.programs) {
      vm.$log.debug('No programs loaded yet. Abort.');
      return null;
    }

    var input = vm.programs;
    var output = input;
    var query = vm.query;
    var selectedTheme = vm.selectedTheme;

    var filter = vm.$filter('filter');
    vm.loadingFilter = true;

    if (selectedTheme) {
      output = vm._filterByCategory(output, selectedTheme);
    }

    if (query) {
      output = filter(output, query, false);
    }

    if (!query && !selectedTheme) {
      output = _balanceByCategory(output);
    }

    vm.loadingFilter = false;
    return output;
  };

  InicioPageController.prototype._filterByCategory = function(input, category) {
    var vm = this;

    input = input || [];

    if (!category) {
      // no filter
      return input;
    }

    var out = [];
    for (var i = 0; i < input.length; i++) {
      var program = input[i];

      if (!program.categories || program.categories.length === 0) {
        vm.$log.warn('Program without theme (category)', program.slug);
        continue;
      }

      if (program.categories[0].slug === category.slug) {
        out.push(program);
      }
    }

    return out;
  };

  function _balanceByCategory (input) {
    var result = [];
    var resultByCategory = {};

    // divide by categories
    for (var i = 0; i < input.length; i++) {
      var program = input[i];
      var categorySlug = program.categories[0].slug;

      if (!resultByCategory[categorySlug]) {
        resultByCategory[categorySlug] = [];
      }

      resultByCategory[categorySlug].push(program);
    }

    // shuffle each array
    var prop = null;
    var categoryWithPrograms = null;
    // for (prop in resultByCategory) {
    //   if (resultByCategory.hasOwnProperty(prop)) {
    //     categoryWithPrograms = resultByCategory[prop];
    //     resultByCategory[prop] = shuffle(categoryWithPrograms);
    //   }
    // }

    // Concat all into result array
    // > while has program at Lists on resultByCategory
    var hasProgram = true;
    while (hasProgram) {

      var foundProgram = false;
      // each categoryList with array of program
      prop = null;
      categoryWithPrograms = null;
      for (prop in resultByCategory) {

        if (resultByCategory.hasOwnProperty(prop)) {
          categoryWithPrograms = resultByCategory[prop];

          if (categoryWithPrograms.length > 0) {
            var pivotProgram = categoryWithPrograms.pop();
            result.push(pivotProgram);
            foundProgram = true;
          }
        }
      }

      if (!foundProgram) {
        hasProgram = false;
      }
    }

    return result;
  }

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
