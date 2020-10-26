<template>
    <aside class="menu" v-show="isMenuVisible">



        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Digite para filtrar..."
                 v-model="treeFilter" class="filter-field">
        </div>


        <Tree :data="treeData" 
            :filter="treeFilter"
            :options="treeOptions" 
            ref="tree" 
        />
    </aside> <!-- Poderia ter usado um v-if tambem. -->
</template>

<script>

import {mapState} from 'vuex' //Responsavel por mapear um atributo da store dentro do meu componente
import Tree from 'liquor-tree'
import { baseApiUrl } from '@/global'
import axios from 'axios'



export default {
    name: 'Menu',
    components: { Tree },
    data:function(){
        return{
            treeFilter: '',
            treeData: this.getTreeData(),
            treeOptions: {
                propertyNames: { 'text' : 'name' },  //Propriedade name na árvore chama text => Agora de fato o liquor-tree vai preencher a arvore por nome
                filter: { emptyText: 'Categoria não encontrada' }
            }
        }
    },
    computed: mapState(['isMenuVisible']),
    methods:{
        getTreeData(){
            const url = `${baseApiUrl}/categories/tree`
            return axios.get(url).then(res => res.data)  //Estou retornando uma Promise, e não estou setando nada no meu componente
        },
        onNodeSelect(node){
            this.$router.push({
                name: 'articlesByCategory',
                params: { id: node.id }
            })

            if(this.$mq === 'xs' || this.$mq === 'sm') {
                this.$store.commit('toggleMenu', false)
            }
        }
    },
    mounted() {
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
        /* this.$refs => Forma que eu tenho para acessar a referencia de algum elemento do meu template*/
        /* .tree => Que é a refs do componentes Tree que eu coloquei, e pelo ref consigo acessar aqui */
        /* $on => Para vincular um evento */

        /* 
            $on('node:selected', this.onNodeSelect) =>
            faz vínculo de cada node da arvore a o evento 'onNodeSelect'.
        */
    }
}
</script>

<style>
    .menu{
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    
    .menu a,
    .menu a:hover {
        color: #FFF;
        text-decoration: none;
    }

/* .tree-node => Classe criada pela árvore.
    Dentro treeNode existe o treeContent que quando quero aplicar o estilo
        Assim tenho 2 situações para aplicar o mesmo estilo:
        1) Quando uso o hover => passo mouse por cima do item da arvore(content)
        2) Ou quando o treeNode esta selecionado.
*/
    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover { 
        background-color: rgba(255, 255, 255, 0.2);
    }
/* .tree-arrow.has-child => Classe da SETA '>' que aparece que quando uma clsse tem filho.
*/
    .tree-arrow.has-child {
        filter: brightness(2);
    }

    .menu .menu-filter {  /* CSS da area do filtro */
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }

    .menu .menu-filter i {   /* Icone do Filtro (A Lupa) */
        color: #AAA;
        margin-right: 10px;
    }

    .menu input {/* CSS do input do filtro */
        color: #CCC;
        font-size: 1.3rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty{
        color: #CCC;
        margin-left: 20px;
        font-size: 1.3rem;
    }
</style>