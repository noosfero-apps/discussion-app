(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('DialogaService', DialogaService);

  /** @ngInject */
  function DialogaService($rootScope, $sce, API, ArticleService, UtilService, Slug, $log) {
    $log.debug('DialogaService');

    var service = {
      getHome: getHome,
      getAbout: getAbout,
      getThemes: getThemes,
      getPrograms: getPrograms,
      getProgramBySlug: getProgramBySlug,
      getProgramsRandom: getProgramsRandom,
      getProposals: getProposals,
      getEvents: getEvents,
      getQuestions: getQuestions,
      searchProgram: searchProgram,
      searchProposal: searchProposal,
    };

    var CACHE = {};

    return service;

    function getHome (cbSuccess, cbError) {
      if( !!CACHE.home ){
        cbSuccess(CACHE.home);
      }else{
        // load main content
        ArticleService.getArticleById(API.articleId.home, {
        'fields[]': ['id','abstract','body','categories','children','children_count','title','image','url']
        }, function (data){
          CACHE.home = data;

          _pipeHandleYoutube(data);
          _pipeHandleSlug(data);
          _pipeSetAbout(data);
          _pipeSetThemes(data);
          _pipeSetPrograms(data);

          cbSuccess(data);
        }, cbError);
      }
    }

    function getAbout (cbSuccess, cbError) {
      if( !!CACHE.about ){
        cbSuccess(CACHE.about);
      }else{
        // load article content
        ArticleService.getArticleById(API.articleId.about, {}, function (article){
          CACHE.about = article;

          cbSuccess(CACHE.about);
        }, cbError);
      }
    }

    function getThemes (cbSuccess, cbError) {
      if( !!CACHE.themes ){
        cbSuccess(CACHE.themes);
      }else{
        // load main content
        getHome(function(){
          if(!CACHE.hasOwnProperty('themes')){
            throw { name: 'NotFound', message: '"themes" is not defined. "article.categories" was loaded?'};
          }
          cbSuccess(CACHE.themes);
        },cbError);
      }
    }

    function getPrograms (cbSuccess, cbError) {
      if( !!CACHE.programs ){
        cbSuccess(CACHE.programs);
      }else{
        // load main content
        getHome(function(){
          if(!CACHE.hasOwnProperty('programs')){
            throw { name: 'NotFound', message: '"programs" is not defined. "article.children" was handled?'};
          }
          cbSuccess(CACHE.programs);
        },cbError);
      }
    }

    function getProgramBySlug (slug, cbSuccess, cbError) {
      
      if( !CACHE.programs ){
        getPrograms(_getProgramBySlug, cbError);
      } else {
       _getProgramBySlug(); 
      }

      function _getProgramBySlug(){
        var result = CACHE.programs.filter(function filterProgramBySlug (program) {
          if(angular.equals(program.slug, slug)) {
            return true;
          }
          return false;
        });

        cbSuccess(result[0]);
      }
    }

    function getProgramsRandom (cbSuccess, cbError) {
      getPrograms(cbSuccess, cbError);
      // TODO: get endpoint for production
      // if( !!CACHE.programsRandom ){
      //   cbSuccess(CACHE.programsRandom);
      // }else{
      //   // load article content
      //   // UtilService.get(API.random_topics, {params: {
      //   ArticleService.getArticleById(API.articleId.home, {params: {
      //     'fields[]': [
      //       'id', 'title', 'slug', 'abstract', 'children_count'],
      //     'content_type': 'ProposalsDiscussionPlugin::Topic'
      //   }}).then(function(data){
      //     CACHE.programsRandom = data;

      //     cbSuccess(data);
      //   }).catch(function(error){
      //     cbError(error);
      //   });
      // }
    }

    function getProposals (cbSuccess, cbError) {
      if( !!CACHE.proposals ){
        cbSuccess(CACHE.proposals);
      }else{
        // load main content
        getHome(function(){
          if(!CACHE.hasOwnProperty('proposals')){
            throw { name: 'NotFound', message: '"proposals" is not defined. "article.categories" was loaded?'};
          }
          cbSuccess(CACHE.proposals);
        },cbError);
      }
    }

    function getEvents (cbSuccess, cbError) {
      if( !!CACHE.events ){
        cbSuccess(CACHE.events);
      }else{
        // load main content
        getHome(function(){
          if(!CACHE.hasOwnProperty('events')){
            throw { name: 'NotFound', message: '"events" is not defined. "article.categories" was loaded?'};
          }
          cbSuccess(CACHE.events);
        },cbError);
      }
    }

    function getQuestions (cbSuccess/*, cbError*/) {
      if( !!CACHE.questions ){
        cbSuccess(CACHE.questions);
      }else{
        // load content
        var questions = [];

        CACHE.questions = questions;
        cbSuccess(CACHE.questions);
      }
    }

    function searchProgram (cbSuccess, cbError) {}

    function searchProposal (cbSuccess, cbError) {}

    function _pipeHandleYoutube (data) {
      var abstract = data.article.abstract;

      abstract = forceIframeParams(abstract);
      abstract = removeStylefromIframe(abstract);

      data.article.abstract = abstract;

      data.article.abstractTrusted = $sce.trustAsHtml(abstract);
    }

    function _pipeHandleSlug (data) {
      // set slug to article
      if(!data.article.slug){
        data.article.slug = Slug.slugify(data.article.title);
      }

      // set slug to programs
      for (var i = data.article.children.length - 1; i >= 0; i--) {
        var program = data.article.children[i];
        if(!program.slug){
          program.slug = Slug.slugify(program.title);
        }
      }
    }

    function _pipeSetAbout (data) {
      if(!CACHE.hasOwnProperty('about')){
        CACHE.about = data.article.body;
      }
    }

    function _pipeSetThemes (data) {
      if(!CACHE.hasOwnProperty('themes')){
        CACHE.themes = data.article.categories;
      }

      _pipeCalcColors(data);
    }

    function _pipeSetPrograms (data) {
      if(!CACHE.hasOwnProperty('programs')){
        CACHE.programs = data.article.children;
        CACHE.programs_count = data.article.children_count;
      }
    }

    // Calculate color pallet
    function _pipeCalcColors (data) {
      // var darkFactor = 0.15;
      if(data.article.categories){
        // var categories = data.article.categories;

        // Handle Category Data

        // Handle Category Colors
        // for (var i = categories.length - 1; i >= 0; i--) {
        //   var category = categories[i];
        //   if(category.color && !category.bgColor){
        //     category.colorDarker = $window.ColorLuminance(category.color, 0.15);
        //   }
        // };
      }
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
  }
})();
