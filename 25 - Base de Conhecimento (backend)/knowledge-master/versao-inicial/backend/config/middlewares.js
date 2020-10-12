//Aqui que vou configurar os middlewares do express.
//Na nossa aplicação vamos precisar de dois middlewares:
//  1) BodyParser => Interpreta o body da requisição.
//  2) Cors => Para permitir que possamos fazer a partir de uma origem diferente, acessar a API que vamos construir
//              => Temos 2 aplicações: BACKEND (porta 3000) e o FRONTEND (porta 8081).
//              => BACKEND depende do NODE.
//              => FRONTEND não depende do NODE => O BUILD de produção vai gerar arquivos estáticos, HTML CSS etc.
//                                              => Durante o desenvolvimento usamos sim o NODE

//Consign vai nos ajudar a fazer as dependencias dentro da minha aplicação
//  Atualmente como faço as dependencias? 
//      R: Via de regra, usando o sistema do modelos do JS, o REQUIRE('...')
// Para não precisarmos ficar faendo require de todos os arquivos, o CONSIGN vai nos ajudar a fazer isso

const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}
