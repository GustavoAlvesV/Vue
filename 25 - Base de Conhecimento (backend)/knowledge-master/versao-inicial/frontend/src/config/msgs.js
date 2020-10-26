import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {  //Registrei o toasted
    iconPack: 'fontawesome', //Biblioteca que quero usar
    duration: 3000             // Tempo em ms da que a mensagem aparecera
})


//Além de registrar o toasted vou querer criar duas mensagens, que serão os comportamentos padrões de uma msg de sucesse e de erro.

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realidada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg,
    { type : 'error', icon : 'times' }
)