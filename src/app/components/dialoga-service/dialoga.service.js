(function() {
  'use strict';

  angular
    .module('dialoga')
    .factory('DialogaService', DialogaService);

  /** @ngInject */
  function DialogaService($rootScope, API, ArticleService, UtilService, Slug, $log) {
    $log.debug('DialogaService');

    var service = {
      getInicio: getInicio,
      getSobre: getSobre,
      getTemas: getTemas,
      getProgramas: getProgramas,
      getPropostas: getPropostas,
      getDuvidas: getDuvidas,
      buscaPrograma: buscaPrograma,
      buscaProposta: buscaProposta,
    };

    var CACHE = {};

    return service;

    function getInicio (cbSuccess, cbError) {
      if(CACHE.hasOwnProperty('inicio')){
        cbSuccess(CACHE.inicio);
      }else{
        // load main content
        ArticleService.getArticleById(API.articleId.home, {
          fields: 'id,abstract,body,categories,children,children_count,title'
        }, function (article){
          CACHE.inicio = article;

          _pipeSetSobre(article);
          _pipeSetTemas(article);
          _pipeSetProgramas(article);

          cbSuccess(article);
        }, cbError);
      }
    }

    function getSobre (cbSuccess, cbError) {
      if(CACHE.hasOwnProperty('sobre')){
        cbSuccess(CACHE.sobre);
      }else{
        // load article content
        ArticleService.getArticleById(API.articleId.about, {}, function (article){
          CACHE.sobre = article;

          cbSuccess(CACHE.sobre);
        }, cbError);
      }
    }

    function getTemas (cbSuccess, cbError) {
      if(CACHE.hasOwnProperty('temas')){
        cbSuccess(CACHE.temas);
      }else{
        // load main content
        getInicio(function(){
          if(!CACHE.hasOwnProperty('temas')){
            throw { name: 'NotFound', message: '"temas" is not defined. "article.categories" was handled?'};
          }
          cbSuccess(CACHE.temas);
        },cbError);
      }
    }

    function getProgramas (cbSuccess, cbError) {
      if(CACHE.hasOwnProperty('programas')){
        cbSuccess(CACHE.programas);
      }else{
        // load main content
        getInicio(function(){
          if(!CACHE.hasOwnProperty('programas')){
            throw { name: 'NotFound', message: '"programas" is not defined. "article.children" was handled?'};
          }
          cbSuccess(CACHE.programas);
        },cbError);
      }
    }

    function getProgramasAleatorios (cbSuccess, cbError) {
      // load article content
      UtilService.get(API.random_topics, {params: {
        'fields[]': [
          'id', 'title', 'slug', 'abstract', 'body', 'categories', 'setting',
          'ranking_position', 'position', 'children_count', 'hits', 'votes_for',
          'votes_against', 'tag_list']
      }}).then(function(data){
        cbSuccess(data);
      }).catch(function(error){
        cbError(error);
      });
    }

    function getPropostas (cbSuccess, cbError) {
      if(CACHE.hasOwnProperty('propostas')){
        cbSuccess(CACHE.propostas);
      }else{
        // load main content
        getInicio(function(){
          if(!CACHE.hasOwnProperty('propostas')){
            throw { name: 'NotFound', message: '"propostas" is not defined. "article.categories" was handled?'};
          }
          cbSuccess(CACHE.propostas);
        },cbError);
      }
    }

    function getDuvidas (cbSuccess, cbError) {
      if(CACHE.hasOwnProperty('duvidas')){
        cbSuccess(CACHE.duvidas);
      }else{
        // load content
        var duvidas = [];

        CACHE.duvidas = duvidas;
        cbSuccess(CACHE.duvidas);
      }
    }

    function buscaPrograma (cbSuccess, cbError) {}

    function buscaProposta (cbSuccess, cbError) {}

    function _pipeSetSobre (article) {
      if(!CACHE.hasOwnProperty('sobre')){
        CACHE.sobre = article.body;
      }
    }

    function _pipeSetTemas (article) {
      if(!CACHE.hasOwnProperty('temas')){
        CACHE.temas = article.categories;
      }

      _pipeCalcColors(article);
    }

    function _pipeSetProgramas (article) {
      if(!CACHE.hasOwnProperty('programas')){
        CACHE.programas = article.children;
        CACHE.programas_count = article.children_count;
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
  }
})();
