(function() {
  'use strict';

  describe('article services', function() {
    var ArticleService, httpBackend;

    beforeEach(module('dialoga'));

    beforeEach(inject(function(_ArticleService_, $httpBackend) {
      ArticleService = _ArticleService_;
      httpBackend = $httpBackend;
    }));

    it('should return the main article', function() {
      var url = 'http://login.dialoga.gov.br/api/v1/articles/103358?fields=id,children,categories,abstract,title,image,url,setting,position&private_token=null';
      httpBackend.whenGET(url).respond({
        'article':{'id':103358,'abstract':'\u003Cp style=\"text-align: center;\"\u003E\u003Ciframe src=\"https://www.youtube.com/embed/kpAdrO-emV0?rel=0\u0026amp;showinfo=0\u0026amp;iv_load_policy=3\u0026amp;controls=1\" style=\"max-width: 1000px; left: 5%;\" width=\"275\" height=\"200\"\u003E\u003C/iframe\u003E\u003C/p\u003E','title':'Dialoga Brasil','categories':[{'name':'Sa\u00fade','id':180,'slug':'saude','image':null},{'name':'Seguran\u00e7a P\u00fablica','id':182,'slug':'seguranca-publica','image':null},{'name':'Educa\u00e7\u00e3o','id':181,'slug':'educacao','image':null},{'name':'Redu\u00e7\u00e3o da Pobreza','id':183,'slug':'reducao-da-pobreza','image':null}],'image':null,'setting':{'custom_body_label':'Corpo','phase':'proposals','allow_topics':true,'moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Leandro Nunes dos Santos','moderate_proposals':true,'allow_members_to_edit':false},'position':null,'children':[{'id':103644,'abstract':'\u003Cp\u003EUm caminho de oportunidades com o Enem: Sisu, Prouni, Fies, Ci\u00eancia sem Fronteiras\u003C/p\u003E','title':'Ensino Superior','categories':[{'name':'Educa\u00e7\u00e3o','id':181,'slug':'educacao','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0128/enem.jpg'},'setting':{'color':'#cfe2f3','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':9},{'id':103673,'abstract':'\u003Cp\u003EA melhor escolha \u00e9 se informar.\u003C/p\u003E','title':'Incentivo ao Parto Normal','categories':[{'name':'Sa\u00fade','id':180,'slug':'saude','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0092/parto-normal.jpg'},'setting':{'color':'#ff0000','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':6},{'id':103397,'abstract':'\u003Cp\u003ERenda, inclus\u00e3o produtiva e acesso a servi\u00e7os.\u003C/p\u003E','title':'Brasil Sem Mis\u00e9ria','categories':[{'name':'Redu\u00e7\u00e3o da Pobreza','id':183,'slug':'reducao-da-pobreza','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0116/bsm_redim.jpg'},'setting':{'color':'','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':18},{'id':103379,'abstract':'\u003Cp\u003EResgate e atendimento 24 horas, sete dias da semana.\u003C/p\u003E','title':'SAMU 192 e UPAs','categories':[{'name':'Sa\u00fade','id':180,'slug':'saude','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0060/SAMU.jpg'},'setting':{'color':'#45818e','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':4},{'id':103521,'abstract':'\u003Cp\u003EMais atendimento nos munic\u00edpios, mais sa\u00fade para quem mais precisa.\u003C/p\u003E','title':'Mais M\u00e9dicos','categories':[{'name':'Sa\u00fade','id':180,'slug':'saude','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0025/Mais_M_dicos.jpg'},'setting':{'color':'#ffe599','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':1},{'id':103390,'abstract':'\u003Cp\u003EPreven\u00e7\u00e3o, tratamento e enfrentamento ao tr\u00e1fico.\u003C/p\u003E','title':'Crack, \u00e9 poss\u00edvel vencer!','categories':[{'name':'Seguran\u00e7a P\u00fablica','id':182,'slug':'seguranca-publica','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0104/crack.jpg'},'setting':{'color':'#00ff00','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':14},{'id':103592,'abstract':'\u003Cp\u003EGarantir acesso \u00e0 prote\u00e7\u00e3o social.\u003C/p\u003E','title':'Assist\u00eancia Social','categories':[{'name':'Redu\u00e7\u00e3o da Pobreza','id':183,'slug':'reducao-da-pobreza','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0122/assistencia_social.jpg'},'setting':{'color':'#a61c00','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':19},{'id':103426,'abstract':'\u003Cp\u003EDa sa\u00fade se cuida todos os dias.\u003C/p\u003E','title':'Vida saud\u00e1vel','categories':[{'name':'Sa\u00fade','id':180,'slug':'saude','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0046/vida_saudavel.jpg'},'setting':{'color':'#d9d2e9','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':7},{'id':103695,'abstract':'\u003Cp\u003ENovo modelo de atua\u00e7\u00e3o em Seguran\u00e7a P\u00fablica.\u003C/p\u003E','title':'Seguran\u00e7a P\u00fablica Integrada','categories':[{'name':'Seguran\u00e7a P\u00fablica','id':182,'slug':'seguranca-publica','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0152/policiaintegrada.jpg'},'setting':{'color':'#ff00ff','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':13},{'id':103663,'abstract':'\u003Cp\u003EMais educa\u00e7\u00e3o profissional e tecnol\u00f3gica, mais desenvolvimento\u003C/p\u003E','title':'Ensino T\u00e9cnico','categories':[{'name':'Educa\u00e7\u00e3o','id':181,'slug':'educacao','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0134/Ensino_tecnico.jpg'},'setting':{'color':'#d0e0e3','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':10},{'id':103472,'abstract':'\u003Cp\u003EPol\u00edcia Federal, Pol\u00edcia Rodovi\u00e1ria Federal e For\u00e7a Nacional de Seguran\u00e7a P\u00fablica.\u003C/p\u003E','title':'For\u00e7as Federais de Seguran\u00e7a','categories':[{'name':'Seguran\u00e7a P\u00fablica','id':182,'slug':'seguranca-publica','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0031/federais2.png'},'setting':{'color':'','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':16},{'id':103612,'abstract':'\u003Cp\u003EGarantir \u00e1gua para beber e produzir.\u003C/p\u003E','title':'Cisternas','categories':[{'name':'Redu\u00e7\u00e3o da Pobreza','id':183,'slug':'reducao-da-pobreza','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0039/cisterna_redim.jpg'},'setting':{'color':'#0000ff','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':20},{'id':103442,'abstract':'\u003Cp\u003EComplemento \u00e0 renda e acompanhamento em educa\u00e7\u00e3o e sa\u00fade.\u003C/p\u003E','title':'Bolsa Fam\u00edlia','categories':[{'name':'Redu\u00e7\u00e3o da Pobreza','id':183,'slug':'reducao-da-pobreza','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0013/bolsa_familia_redim.jpg'},'setting':{'color':'#ff9900','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':17},{'id':103507,'abstract':'\u003Cp\u003ETecnologia a servi\u00e7o da seguran\u00e7a do cidad\u00e3o.\u003C/p\u003E','title':'Sinesp','categories':[{'name':'Seguran\u00e7a P\u00fablica','id':182,'slug':'seguranca-publica','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0098/sinesp.png'},'setting':{'color':'#00ff00','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':12},{'id':103683,'abstract':'\u003Cp\u003ESa\u00fade n\u00e3o tem pre\u00e7o.\u003C/p\u003E','title':'Aqui tem Farm\u00e1cia Popular','categories':[{'name':'Sa\u00fade','id':180,'slug':'saude','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0019/saude_nao_tem_preco.jpg'},'setting':{'color':'#e69138','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':5},{'id':103457,'abstract':'\u003Cp\u003EA\u00e7\u00e3o conjunta e coopera\u00e7\u00e3o transfronteiri\u00e7a.\u003C/p\u003E','title':'Prote\u00e7\u00e3o das Fronteiras','categories':[{'name':'Seguran\u00e7a P\u00fablica','id':182,'slug':'seguranca-publica','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0110/fronteira_redim.jpg'},'setting':{'color':'#a64d79','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':15},{'id':103494,'abstract':'\u003Cp\u003EDa Educa\u00e7\u00e3o Infantil ao Ensino M\u00e9dio.\u003C/p\u003E','title':'Educa\u00e7\u00e3o B\u00e1sica','categories':[{'name':'Educa\u00e7\u00e3o','id':181,'slug':'educacao','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0076/Educa__o_B_sica.jpg'},'setting':{'color':'#fce5cd','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':8},{'id':103359,'abstract':'\u003Cp\u003EAcesso a exames e consultas com especialistas.\u003C/p\u003E','title':'Mais Especialidades','categories':[{'name':'Sa\u00fade','id':180,'slug':'saude','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0083/mais_especialidades1.png'},'setting':{'color':'#ea9999','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':2},{'id':103485,'abstract':'\u003Cp\u003ECaminho para uma educa\u00e7\u00e3o de qualidade.\u003C/p\u003E','title':'Valoriza\u00e7\u00e3o dos Professores','categories':[{'name':'Educa\u00e7\u00e3o','id':181,'slug':'educacao','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0140/valorizacao_professor.jpg'},'setting':{'color':'#ffff00','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':11},{'id':103416,'abstract':'\u003Cp\u003EEstrutura adequada para atender melhor a popula\u00e7\u00e3o na aten\u00e7\u00e3o b\u00e1sica.\u003C/p\u003E','title':'Melhorar os Postos de Sa\u00fade','categories':[{'name':'Sa\u00fade','id':180,'slug':'saude','image':null}],'image':{'url':'/image_uploads/dialoga/0000/0053/requalif_redim.jpg'},'setting':{'color':'#cc4125','moderate_comments':false,'comment_paragraph_plugin_activate':false,'author_name':'Ronald Emerson Scherolt da Costa','allow_members_to_edit':false},'position':3}]}});

      ArticleService.getHome().then(function(result) {

        expect(result.article).toBeDefined();
        expect(result.article.title).toEqual('Dialoga Brasil');

      });

      httpBackend.flush();
    });

    // it('should return a list of articles', function() {

    //   httpBackend.whenGET('http://login.dialoga.gov.br/api/v1/articles').respond({
    //     "articles": [
    //     {
    //       abstract: "Que exista educação continuada permanente dos profissionais!!",
    //       author: null,
    //       body: "",
    //       categories: [],
    //       children: [],
    //       created_at: "2015/08/04 16:36:13",
    //       end_date: null,
    //       hits: 0,
    //       id: 120568,
    //       image: null,
    //       parent: {id: 103379,…},
    //       position: null,
    //       profile: {identifier: "dialoga", name: "dialoga", id: 19195, created_at: "2015/04/15 09:38:36", image: null},
    //       setting: {comment_paragraph_plugin_activate: false, author_name: "estacio"},
    //       start_date: null,
    //       tag_list: [],
    //       title: "article_f4f4601c-0f36-e90e-d01a-9871f0bd126b",
    //       votes_against: 0,
    //       votes_for: 0,
    //     }
    //     ]
    //   });

    //   ArticleService.getList().then(function(result) {
    //     console.log('result', result);

    //     expect(result.data.article).toBeDefined();
    //     expect(result.data.article.title).toEqual('Dialoga Brasil');

    //   });

    //   httpBackend.flush();
    // });
  });
})();
