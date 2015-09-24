module.exports = function(){
  'use strict';

  describe('The common layout', function () {

    var page = require('./layout.po.js');

    describe('Accessibility (a11y) top bar', function(){
      it('should have a "skip-to-content" anchor', function() {
        expect(page.skipToContent.getText()).toEqual('Ir para o conteúdo 1');
      });
      it('should have a "skip-to-navigation" anchor', function() {
        expect(page.skipToNavigation.getText()).toEqual('Ir para o menu 2');
      });
      it('should have a "skip-to-search" anchor', function() {
        expect(page.skipToSearch.getText()).toEqual('Ir para a busca 3');
      });
      it('should have a "skip-to-footer" anchor', function() {
        expect(page.skipToFooter.getText()).toEqual('Ir para o rodapé 4');
      });

      it('should have a accessibility anchor', function() {
        expect(page.actionAccessibility.getText()).toEqual('Acessibilidade');
      });
      it('should have a adjust contrast anchor', function() {
        expect(page.actionContrast.getText()).toEqual('Alto Contraste');
      });
      it('should have a sitemap anchor', function() {
        expect(page.actionSitemap.getText()).toEqual('Mapa do Site');
      });
    });

    describe('Header', function(){
      it('should have a logo', function() {});
      it('should have a navigation', function() {});
      it('should have a social share area', function() {});
      it('should have a "CADASTRAR" anchor', function() {});
      it('should have a "ENTRAR" anchor', function() {});
      it('should have a "Veja mais" area', function() {});
      it('should have a valid ARIA', function() {});

      describe('Header / Navigation', function(){
        it('should have a "SOBRE" anchor', function() {});
        it('should have a "PROGRAMAS" anchor', function() {});
        it('should have a "PROPOSTAS" anchor', function() {});
        it('should have a "DÚVIDAS" anchor', function() {});
        it('should be condensed on mobile', function() {});
        it('should have a valid ARIA', function() {});
        // it('should have a "ENTRAR?" anchor on MOBILE?', function() {});
        // it('should have a "RANKING?" anchor on MOBILE?', function() {});
        // it('should have a "RESPOSTAS?" anchor on MOBILE?', function() {});
        // it('should have a "PARTICIPE?" anchor on MOBILE?', function() {});
      });

      describe('Header / Social Share', function(){
        it('should have a facebook share button', function() {});
        it('should have a twitter share button', function() {});
        it('should have a gplus share button', function() {});
        it('should have a whatsapp share button', function() {});
        it('should be condensed on mobile', function() {});
        it('should have a email share button', function() {});
        it('should have a valid ARIA', function() {});
        // what to do when on mobile?
        // too small on mobile? point issues
      });

      describe('Header / "Veja mais"', function(){
        it('should have a youtube link', function() {});
        // it('should have a flicker? link', function() {});
        it('should have a valid ARIA', function() {});
        // what to do when on mobile?
      });
    });

    describe('Footer', function(){
      it('should have a ?', function() {});
      it('should have a valid ARIA', function() {});
    });
  });
};
