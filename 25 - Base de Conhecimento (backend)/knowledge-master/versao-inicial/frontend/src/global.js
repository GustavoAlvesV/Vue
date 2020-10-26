import Vue from 'vue'

export const userKey = '__knowledge_user'
export const baseApiUrl = 'http://localhost:3000'

//  Função que vai ajudar a tratar as mensagens de erro a patir do catch

//  Quando faço uma requisição via 'axios' e recebo um catch, 
//  eu preciso aqui no front-end, exibir para o usuário a mensagem de erro o catch
//  e a msg de erro pode vim de várias situações diferentes:

// Vou fazer as situações de cenarios mais comuns que posso encontrar erro:

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}
