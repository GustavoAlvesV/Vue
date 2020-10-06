//Centraliza a STORE;
//Assim carrinho e ,

import Vue from 'vue';
import Vuex from 'vuex';
 
Vue.use(Vuex);
 
export default new Vuex.Store({
    state:{ //ESTADO CENTRAL GERENCIADO PELO VUEX.
        produtos: [
 //           { nome: 'Produto 1', quantidade: 7, preco: 14.55 },
 //           { nome: 'Produto 2', quantidade: 10, preco: 22.99 },
 //           { nome: 'Produto 3', quantidade: 1, preco: 43.18 },
        ],
        quantidade: 0,
        preco: 0
    },

    getters: {// VAI CENTRALIZAR O VALOR TOTAL DE CARRINHO E RESUMO 
        valorTotal(state){
                return state.produtos.map(p => p.quantidade * p.preco)
                    .reduce((total, atual) => total + atual, 0)
            }
        
    },

    mutations: {//Em qualquer mutation so podemos passar um unico parametro adicional, padrao chamado de payload
        adicionarProduto(state, payload){       // => payload = produto nesse caso
             state.produtos.push(payload);
        },
        setQuantidade(state, payload){
            state.quantidade = payload;
        },
        setPreco(state, payload){
            state.preco = payload;
        }
    },
/*
    actions:{
        adicionarProduto({commit},payload){   
            setTimeout(()=>{
                commit('adicionarProduto', payload);    
            },1000)
        }
    }
*/
    actions:{
        adicionarProduto(context,payload){    //Context é o this do componente. 
            setTimeout(()=>{
                context.commit('adicionarProduto', payload);    
            },1000)
        }
    }

})
