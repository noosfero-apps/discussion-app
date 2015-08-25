module.exports = function(){
  'use strict';

  describe('The common layout', function () {

    describe('Accessibility (a11y) top bar', function(){
      it('should have a "skip-to-content" anchor', function() {
        expect(element(by.id('skip-to-content')).getText()).toEqual('Ir para o conteúdo 1');
      });
      it('should have a "skip-to-navigation" anchor', function() {
        expect(element(by.id('skip-to-navigation')).getText()).toEqual('Ir para o menu 2');
      });
      it('should have a "skip-to-search" anchor', function() {
        expect(element(by.id('skip-to-search')).getText()).toEqual('Ir para a busca 3');
      });
      it('should have a "skip-to-footer" anchor', function() {
        expect(element(by.id('skip-to-footer')).getText()).toEqual('Ir para o rodapé 4');
      });

      it('should have a accessibility anchor', function() {
        expect(element(by.id('siteaction-accessibility')).getText()).toEqual('Acessibilidade');
      });
      it('should have a adjust contrast anchor', function() {
        expect(element(by.id('siteaction-contraste')).getText()).toEqual('Alto Contraste');
      });
      it('should have a sitemap anchor', function() {
        expect(element(by.id('siteaction-mapadosite')).getText()).toEqual('Mapa do Site');
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
