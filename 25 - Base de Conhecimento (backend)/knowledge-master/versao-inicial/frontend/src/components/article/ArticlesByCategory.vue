<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o"
            :main="category.name" sub="Categoria" />
        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article" />
            </li>
        </ul>

        <div class="load-more">
            <button v-if="loadMore" class="btn btn-lg btn-outline-primary" 
                @click="getArticles">
            Carregar Mais Artigos
            </button>
        </div>  
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import ArticleItem from './ArticleItem'

export default {
    name:'ArticlesByCategory',
    components: { PageTitle, ArticleItem },
    data: function(){
        return{
            category: {},
            articles: [],
            page: 1,
            loadMore: true, //Vai incrementar o page enquanto verdadeiro.
        }
    },
    methods:{
        getCategory(){
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios.get(url).then(res => this.category = res.data)
        },
        getArticles(){ //É disparado quando pagina é montada, e quando eu clico no loadMore
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
            axios.get(url).then(res => {
                this.articles = this.articles.concat(res.data) //Para loadMore funcionar, ou seja, vou concaternar o que tem com o que recebi para exibir tudo.
                this.page++
                if(res.data.length == 0){ this.loadMore = false; } //Quando eu clico no loadMore e nao vem mais artigos => loadMore = false.
            })
        }
    },
    watch: {
        $route(to) {
            this.category.id = to.params.id
            this.articles = []

            this.getCategory()
            this.getArticles()
        }
    },
    mounted(){
        this.category.id = this.$route.params.id //pego id categoria da URL
        this.getCategory()
        this.getArticles()
    },
    watch:{ /*Para monitorar o componente de rotas. */
        $route(to){
            this.category.id = to.params.id
            this.articles = []
            this.page = 1
            this.loadMore = true

            this.getCategory()
            this.getArticles()            
        }
    }

}
</script>

<style>
    .articles-by-category ul {
        list-style-type: none;
        padding: 0px;
    }   

    .articles-by-category .load-more{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 25px;
    }
</style>