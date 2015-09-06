(function() {
  'use strict';

  describe('topic directive', function() {
    var compile, scope, directiveElem;

    beforeEach(function(){
      module('dialoga');

      inject(function($compile, $rootScope){
        compile = $compile;
        scope = $rootScope.$new();
        // mock topics
        scope.topics = [];
      });

      directiveElem = getCompiledElement();
    });

    function getCompiledElement(){
      var element = compile(angular.element('<topic-list></topic-list>'))(scope);
      var compiledElement = compile(element)(scope);
      scope.$digest();
      return compiledElement;
    }

    // it('ensure exist only one id "topic-list"', function() {});

    // it('should show default topics, one each category', function() {});

  });
})();
