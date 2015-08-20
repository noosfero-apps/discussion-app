(function() {
  'use strict';

  describe('controllers', function(){

    beforeEach(module('dialoga'));

    it('should define more than 5 awesome things', inject(function($controller) {
      var vm = $controller('ArticlePageController');

      vm.init();
      expect(vm.page).toBeDefined();
    }));
  });
})();
