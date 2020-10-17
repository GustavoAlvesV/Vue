//Script pra conexao com mongodb
//Mongo é bem mais flexivel, não preciso criar esquemas/collection/banco
// o banco é criado automaticamente.



const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/knowledge_stats', { useNewUrlParser: true })
    .catch( e => {
        const msg = 'Não foi possível conectar com mongoDB!!'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')//Foi usando console mongodb color
        // \x1b[41m => cor de fundo vermelh
        // %s => separador
        // \x1b[37m => Fonte branca
        //\x1b[0m => Reseto a fonte pra cor normal, se não resetar tudo que for escrito depois será com fundo vermelho.
    })
