/**
 * Use https://github.com/typicode/json-server for fake endpoint server.
 * Example: $ json-server data.js -p 9000 -w data.js
 */
module.exports = function () {
  'use strict';
  var data = {};

  // add /api/v1/articles path
  // data.api = {};
  // data.api.v1 = {};
  // data.api.v1.articles = [];

  // add data to articles path
  // data.api.v1.articles.push({
  data.articles = [];

  // json get from hom on 26/08/2015
  var articleHome = {
    id: 103358,
    "article":{
      "id": 103358,
      "abstract": "<p style=\"text-align: center;\"><iframe src=\"https://www.youtube.com/embed/kpAdrO-emV0?rel=0&amp;showinfo=0&amp;iv_load_policy=3&amp;controls=1\" style=\"max-width: 1000px; left: 5%;\" width=\"275\" height=\"200\"></iframe></p>",

      "title": "Dialoga Brasil",
      "categories": [
        {
          "name": "Saúde",
          "id": 180,
          "slug": "saude",
          "image": null
        }, {
          "name": "Segurança Pública",
          "id": 182,
          "slug": "seguranca-publica",
          "image": null
        }, {
          "name": "Educação",
          "id": 181,
          "slug": "educacao",
          "image": null
        }, {
          "name": "Redução da Pobreza",
          "id": 183,
          "slug": "reducao-da-pobreza",
          "image": null
        }, {
          "name": "Cultura",
          "id": 194,
          "slug": "cultura",
          "image": null
        }
      ],
      "image": null,
      "setting": {
        "custom_body_label": "Corpo",
        "phase": "proposals",
        "allow_topics": true,
        "moderate_comments": false,
        "comment_paragraph_plugin_activate": false,
        "author_name": "Leandro Nunes dos Santos",
        "moderate_proposals": true,
        "allow_members_to_edit": false
      },
      "position": null,
      "children": [
        {
          "id": 103390,
          "abstract": "<p>Prevenção, tratamento e enfrentamento ao tráfico.</p>",
          "title": "Crack, é possível vencer!",
          "categories": [
            {
              "name": "Segurança Pública",
              "id": 182,
              "slug": "seguranca-publica",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0104/crack.jpg"
          },
          "setting": {
            "color": "#00ff00",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 14
        }, {
          "id": 103521,
          "abstract": "<p>Mais atendimento nos municípios, mais saúde para quem mais precisa.</p>",
          "title": "Mais Médicos",
          "categories": [
            {
              "name": "Saúde",
              "id": 180,
              "slug": "saude",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0025/Mais_M_dicos.jpg"
          },
          "setting": {
            "color": "#ffe599",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 1
        }, {
          "id": 103457,
          "abstract": "<p>Ação conjunta e cooperação transfronteiriça.</p>",
          "title": "Proteção das Fronteiras",
          "categories": [
            {
              "name": "Segurança Pública",
              "id": 182,
              "slug": "seguranca-publica",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0110/fronteira_redim.jpg"
          },
          "setting": {
            "color": "#a64d79",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 15
        }, {
          "id": 103612,
          "abstract": "<p>Garantir água para beber e produzir.</p>",
          "title": "Cisternas",
          "categories": [
            {
              "name": "Redução da Pobreza",
              "id": 183,
              "slug": "reducao-da-pobreza",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0039/cisterna_redim.jpg"
          },
          "setting": {
            "color": "#0000ff",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 20
        }, {
          "id": 103442,
          "abstract": "<p>Complemento à renda e acompanhamento em educação e saúde.</p>",
          "title": "Bolsa Família",
          "categories": [
            {
              "name": "Redução da Pobreza",
              "id": 183,
              "slug": "reducao-da-pobreza",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0013/bolsa_familia_redim.jpg"
          },
          "setting": {
            "color": "#ff9900",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 17
        }, {
          "id": 103673,
          "abstract": "<p>A melhor escolha é se informar.</p>",
          "title": "Incentivo ao Parto Normal",
          "categories": [
            {
              "name": "Saúde",
              "id": 180,
              "slug": "saude",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0092/parto-normal.jpg"
          },
          "setting": {
            "color": "#ff0000",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 6
        }, {
          "id": 103397,
          "abstract": "<p>Renda, inclusão produtiva e acesso a serviços.</p>",
          "title": "Brasil Sem Miséria",
          "categories": [
            {
              "name": "Redução da Pobreza",
              "id": 183,
              "slug": "reducao-da-pobreza",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0116/bsm_redim.jpg"
          },
          "setting": {
            "color": "",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 18
        }, {
          "id": 121505,
          "abstract": "<p>Um novo jeito de ver e de fazer cultura</p>",
          "title": "Agenda Seculo XXI",
          "categories": [
            {
              "name": "Cultura",
              "id": 194,
              "slug": "cultura",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0166/Abertura_AGENDA_SECULO_XXI-v4.jpg"
          },
          "setting": {
            "color": "",
            "allow_members_to_edit": false,
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "leonardo.merlin"
          },
          "position": null
        }, {
          "id": 121526,
          "abstract": "<p>Cultura e arte como base para a educação integral</p>",
          "title": "Cultura e Educação",
          "categories": [
            {
              "name": "Cultura",
              "id": 194,
              "slug": "cultura",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0177/Abertura-cultura-e-educacao-v2.jpg"
          },
          "setting": {
            "color": "",
            "allow_members_to_edit": false,
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "leonardo.merlin"
          },
          "position": null
        }, {
          "id": 103485,
          "abstract": "<p>Caminho para uma educação de qualidade.</p>",
          "title": "Valorização dos Professores",
          "categories": [
            {
              "name": "Educação",
              "id": 181,
              "slug": "educacao",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0140/valorizacao_professor.jpg"
          },
          "setting": {
            "color": "#ffff00",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 11
        }, {
          "id": 103663,
          "abstract": "<p>Mais educação profissional e tecnológica, mais desenvolvimento</p>",
          "title": "Ensino Técnico",
          "categories": [
            {
              "name": "Educação",
              "id": 181,
              "slug": "educacao",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0134/Ensino_tecnico.jpg"
          },
          "setting": {
            "color": "#d0e0e3",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 10
        }, {
          "id": 121514,
          "abstract": "<p>Reconhecimento, fortalecimento e mobilização das comunidades que fazem cultura no Brasil</p>",
          "title": "Cultura Viva",
          "categories": [
            {
              "name": "Cultura",
              "id": 194,
              "slug": "cultura",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0167/Abertura_Cultura_Viva.jpg"
          },
          "setting": {
            "color": "",
            "allow_members_to_edit": false,
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "leonardo.merlin"
          },
          "position": null
        }, {
          "id": 103592,
          "abstract": "<p>Garantir acesso à proteção social.</p>",
          "title": "Assistência Social",
          "categories": [
            {
              "name": "Redução da Pobreza",
              "id": 183,
              "slug": "reducao-da-pobreza",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0122/assistencia_social.jpg"
          },
          "setting": {
            "color": "#a61c00",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 19
        }, {
          "id": 103426,
          "abstract": "<p>Da saúde se cuida todos os dias.</p>",
          "title": "Vida saudável",
          "categories": [
            {
              "name": "Saúde",
              "id": 180,
              "slug": "saude",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0046/vida_saudavel.jpg"
          },
          "setting": {
            "color": "#d9d2e9",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 7
        }, {
          "id": 103507,
          "abstract": "<p>Tecnologia a serviço da segurança do cidadão.</p>",
          "title": "Sinesp",
          "categories": [
            {
              "name": "Segurança Pública",
              "id": 182,
              "slug": "seguranca-publica",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0098/sinesp.png"
          },
          "setting": {
            "color": "#00ff00",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 12
        }, {
          "id": 103359,
          "abstract": "<p>Acesso a exames e consultas com especialistas.</p>",
          "title": "Mais Especialidades",
          "categories": [
            {
              "name": "Saúde",
              "id": 180,
              "slug": "saude",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0083/mais_especialidades1.png"
          },
          "setting": {
            "color": "#ea9999",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 2
        }, {
          "id": 103683,
          "abstract": "<p>Saúde não tem preço.</p>",
          "title": "Aqui tem Farmácia Popular",
          "categories": [
            {
              "name": "Saúde",
              "id": 180,
              "slug": "saude",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0019/saude_nao_tem_preco.jpg"
          },
          "setting": {
            "color": "#e69138",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 5
        }, {
          "id": 103695,
          "abstract": "<p>Novo modelo de atuação em Segurança Pública.</p>",
          "title": "Segurança Pública Integrada",
          "categories": [
            {
              "name": "Segurança Pública",
              "id": 182,
              "slug": "seguranca-publica",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0152/policiaintegrada.jpg"
          },
          "setting": {
            "color": "#ff00ff",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 13
        }, {
          "id": 103379,
          "abstract": "<p>Resgate e atendimento 24 horas, sete dias da semana.</p>",
          "title": "SAMU 192 e UPAs",
          "categories": [
            {
              "name": "Saúde",
              "id": 180,
              "slug": "saude",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0060/SAMU.jpg"
          },
          "setting": {
            "color": "#45818e",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 4
        }, {
          "id": 103494,
          "abstract": "<p>Da Educação Infantil ao Ensino Médio.</p>",
          "title": "Educação Básica",
          "categories": [
            {
              "name": "Educação",
              "id": 181,
              "slug": "educacao",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0076/Educa__o_B_sica.jpg"
          },
          "setting": {
            "color": "#fce5cd",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 8
        }, {
          "id": 103644,
          "abstract": "<p>Um caminho de oportunidades com o Enem: Sisu, Prouni, Fies, Ciência sem Fronteiras</p>",
          "title": "Ensino Superior",
          "categories": [
            {
              "name": "Educação",
              "id": 181,
              "slug": "educacao",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0128/enem.jpg"
          },
          "setting": {
            "color": "#cfe2f3",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 9
        }, {
          "id": 121499,
          "abstract": "<p>Valorização da arte e da cultura em suas múltiplas possibilidades</p>",
          "title": "Política Nacional das Artes",
          "categories": [
            {
              "name": "Cultura",
              "id": 194,
              "slug": "cultura",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0159/Banner_Pol_tica_Nacional_das_Artes.jpg"
          },
          "setting": {
            "color": "",
            "allow_members_to_edit": false,
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "leonardo.merlin"
          },
          "position": null
        }, {
          "id": 103472,
          "abstract": "<p>Polícia Federal, Polícia Rodoviária Federal e Força Nacional de Segurança Pública.</p>",
          "title": "Forças Federais de Segurança",
          "categories": [
            {
              "name": "Segurança Pública",
              "id": 182,
              "slug": "seguranca-publica",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0031/federais2.png"
          },
          "setting": {
            "color": "",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 16
        }, {
          "id": 121492,
          "abstract": "<p>Apoio ao audiovisual brasileiro: ampliação da produção, da difusão e do acesso</p>",
          "title": "Brasil de Todas as Telas",
          "categories": [
            {
              "name": "Cultura",
              "id": 194,
              "slug": "cultura",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0165/brasil-de-todas-telas-banner.jpg"
          },
          "setting": {
            "color": "",
            "allow_members_to_edit": false,
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "leonardo.merlin"
          },
          "position": null
        }, {
          "id": 121521,
          "abstract": "<p>Mais acesso a cultura para trabalhadores e trabalhadoras</p>",
          "title": "Vale-Cultura",
          "categories": [
            {
              "name": "Cultura",
              "id": 194,
              "slug": "cultura",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0175/Abertura_Vale_cultura-v3.jpg"
          },
          "setting": {
            "color": "",
            "allow_members_to_edit": false,
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "leonardo.merlin"
          },
          "position": null
        }, {
          "id": 103416,
          "abstract": "<p>Estrutura adequada para atender melhor a população na atenção básica.</p>",
          "title": "Melhorar os Postos de Saúde",
          "categories": [
            {
              "name": "Saúde",
              "id": 180,
              "slug": "saude",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0053/requalif_redim.jpg"
          },
          "setting": {
            "color": "#cc4125",
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "Ronald Emerson Scherolt da Costa",
            "allow_members_to_edit": false
          },
          "position": 3
        }, {
          "id": 121501,
          "abstract": "<p>Preservação do patrimônio e qualidade de vida para os cidadãos</p>",
          "title": "PAC Cidades Históricas",
          "categories": [
            {
              "name": "Cultura",
              "id": 194,
              "slug": "cultura",
              "image": null
            }
          ],
          "image": {
            "url": "/image_uploads/dialoga/0000/0168/Abertura__PAC_Cidades_Historicas-v3.JPG"
          },
          "setting": {
            "color": "",
            "allow_members_to_edit": false,
            "moderate_comments": false,
            "comment_paragraph_plugin_activate": false,
            "author_name": "leonardo.merlin"
          },
          "position": null
        }
      ]
    }
  };
  data.articles.push(articleHome);

  data.articles.push({
    "id":103521,
    "article":{"id":103521,"body":"\u003Cdiv class=\"container\"\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-12\"\u003E\r\n\u003Ch2\u003EMais M\u00e9dicos\u003Csmall\u003E Mais atendimento nos munic\u00edpios, mais sa\u00fade para quem mais precisa.\u003C/small\u003E\u003C/h2\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-6\"\u003E\u003Cimg class=\"center-block img-responsive\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/mais-medicos/imagens/mais-medicos-foto1.jpg\" alt=\"Foto colorida mostra um M\u00e9dico examinando uma menina. Ele est\u00e1 com uma lanterna na m\u00e3o e ela est\u00e1 com a l\u00edngua para fora.\" width=\"640\" height=\"373\" /\u003E\u003C/div\u003E\r\n\u003Cdiv class=\"col-md-6\"\u003E\r\n\u003Cp\u003EEste programa garante m\u00e9dicos nos postos de sa\u00fade de todo o Pa\u00eds. O\u00a0Mais M\u00e9dicos come\u00e7ou em 2013 e j\u00e1 mostra resultados positivos: \u00e9 muito bem avaliado por 95% dos usu\u00e1rios, segundo pesquisa feita pela UFMG / Ipespe, em 2014.\u003C/p\u003E\r\n\u003Cp\u003EO programa veio para enfrentar uma car\u00eancia hist\u00f3rica de m\u00e9dicos em muitos munic\u00edpios do Brasil. Antes do lan\u00e7amento do Mais M\u00e9dicos, 22 estados tinham um n\u00famero de m\u00e9dicos abaixo da m\u00e9dia nacional. Cinco desses estados tinham menos de 1 m\u00e9dico para cada mil habitantes.\u003C/p\u003E\r\n\u003Cp\u003EEntre 2013 e 2014, o governo federal selecionou e levou 14.462 m\u00e9dicos para 3.785 munic\u00edpios. Assim, garantiu atendimento para 50 milh\u00f5es de pessoas que precisavam se deslocar a outras cidades, nem sempre pr\u00f3ximas, para ter atendimento m\u00e9dico.\u003C/p\u003E\r\n\u003Cp\u003EEm 2015, chegamos a 18 mil vagas para m\u00e9dicos no programa. Beneficiamos 63 milh\u00f5es de pessoas, em mais de 4 mil munic\u00edpios. N\u00e3o h\u00e1 um \u00fanico munic\u00edpio brasileiro sem atendimento m\u00e9dico.\u003C/p\u003E\r\n\u003Cp\u003EOs m\u00e9dicos brasileiros se destacaram, em 2015: 92% dos m\u00e9dicos que aderiram ao programa s\u00e3o brasileiros.\u003C/p\u003E\r\n\u003Cp\u003ETodos os m\u00e9dicos rec\u00e9m-formados que participam do Mais M\u00e9dicos recebem um b\u00f4nus de 10% em sua nota na prova de resid\u00eancia, como incentivo a sua atua\u00e7\u00e3o nesta tarefa de levar atendimento \u00e0 sa\u00fade a nossa popula\u00e7\u00e3o.\u003C/p\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-12\"\u003E\r\n\u003Cdiv class=\"text-center\"\u003E\u003Cimg class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/mais-medicos/imagens/mais-medicos-foto2.jpg\" alt=\"Infogr\u00e1fico mostra a aceita\u00e7\u00e3o do Mais M\u00e9dico de 95% dos usu\u00e1rios.\" width=\"501\" height=\"135\" /\u003E\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"container\"\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-12\"\u003E\r\n\u003Ch3\u003EEvolu\u00e7\u00e3o do programa\u003C/h3\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-12\"\u003E\u003Cimg class=\"center-block img-responsive\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/mais-medicos/imagens/mais-medicos-foto3.jpg\" alt=\"Dois mapas do Brasil mostrando a evolu\u00e7\u00e3o do programa, um com o n\u00famero de m\u00e9dicos do programa em 2013 com 1.136 m\u00e9dicos e o outro em 2015 com 18.247 m\u00e9dicos.\" width=\"752\" height=\"548\" /\u003E\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"row bloco-destaque\"\u003E\r\n\u003Cdiv class=\"col-md-12\"\u003E\r\n\u003Ch4\u003EForam criadas 4.600 vagas de gradua\u00e7\u00e3o e 2.586 vagas de resid\u00eancia\u003C/h4\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-5 col-sm-5\"\u003E\r\n\u003Cp\u003EO Programa Mais M\u00e9dicos leva para o interior novas vagas em cursos de medicina, investindo na qualidade da forma\u00e7\u00e3o de m\u00e9dicos no Brasil e aumentando o n\u00famero de novos profissionais.\u003C/p\u003E\r\n\u003Cp\u003ES\u00e3o oferecidas, tamb\u00e9m, mais vagas de resid\u00eancia m\u00e9dica na rede de sa\u00fade, para formar especialistas que atendam \u00e0s necessidades de todas as regi\u00f5es do pa\u00eds.\u003Cimg class=\"center-block img-responsive\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/mais-medicos/imagens/mais-medicos-foto5.jpg\" alt=\"Gr\u00e1fico de barra, com duas colunas. Uma mostra o crescimento de bolsas em outras especialidades de sa\u00fade.  Em 2010 o n\u00famero de 499 e 2.875 em 2015. A outra barra mostra o crescimento de bolsas em resid\u00eancia. 788 vagas de resid\u00eancia em 2010 e 4.952 bolsas em 2015. Ao lado do gr\u00e1fico tem o texto : A cada ano, o Minist\u00e9rio da Sa\u00fade financia um n\u00famero maior de bolsas para forma\u00e7\u00e3o e especializa\u00e7\u00e3o. Ao lado foto mostra quatro m\u00e9dicos, duas mulheres e dois homens de jaleco branco e estetosc\u00f3pio no pesco\u00e7o e sorrindo.\" width=\"756\" height=\"397\" /\u003E\u003C/p\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-12\"\u003E\r\n\u003Ch3 class=\"titulo-destaque\"\u003EHoje, das 22.344 vagas em cursos de medicina, 52% est\u00e3o localizados no interior.\u003C/h3\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-12\"\u003E\u003Cimg class=\"center-block img-responsive\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/mais-medicos/imagens/maismedicos-graficointeriorv3.jpg\" alt=\"Gr\u00e1fico de linha mostra a evolu\u00e7\u00e3o no n\u00famero de vagas nos cursos de medicina. A linha cinza mostra que em 1994 tinha 4.884 vagas na capital e 10.637 vagas em 2015. A linha azul mostra 3.878 vagas no interior em 1994 e 14.522 em 2015\" width=\"748\" height=\"435\" /\u003E\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"container\"\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-12\"\u003E\r\n\u003Ch3\u003ECompromissos\u003C/h3\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-6 col-sm-6\"\u003E\u003Cimg class=\"center-block img-responsive\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/mais-medicos/imagens/mais-medicos-foto7.png\" alt=\"Foto mostra uma m\u00e3o de mulher segurando um Estetosc\u00f3pio com a sigla do SUS (Sistema \u00danico de Sa\u00fade).\" width=\"327\" height=\"327\" /\u003E\u003C/div\u003E\r\n\u003Cdiv class=\"col-md-6 col-sm-6\"\u003E\r\n\u003Cul class=\"list-unstyled\"\u003E\r\n\u003Cli\u003ELevar atendimento m\u00e9dico a 70 milh\u00f5es de pessoas at\u00e9 2018.\u003C/li\u003E\r\n\u003Cli\u003EAt\u00e9 2017, criar mais 6,8 mil novas vagas em faculdades de medicina, chegando a 11,5 mil.\u003C/li\u003E\r\n\u003Cli\u003EAt\u00e9 2018, criar mais 9,8 mil vagas de resid\u00eancia m\u00e9dica chegando a 12,4 mil.\u003C/li\u003E\r\n\u003C/ul\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E"}
  });
  data.articles.push({
    id: 103507,
    "article": {"id":103507,"body":"\u003Cdiv class=\"container\"\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-12\"\u003E\r\n\u003Ch2\u003ESINESP\u003Csmall\u003ETecnologia a servi\u00e7o da seguran\u00e7a do cidad\u00e3o.\u003C/small\u003E\u003C/h2\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"container\"\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-6 col-sm-6\"\u003E\u003Cimg class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/sinesp/imagens/grafico-sinesp-2.jpg\" alt=\"Infogr\u00e1fico com o mapa do Brasil ligado por pontilhados a um monitor com o texto: base de dados. Outro pontilhado liga o monitor a cinco pictogramas, o primeiro a figura de uma engrenagem com o texto: pain\u00e9is gerenciais; o segundo um gr\u00e1fico de barras com o texto: gr\u00e1ficos anal\u00edticos; o terceiro uma folha de papel com escrito e o texto: relat\u00f3rios; a quarta um mapa do Brasil com o texto: mapas estat\u00edsticos e o quinto com tr\u00eas pessoas e o texto: planos de a\u00e7\u00e3o. Ao lado desse infogr\u00e1fico o texto: Sinesp \u2013 Sistema Nacional de Informa\u00e7\u00f5es de Seguran\u00e7a P\u00fablica, Prisionais e sobre Drogas. Atendimentos a emerg\u00eancias municipais, estaduais e federais (190, 191, 192, 193 e 197). Dados centralizados e consolidados. Atualiza\u00e7\u00e3o em tempo real. Sincroniza\u00e7\u00e3o das bases. Boletins de ocorr\u00eancia. Inqu\u00e9ritos policiais civis estaduais e federais. \" width=\"784\" height=\"598\" /\u003E\u003C/div\u003E\r\n\u003Cdiv class=\"col-md-6 col-sm-6\"\u003E\r\n\u003Cp\u003EO \u003Cstrong\u003ESINESP - Sistema Nacional de Informa\u00e7\u00f5es de Seguran\u00e7a P\u00fablica, Prisionais e sobre Drogas\u003C/strong\u003E \u00e9 um servi\u00e7o in\u00e9dito no Brasil. Re\u00fane, sistematiza, analisa e coloca \u00e0 disposi\u00e7\u00e3o dos cidad\u00e3os informa\u00e7\u00f5es sobre seguran\u00e7a p\u00fablica, justi\u00e7a, drogas e sistema prisional.\u003C/p\u003E\r\n\u003Cp\u003EImplementado pelo governo federal, em parceria com os 26 estados e o Distrito Federal, o sistema est\u00e1 ajudando a \u003Cstrong\u003Emelhorar a qualidade dos servi\u00e7os prestados \u003C/strong\u003E pela seguran\u00e7a p\u00fablica.\u003C/p\u003E\r\n\u003Cp\u003EO SINESP ajuda gestores a planejar e executar a\u00e7\u00f5es integradas contra o crime e a viol\u00eancia. Al\u00e9m disso, d\u00e1 mais \u003Cstrong\u003Etranspar\u00eancia\u003C/strong\u003E aos \u00edndices de criminalidade para toda a sociedade, pois os relat\u00f3rios com todas as\u00a0 informa\u00e7\u00f5es dispon\u00edveis no SINESP podem ser lidos e consultados pela popula\u00e7\u00e3o via \u003Cem\u003Einternet\u003C/em\u003E.\u003C/p\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"container\"\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-6 col-sm-6\"\u003E\r\n\u003Ch3\u003ESINESP Cidad\u00e3o\u003C/h3\u003E\r\n\u003Cp\u003EDispon\u00edvel para qualquer pessoa, \u00e9 um aplicativo de consulta r\u00e1pida via \u003Cem\u003Einternet \u003C/em\u003Eque oferece informa\u00e7\u00f5es sobre \u003Cstrong\u003Eve\u00edculos roubados ou furtados, pessoas desaparecidas ou com mandatos de pris\u00e3o expedidos contra elas.\u003C/strong\u003E\u003C/p\u003E\r\n\u003Cp\u003EA ferramenta pode ser acessada, \u003Cstrong\u003Egratuitamente\u003C/strong\u003E, pelo endere\u00e7o \u003Cstrong\u003Ewww.sinesp.gov.br\u003C/strong\u003E e nas lojas de aplicativos, tanto para IOS, Android e Windows Phone.\u003C/p\u003E\r\n\u003Cp\u003EEm breve, um novo m\u00f3dulo ser\u00e1 disponibilizado no aplicativo: a localiza\u00e7\u00e3o de unidades policiais pr\u00f3ximas do usu\u00e1rio.\u003C/p\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"col-md-6 col-sm-6\"\u003E\u003Cimg class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/sinesp/imagens/tecnologia-sinesp-imagem2.jpg\" alt=\"Foto mostra m\u00e3o de uma pessoa com celular na m\u00e3o acessando o aplicativo. Ao fundo carros passando na rua. \" width=\"326\" height=\"327\" /\u003E\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"container\"\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-12 col-sm-12\"\u003E\u003Cimg class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/sinesp/imagens/tecnologia-sinesp-imagem3.jpg\" alt=\"Tr\u00eas pictogramas um ao lado do outro. O primeiro uma nuvem com uma seta para baixo com o texto: mais de 4,5 milh\u00f5es de downloads. O segundo uma lupa e o texto: mais de 150 milh\u00f5es de consulta. E o terceiro um carro com o texto: mais de 100 mil ve\u00edculos recuperados. \" width=\"773\" height=\"176\" /\u003E\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E"}
  });
  data.articles.push({
    id: 121521,
    "article":{"id":121521,"body":"\u003Cdiv class=\"col-xs-12\"\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-12\"\u003E\r\n\u003Ch2\u003EVale-Cultura\u003Csmall\u003EMais acesso \u00e0 cultura para trabalhadores e trabalhadoras\u003C/small\u003E\u003C/h2\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-12\"\u003E\r\n\u003Ch3\u003ELivros, shows e espet\u00e1culos para todos.\u003C/h3\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-6 col-sm-6 vcenter\"\u003E\u003Cimg class=\"img-responsive\" src=\"http://gestao.dialoga.gov.br/dialoga/dialoga-brasil/vale-cultura/imagens/vale-cultura1.jpg\" alt=\"\" /\u003E\u003C/div\u003E\r\n\u003Cdiv class=\"col-md-6 col-sm-6 vcenter\"\u003E\r\n\u003Cp\u003EO Vale-Cultura incentiva as empresas a oferecer aos seus funcion\u00e1rios acesso a livros, revistas, ingressos para cinemas, teatros, shows, instrumentos musicais e cursos de arte e cultura.\u003C/p\u003E\r\n\u003Cp\u003EO benef\u00edcio \u00e9 garantido por meio de um cart\u00e3o magn\u00e9tico pr\u00e9-pago, v\u00e1lido em todo os pa\u00eds. Mensalmente, esse cart\u00e3o recebe cr\u00e9dito de R$ 50, que pode ser acumulado para despesas maiores.\u003C/p\u003E\r\n\u003Cp\u003EA ades\u00e3o das empresas \u00e9 facultativa e os custos s\u00e3o livres de encargos sociais e trabalhistas. Aquelas que t\u00eam lucro real podem deduzir at\u00e9 1% do Imposto de Renda devido.\u003C/p\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cbr /\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-6 col-sm-6 vcenter\"\u003E\r\n\u003Cblockquote\u003E\r\n\u003Cp class=\"text-center\"\u003EEm pouco mais de um ano, o Vale-Cultura j\u00e1 mobiliza mais de R$140 milh\u00f5es e beneficia cerca de 420 mil trabalhadores e trabalhadoras.\u003C/p\u003E\r\n\u003C/blockquote\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"col-md-6 col-sm-6 vcenter\"\u003E\r\n\u003Cdiv class=\"embed-responsive embed-responsive-16by9\"\u003E\u003Ciframe src=\"https://www.youtube.com/embed/KKmZh5T46g8?rel=0\" frameborder=\"0\" width=\"560\" height=\"315\"\u003E\u003C/iframe\u003E\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-12\"\u003E\r\n\u003Ch3\u003ECompromissos\u003C/h3\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003Cdiv class=\"row\"\u003E\r\n\u003Cdiv class=\"col-md-6 col-sm-6 vcenter\"\u003E\u003Cimg class=\"img-responsive\" src=\"http://gestao.dialoga.gov.br/dialoga/dialoga-brasil/vale-cultura/imagens/vale-cultura3.jpg\" alt=\"\" /\u003E\u003C/div\u003E\r\n\u003Cdiv class=\"col-md-6 col-sm-6 vcenter\"\u003E\r\n\u003Cul class=\"list-unstyled\"\u003E\r\n\u003Cli class=\"bullet\"\u003E\u003Cstrong\u003EAmpliar a ades\u00e3o de empresas e trabalhadores\u003C/strong\u003E\u003C/li\u003E\r\n\u003Cli class=\"bullet\"\u003E\u003Cstrong\u003EAmpliar a rede de estabelecimentos que recebem o Vale-Cultura.\u003C/strong\u003E\u003C/li\u003E\r\n\u003C/ul\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E\r\n\u003C/div\u003E"}
  });


  // Random topics / Programas aleatorios - 1 por tema
  // path: /api/v1/dialoga_plugin/random_topics/103358
  // Like: http://hom.dialoga.gov.br/api/v1/dialoga_plugin/random_topics/103358
  // ?fields[]=id&fields[]=title&fields[]=slug&fields[]=abstract&fields[]=body&fields[]=categories&fields[]=setting&fields[]=ranking_position&fields[]=position&fields[]=children_count&fields[]=hits&fields[]=votes_for&fields[]=votes_against&fields[]=tag_list
  data.dialoga_plugin = {
    "articles": [
      {
        "ranking_position": null,
        "id": 116089,
        "body": "<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h2>Cultura e Educação<small>Cultura e arte como base para a educação integral.</small></h2>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-12\"><img class=\"img-responsive center-block\" src=\"http://hom.gestao.dialoga.gov.br/dialoga/dialoga-brasil/cultura-e-educacao/imagens/cultura-educacao-imagem1.jpg\" alt=\"\" /></div>\r\n</div>\r\n<br />\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<p>A aproximação entre cultura e educação é estratégica para o desenvolvimento cultural do país e para a qualificação da educação brasileira.</p>\r\n<p> </p>\r\n<h3>Mais Cultura nas Escolas promove ensino com criatividade</h3>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-6 col-sm-6\">\r\n<p>É mais fácil aprender quando as abordagens pedagógicas são criativas e têm relação com a realidade cultural das crianças e jovens. Com o Mais Cultura nas Escolas, o ensino de crianças, adolescentes e jovens vincula-se às experiências culturais e artísticas das comunidades em que vivem.</p>\r\n<blockquote>\r\n<p class=\"text-center\">São priorizadas as escolas que têm maior número de estudantes beneficiários do Bolsa Família</p>\r\n</blockquote>\r\n<img class=\"img-responsive center-block\" style=\"width: 100%;\" src=\"http://hom.gestao.dialoga.gov.br/dialoga/dialoga-brasil/cultura-e-educacao/imagens/cultura-educacao-imagem3.jpg\" alt=\"Imagem de Vídeo\" /></div>\r\n<div class=\"col-md-6 col-sm-6\"><img class=\"img-responsive center-block\" src=\"http://hom.gestao.dialoga.gov.br/dialoga/dialoga-brasil/cultura-e-educacao/imagens/cultura-educacao-imagem2.jpg\" alt=\"Conexão Felipe Camarão\" /> <br /> <img class=\"img-responsive center-block\" src=\"http://hom.gestao.dialoga.gov.br/dialoga/dialoga-brasil/cultura-e-educacao/imagens/cultura-educacao-imagem4.jpg\" alt=\"Programa mais cultura nas escolas\" /></div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>União dos saberes científicos e populares</h3>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-4 col-sm-4\"><img class=\"img-responsive center-block\" src=\"http://hom.gestao.dialoga.gov.br/dialoga/dialoga-brasil/cultura-e-educacao/imagens/cultura-educacao-imagem5.jpg\" alt=\"\" /></div>\r\n<div class=\"col-md-8 col-sm-8\">\r\n<p>O Programa Mais Cultura nas Universidades utiliza os <em>campi</em> e os institutos federais de ensino como centros irradiadores de produção artística e cultural para as comunidades. São realizadas ações de extensão, pesquisa e inovação em conjunto com grupos artísticos locais.</p>\r\n<p>Um total de 28 universidades e institutos federais foram apoiados diretamente pelo programa e outras 73 instituições federais já apresentaram planos de cultura.</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>Pronatec Cultura fomenta a economia e amplia a renda</h3>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-6 col-sm-6\">\r\n<p>O Pronatec Cultura oferece qualificação profissional que fortalece as cadeias produtivas da cultura, promovendo a formalização do setor, inclusão profissional e aumento da renda.</p>\r\n<p>Está presente em 228 municípios de 19 estados brasileiros, com 7.702 pessoas formadas até o primeiro semestre de 2015.</p>\r\n<blockquote>\r\n<p class=\"text-center\">São 65 cursos de formação como fotógrafo, vitrinista, iluminador cênico, sonoplasta, ilustrador e assistente de produção, ofertados pelos Institutos Federais, Sistema S e escolas profissionalizantes</p>\r\n</blockquote>\r\n</div>\r\n<div class=\"col-md-6 col-sm-6\"><img class=\"img-responsive center-block\" src=\"http://hom.gestao.dialoga.gov.br/dialoga/dialoga-brasil/cultura-e-educacao/imagens/cultura-educacao-imagem6.jpg\" alt=\"\" /></div>\r\n</div>\r\n</div>",
        "abstract": "<p>Cultura e arte como base para a educação integral</p>",
        "title": "Cultura e Educação",
        "categories": [
          {
            "name": "Cultura",
            "id": 194,
            "slug": "cultura"
          }
        ],
        "votes_for": 0,
        "votes_against": 0,
        "setting": {
          "color": "",
          "allow_members_to_edit": false,
          "moderate_comments": false,
          "comment_paragraph_plugin_activate": false,
          "author_name": "Admin DEDES"
        },
        "position": null,
        "hits": 17,
        "tag_list": [],
        "children_count": 2,
        "slug": "cultura-e-educacao"
      }, {
        "ranking_position": null,
        "id": 103644,
        "body": "<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h2>Ensino Superior<small>Um caminho de oportunidades com o Enem: Sisu, Prouni, Fies, Ciência sem Fronteiras</small></h2>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>Enem - Exame Nacional do Ensino Médio</h3>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-6 col-sm-6\">\r\n<p>O Exame Nacional do Ensino Médio (Enem) abre portas para que todos os brasileiros trilhem, em igualdade de condições e de acordo com seus méritos como estudantes, um <strong>caminho de oportunidades</strong> por meio dos ensinos técnico e superior.</p>\r\n<br />\r\n<h4>Cada vez mais estudantes realizam o Enem</h4>\r\n<p>Na edição de 2014, o Enem teve quase <strong>9 milhões de inscritos e se consolidou como o maior exame deste tipo no Brasil e o segundo maior no mundo.</strong></p>\r\n<blockquote>\r\n<p class=\"text-center\">Com o Enem, várias possibilidades se abrem para o estudante, de acordo com o seu desempenho nos exames.</p>\r\n</blockquote>\r\n</div>\r\n<div class=\"col-md-6 col-sm-6\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/ensino-superior/imagens/foto-1.jpg\" alt=\"\" width=\"375\" height=\"417\" /></div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/ensino-superior/imagens/infografico-1.jpg\" alt=\"\" width=\"305\" height=\"269\" /></div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>SISU - Sistema de Seleção Unificada</h3>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<p>Em outros tempos, o jovem que quisesse ingressar no ensino superior fazia inscrição no vestibular para um único curso de uma única universidade. Apenas estudantes com melhores condições financeiras podiam se inscrever em mais instituições e em diferentes locais do país.</p>\r\n<p>Hoje, com o SISU, a realidade é outra. O jovem, independentemente de sua condição social, usando a nota de um único exame – o Enem, feito em um único local e em uma mesma data, tem direito de disputar <strong>milhares de vagas, em vários cursos</strong> das melhores Instituições públicas e privadas de ensino superior, de todo o país.</p>\r\n<p>Durante o período de inscrição, o aluno pode acompanhar diariamente, pela internet, como está a procura pelos cursos do seu interesse, para alinhar suas escolhas e seus planos de estudo com a nota que obteve no Enem.</p>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-12\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/ensino-superior/imagens/infografico-2.jpg\" alt=\"\" width=\"546\" height=\"293\" /></div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>PROUNI: Universidade para Todos</h3>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-6 col-sm-6\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/ensino-superior/imagens/enem-imagem4.jpg\" alt=\"\" /></div>\r\n<div class=\"col-md-6 col-sm-6\">\r\n<p>O Programa Universidade para Todos (Prouni) foi criado em 2004 para ampliar e democratizar o acesso de estudantes de baixa renda ao ensino superior no Brasil.</p>\r\n<p>O Prouni concede bolsas integrais e parciais de 50% em instituições privadas de ensino superior para estudantes que ainda não têm um diploma de nível superior. O programa já totaliza mais de 1,69 milhão de bolsas concedidas, desde a sua criação, em 2004.</p>\r\n<p>Para concorrer a uma das bolsas, o aluno tem que ter no mínimo 450 pontos no Enem, não ter tirado zero na redação, ter cursado todo o ensino médio em escola pública ou como bolsista integral em escola particular. A renda bruta da família também é considerada no acesso às bolsas: deve ser menor que 1 ½ salário mínimo por pessoa para bolsa integral e menor que 3 salários mínimos por pessoa para bolsa de 50%.</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>FIES: Fundo de Financiamento Estudantil para acesso ao ensino superior</h3>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-6 col-sm-6\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/ensino-superior/imagens//infografico-3.jpg\" alt=\"\" width=\"281\" height=\"234\" /></div>\r\n<div class=\"col-md-6 col-sm-6\">\r\n<p>Com quase 2 milhões de contratos firmados e 1.770 instituições participantes, o Fies se tornou um importante instrumento para quem pretende ingressar em uma instituição privada de ensino superior.</p>\r\n<p>As adequações pelas quais o Fies está passando garantem a sua sustentabilidade, asseguram a qualidade dos cursos financiados e beneficiam diretamente o estudante que realmente precisa do financiamento. Nenhum estudante que participa do Fies deixará de receber o benefício e o governo vai zelar pelo bom funcionamento do programa.</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>SISUTEC: mais opções para crescer</h3>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<p>Criado em 2013, o Sistema de Seleção Unificada da Educação Profissional e Tecnológica é mais uma opção para o estudante que faz o Enem. O Sisutec faz parte do Programa Nacional de Acesso ao Ensino Técnico e Emprego (Pronatec) e oferece vagas gratuitas em cursos técnicos.</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>Ciência sem Fronteiras:<br />conhecimento avançado no exterior</h3>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-6 col-sm-6\">\r\n<p>O Ciência sem Fronteiras proporciona aos estudantes brasileiros de graduação e de pós-graduação oportunidades de intercâmbio internacional, para estudar e pesquisar nas melhores universidades do mundo.</p>\r\n<p>Podem participar alunos de instituições públicas ou particulares de todo o país em áreas essenciais para o  desenvolvimento científico e tecnológico.</p>\r\n<p>Na primeira fase do programa, mais de 100 mil estudantes se beneficiaram dessa importante oportunidade. Em breve novos editais serão publicados, com a abertura de novas vagas.</p>\r\n</div>\r\n<div class=\"col-md-6 col-sm-6\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/ensino-superior/imagens/infografico-4.jpg\" alt=\"\" width=\"226\" height=\"191\" /></div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>Lei das Cotas</h3>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<p>Todas as universidades públicas federais e os institutos federais de tecnologia reservam uma parte das suas vagas para alunos que estudaram em escolas públicas. Desde 2012, as cotas estão sendo implantadas gradualmente, até atingir, em 2016, a metade das vagas existentes.</p>\r\n<p>Das vagas reservadas para egressos de escolas públicas, metade é destinada a estudantes de famílias com renda mensal de até um salario mínimo e meio.</p>\r\n<p>O preenchimento destas vagas também leva em conta critérios de cor ou raça de acordo com as estatísticas do IBGE para cada estado.</p>\r\n<p>Após dois anos da implantação de Lei das Cotas (Lei nº 12.711, de 29 de agosto de 2012), em 2014, todos os institutos federais atenderam ao percentual mínimo de 25%, previsto para aquele ano; 85% atingiram a meta de 2015; 78% já atingiram a meta prevista para 2016 - 50% das vagas.</p>\r\n<p>No caso das Universidades Federais, todas atenderam, em 2014, ao percentual mínimo previsto de 25%; 64% atingiram antecipadamente a meta de 2015; 56% atingiram, com antecedência, a meta prevista para 2016.</p>\r\n<p>Em 2014, nos institutos federais, 23% das vagas foram reservadas para pretos, pardos e indígenas e, nas Universidades Federais, foram 20%.</p>\r\n</div>\r\n<div class=\"col-md-12\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/ensino-superior/imagens/infografico-5.jpg\" alt=\"\" width=\"749\" height=\"223\" /></div>\r\n</div>\r\n</div>",
        "abstract": "<p>Um caminho de oportunidades com o Enem: Sisu, Prouni, Fies, Ciência sem Fronteiras</p>",
        "title": "Ensino Superior",
        "categories": [
          {
            "name": "Educação",
            "id": 181,
            "slug": "educacao"
          }
        ],
        "votes_for": 0,
        "votes_against": 0,
        "setting": {
          "color": "#cfe2f3",
          "moderate_comments": false,
          "comment_paragraph_plugin_activate": false,
          "author_name": "Ronald Emerson Scherolt da Costa",
          "allow_members_to_edit": false
        },
        "position": 9,
        "hits": 54,
        "tag_list": [],
        "children_count": 7,
        "slug": "ensino-superior"
      }, {
        "ranking_position": null,
        "id": 103442,
        "body": "<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h2>Bolsa Família <small>Complemento à renda e acompanhamento em educação e saúde.</small></h2>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-12\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/bolsa-familia/imagens/educacao-bolsa-familia-imagem1.png\" alt=\"\" width=\"748\" height=\"280\" /></div>\r\n<div class=\"col-md-12\"><br />\r\n<p>O Bolsa Família é um programa que complementa mensalmente a renda de 14 milhões de famílias pobres, garante que crianças e adolescentes permaneçam na escola e acompanha a saúde de crianças, de mulheres grávidas e daquelas que estão amamentando.</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-6 col-sm-6\">\r\n<h3>Educação no Bolsa Família</h3>\r\n<p>Na educação, o Bolsa Família faz o acompanhamento mensal da frequência escolar de 17 milhões de crianças e adolescentes de famílias de baixa renda. Também ajuda a identificar dificuldades de acesso e de permanência dos estudantes na escola.</p>\r\n</div>\r\n<div class=\"col-md-6 col-sm-6\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/bolsa-familia/imagens/educacao-bolsa-familia-imagem2.jpg\" alt=\"\" /></div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/bolsa-familia/imagens/educacao-bolsa-familia-imagem3.png\" alt=\"\" /></div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-6 col-sm-6\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/bolsa-familia/imagens/educacao-bolsa-familia-imagem4.png\" alt=\"\" /></div>\r\n<div class=\"col-md-6 col-sm-6\">\r\n<h3>Saúde no Bolsa Família</h3>\r\n<p>Na saúde, o Programa monitora a vacinação, o peso e a altura das crianças com menos de 7 anos. Também faz o acompanhamento do pré-natal das gestantes e orienta as mulheres em fase de amamentação.</p>\r\n<p>Mais de 9 milhões de famílias são atendidas na área da saúde pelo Bolsa Família e os efeitos do acompanhamento são percebidos na vida das pessoas, na comprovada redução da mortalidade infantil e no crescimento saudável das crianças.</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-6 col-sm-6\">\r\n<h3>Redução de quase 1 cm do déficit de altura das crianças de 5 anos do Bolsa Família</h3>\r\n<img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/bolsa-familia/imagens/educacao-bolsa-familia-imagem5.jpg\" alt=\"\" /></div>\r\n<div class=\"col-md-6 col-sm-6\"> </div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12 col-sm-12\">\r\n<h3>As crianças estão mais saudáveis e altas</h3>\r\n<p>Com a redução da desnutrição crônica, o déficit de estatura entre as crianças do Bolsa Família diminui 51%, o equivalente a quase 1 centímetro. A queda foi verificada em pesquisa que acompanhou 360 mil crianças beneficiadas ao longo de cinco anos seguidos, em que foram medidas e pesadas.</p>\r\n<p> </p>\r\n<h3>Cadastro Único para acessar políticas públicas</h3>\r\n</div>\r\n<div class=\"col-md-12 col-sm-12\">\r\n<p>Para participar do Programa, a família faz um cadastro com informações sobre moradia, renda, escolaridade e condições de vida. Este é o Cadastro Único para Programas Sociais do Governo Federal, um mapa social que permite aos governos planejarem suas ações, a partir da identificação das necessidades básicas das famílias.</p>\r\n<p>A orientação e o encaminhamento das famílias são feitos pela rede de assistência social para que os beneficiários do Bolsa Família acessem também outros programas como o <strong>Pronatec, o </strong><strong>Luz para Todos e o</strong><strong> Minha Casa</strong>, <strong>Minha Vida</strong>.</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12 col-sm-12\">\r\n<h3>Quem recebe o Bolsa Família</h3>\r\n</div>\r\n<div class=\"col-md-12 col-sm-12\">\r\n<p>Podem participar as famílias registradas no Cadastro Único, desde que:</p>\r\n<ul class=\"list-styled\">\r\n<li>Com renda mensal, por pessoa, de até R$ 77, mesmo que não tenham gestantes, crianças ou adolescentes;</li>\r\n<li>Com renda mensal, por pessoa, de até R$ 154, que tenham gestantes, crianças ou adolescentes na família.</li>\r\n</ul>\r\n<p>O valor repassado depende do <strong>tamanho da família</strong>, da <strong>idade dos seus membros</strong> e da sua <strong>renda</strong>. Há benefícios específicos para famílias com crianças, jovens até 17 anos, gestantes e mães que amamentam.</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12 col-sm-12\">\r\n<h3>Você sabia?</h3>\r\n</div>\r\n<div class=\"col-md-12 col-sm-12\">\r\n<ul class=\"list-styled \">\r\n<li><strong>O valor médio pago aos beneficiários do Bolsa Família é de R$ 168,00 mensais.</strong></li>\r\n<li><strong>As famílias que participam do Programa têm, em média, 2 filhos.</strong></li>\r\n</ul>\r\n</div>\r\n<div class=\"col-md-12 col-sm-12\">\r\n<blockquote class=\"text-center\">\r\n<p>Em 11 anos, 3,1 milhões de famílias saíram voluntariamente do programa Bolsa Família.</p>\r\n</blockquote>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-6 col-sm-6\"><img class=\"img-responsive center-clock\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/bolsa-familia/imagens/educacao-bolsa-familia-imagem7.jpg\" alt=\"\" /></div>\r\n<div class=\"col-md-6 col-sm-6\">\r\n<h3>Trabalho no Bolsa Família</h3>\r\n<p>Os beneficiários do Bolsa Família trabalham e trabalham muito.</p>\r\n<p>A participação dos adultos beneficiários no mercado de trabalho formal e informal é igual à dos demais brasileiros.</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12 col-sm-12\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/bolsa-familia/imagens/educacao-bolsa-familia-imagem8.jpg\" alt=\"\" /></div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>Controle e transparência</h3>\r\n<p>O governo está atento para que o benefício só chegue a quem realmente precisa. Há um trabalho contínuo e rigoroso para garantir o controle e a transparência do Programa Bolsa Família e o registro de irregularidades é muito baixo.</p>\r\n<ul class=\"list-styled \">\r\n<li>A lista dos beneficiários com o valor do benefício que recebem é mantida pública, no Portal da Transparência;</li>\r\n<li>Todos os beneficiários têm que atualizar o seu cadastro a cada dois anos;</li>\r\n<li>O governo realiza cruzamentos do Cadastro Único com outras bases de dados, rotineiramente.</li>\r\n</ul>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>Acompanhe</h3>\r\n<p>Todo cidadão tem o direito de saber como o governo utiliza os recursos públicos. Para o Bolsa Família, existe um canal direto e gratuito para que qualquer pessoa possa obter informações ou fazer sugestões, reclamações e denúncias: <strong>0800 707 2003</strong>.</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>A renda do Bolsa Família fortalece a economia local e o desenvolvimento do País</h3>\r\n</div>\r\n<div class=\"col-md-6 col-sm-6\">\r\n<p><strong>Com o Bolsa Família</strong> todos ganham. O programa beneficia diretamente mais de 50 milhões de pessoas pobres, mas seus resultados vão além do combate à pobreza.</p>\r\n<p>O dinheiro repassado para as famílias beneficiadas fica no município, circula na economia local e gera mais trabalho e renda para outras pessoas, contribuindo para o desenvolvimento do País.</p>\r\n</div>\r\n<div class=\"col-md-6 col-sm-6\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/bolsa-familia/imagens/educacao-bolsa-familia-imagem10.jpg\" alt=\"\" /></div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<p>O Bolsa Família faz tanto pelo Brasil que todos os brasileiros acabam sendo beneficiados por ele, direta ou indiretamente, com a movimentação da economia e com a inclusão social..</p>\r\n</div>\r\n</div>\r\n</div>",
        "abstract": "<p>Complemento à renda e acompanhamento em educação e saúde.</p>",
        "title": "Bolsa Família",
        "categories": [
          {
            "name": "Redução da Pobreza",
            "id": 183,
            "slug": "reducao-da-pobreza"
          }
        ],
        "votes_for": 0,
        "votes_against": 0,
        "setting": {
          "color": "#ff9900",
          "moderate_comments": false,
          "comment_paragraph_plugin_activate": false,
          "author_name": "Ronald Emerson Scherolt da Costa",
          "allow_members_to_edit": false
        },
        "position": 17,
        "hits": 68,
        "tag_list": [],
        "children_count": 9,
        "slug": "bolsa-familia"
      }, {
        "ranking_position": null,
        "id": 103379,
        "body": "<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h2>SAMU 192 e UPAs <small>Resgate e atendimento 24 horas, sete dias por semana.</small></h2>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<p class=\"text-center\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/urgencia-e-emergencia/imagens/img-destaque-1.jpg\" alt=\"Ambulancha e SAMU 192\" /></p>\r\n<p>O SAMU 192 foi criado em 2003 e chega a 75% da população brasileira, garantindo socorro e transporte de emergência. São 3.300 ambulâncias (vans, motos, lanchas e helicópteros).</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>SAMU 192 já chega a 153,9 milhões de pessoas</h3>\r\n<p class=\"text-center\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/samu-192-e-upas/imagens/grafico-1.jpg\" alt=\"Em 2005 o SAMU chegou à 60 milhões de pessoas. Em 2015 o SAMU chegou à 153,9 milhões de pessoas.\" width=\"725\" height=\"138\" /></p>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>UPA - Unidades de Pronto Atendimento</h3>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-6\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/urgencia-e-emergencia/imagens/img-destaque-2.jpg\" alt=\"UPA 24h\" width=\"374\" height=\"346\" /></div>\r\n<div class=\"col-md-6\">\r\n<p>As Unidades de Pronto Atendimento podem resolver 90% das urgências e emergências de atendimento à saúde, como fraturas, problemas de pressão, derrames e infartos.</p>\r\n<p>As UPAs fazem parte de uma rede de atendimento, complementando as emergências dos hospitais e a internação domiciliar. Assim, as UPAs ajudam a diminuir a demanda sobre os pronto-socorros dos hospitais, que devem receber e atender rapidamente os casos mais graves e que exigem imediata internação.</p>\r\n<blockquote>\r\n<p class=\"text-center\">Há 400 UPAs em funcionamento no Brasil.</p>\r\n</blockquote>\r\n<p>Os serviços de atendimento para urgências e emergências estão sendo integrados e ampliados.</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h3>Compromissos</h3>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-6\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/samu-192-e-upas/imagens/grafico-2.jpg\" alt=\"Imagem da rede de atenção as urgências e emergências. Posto de saúde, SAMU, UPA 24h, UBS e Hospital\" width=\"536\" height=\"402\" /></div>\r\n<div class=\"col-md-6\">\r\n<ul class=\"list-unstyled\">\r\n<li>Levar o atendimento do SAMU 192 para toda a população brasileira.</li>\r\n<li>Garantir a expansão das Unidades de Pronto Atendimento (UPAs) em todas as regiões do país.</li>\r\n<li>Garantir à população o atendimento em hospitais de referência para situações de urgência (cirurgias, internações e UTIs).</li>\r\n</ul>\r\n</div>\r\n</div>\r\n</div>",
        "abstract": "<p>Resgate e atendimento 24 horas, sete dias da semana.</p>",
        "title": "SAMU 192 e UPAs",
        "categories": [
          {
            "name": "Saúde",
            "id": 180,
            "slug": "saude"
          }
        ],
        "votes_for": 0,
        "votes_against": 0,
        "setting": {
          "color": "#45818e",
          "moderate_comments": false,
          "comment_paragraph_plugin_activate": false,
          "author_name": "Ronald Emerson Scherolt da Costa",
          "allow_members_to_edit": false
        },
        "position": 4,
        "hits": 72,
        "tag_list": [],
        "children_count": 13,
        "slug": "samu-192-e-upas"
      }, {
        "ranking_position": null,
        "id": 103390,
        "body": "<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<h2>Crack, é possível vencer!<small>Prevenção, tratamento e enfrentamento ao tráfico.</small></h2>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-12\"><img class=\"img-responsive center-block\" src=\"http://dialoga.gov.br/dialoga/dialoga-brasil/crack-e-possivel-vencer/imagens/crack-img-1.jpg\" alt=\"\" /></div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12\">\r\n<p>O problema das drogas é um desafio ao mesmo tempo urgente e complexo. Requer medidas preventivas, de combate ao tráfico e, principalmente, oferta de serviços de saúde e assistência social.</p>\r\n<p>O programa “Crack, é possível vencer” envolve ações em três eixos: cuidado, autoridade e prevenção.</p>\r\n<p>O “<strong>cuidado</strong>” abrange a ampliação e a melhoria do atendimento para pessoas com problemas causados pelas drogas e para suas famílias, nas áreas de saúde e assistência social.</p>\r\n<p>No eixo “<strong>autoridade</strong>”, o foco é a integração de inteligência e cooperação entre forças policiais federais e estaduais. Envolve policiamento ostensivo nos pontos de uso e venda de drogas e a revitalização desses espaços, melhorando-os para toda a comunidade.</p>\r\n<p>Na área de “<strong>prevenção</strong>” são realizadas ações especiais em escolas e nas comunidades, assim como iniciativas de comunicação e informação para a população em geral.</p>\r\n<p><strong>Muitos resultados</strong> positivos <strong>foram</strong> alcançados <strong>de 2011 a 2014</strong>.</p>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-12 list-container-border\">\r\n<h4>CUIDADO - Saúde e assistência</h4>\r\n<ul class=\"list-unstyled no-border\">\r\n<li>2.200 Centros de Atenção Psicossocial (CAPS)</li>\r\n<li>360 CAPS Álcool e Drogas</li>\r\n<li>60 Unidades de Acolhimento</li>\r\n<li>8.034 vagas em comunidades terapêuticas</li>\r\n</ul>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-12 list-container-border\">\r\n<h4>AUTORIDADE - Combate ao tráfico</h4>\r\n<ul class=\"list-unstyled no-border\">\r\n<li>Intensificação das operações</li>\r\n<li>7.700 profissionais de segurança pública capacitados</li>\r\n<li>Instalação de 26 grupos de investigações sensíveis da Polícia Federal</li>\r\n</ul>\r\n</div>\r\n</div>\r\n<div class=\"row\">\r\n<div class=\"col-md-12 list-container-border\">\r\n<h4>PREVENÇÃO</h4>\r\n<ul class=\"list-unstyled no-border\">\r\n<li>367 mil funcionários capacitados na temática de drogas em todo o País</li>\r\n<li>4 mil ligações-dia e 230 mil atendimentos efetivos no ligue 132, serviço gratuito de atendimento telefônico para informações sobre drogas</li>\r\n</ul>\r\n</div>\r\n</div>\r\n</div>",
        "abstract": "<p>Prevenção, tratamento e enfrentamento ao tráfico.</p>",
        "title": "Crack, é possível vencer!",
        "categories": [
          {
            "name": "Segurança Pública",
            "id": 182,
            "slug": "seguranca-publica"
          }
        ],
        "votes_for": 0,
        "votes_against": 0,
        "setting": {
          "color": "#00ff00",
          "moderate_comments": false,
          "comment_paragraph_plugin_activate": false,
          "author_name": "Ronald Emerson Scherolt da Costa",
          "allow_members_to_edit": false
        },
        "position": 14,
        "hits": 44,
        "tag_list": [],
        "children_count": 7,
        "slug": "crack-e-possivel-vencer"
      }
    ]};
  return data;
};
