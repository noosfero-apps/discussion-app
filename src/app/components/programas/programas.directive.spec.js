(function() {
  'use strict';

  describe('program directive', function() {
    var compile, scope, directiveElem;

    beforeEach(function(){
      module('dialoga');

      inject(function($compile, $rootScope){
        compile = $compile;
        scope = $rootScope.$new();
        // mock article
        scope.article = {};
      });

      directiveElem = getCompiledElement();
    });

    function getCompiledElement(){
      var element = compile(angular.element('<programa-list></programa-list>'))(scope);
      var compiledElement = compile(element)(scope);
      scope.$digest();
      return compiledElement;
    }

    it('ensure exist only one id "lista-de-programas"', function() {});

    it('should show default programs, one each category', function() {});

  });
})();
