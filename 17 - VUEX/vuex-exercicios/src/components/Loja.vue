<template>
    <Painel titulo="Loja Virtual" verde>
        <div class="loja">
            <span>Adicionar</span>
            <input type="number" v-model.number="quantidade">
            <span>itens de <strong>R$</strong></span>
            <input type="number" v-model.number="preco">
            <button @click="adicionar">Agora!</button>
        </div>
    </Painel>
</template>

<script>

import {mapActions} from 'vuex'  //Para usar o MapSetter
                                    // Getters são adicionados dentro do computed
                                    // Setter são adicionados dentro do methods
                                    //MapMutations => MapACTION
                                    // ACTION => MUTATION => STORE

export default {
    data() {
        return {
            sequencia: 1,
        }
    },
    computed:{
        quantidade(){
            return this.$store.state.parametros.quantidade;
        },
        preco(){
            return this.$store.state.parametros.preco;
        }
    },
    methods: { 
          ...mapActions('carrinho', ['adicionarProduto']),   //MapSetters => Tenho que usar '...' PQ TENHO OUTRA PROPRIEDADE, CHAMADA ADICIOANAR
/* 
    ...mapActions(['adicionarProduto'])   Ambos sao iguais
                    ==
        adicionarProduto(produto){
            this.$store.dispatch('adicionarProduto', produto);
        }
*/
        adicionar() {
            const produto = {
                id: this.sequencia,
                nome: `Produto ${this.sequencia}`,
                quantidade: this.quantidade,
                preco: this.preco
            }
            this.sequencia++

//              Adicionando produtos ao carrinho:

//          this.$store.state.produtos.push(produto);  //Adiciona produto a store => Sem mutation
//          this.$store.commit('adicionarProduto', produto)    // Com mutation

            this.adicionarProduto(produto)    //Com mapMutations ou mapAction.

//            this.$store.dispatch('adicionarProduto', produto); // Com Action dispatch, entao ou vc pode usar o dispatch ou mapAction.

            // eslint-disable-next-line
            console.log(produto)
        }
    }
}
</script>

<style>
    .loja {
        display: flex;
        justify-content: center;
    }

    .loja > * {
        margin: 0px 10px;
    }

    input {
        font-size: 2rem;
        width: 90px;
    }
</style>
