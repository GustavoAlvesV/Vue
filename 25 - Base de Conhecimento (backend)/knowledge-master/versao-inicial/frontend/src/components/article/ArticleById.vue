<template>
    <div class="article-by-id">
        <PageTitle icon="fa fa-file-o" :main="article.name"
            :sub="article.description" 
        />

        <div class="article-content" v-html="article.content"></div>  

    </div> 
</template>

<script>

import 'highlightjs/styles/dracula.css'
//import hljs from 'highlightjs/highlight.pack.js'
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'

export default {
    name: 'ArticleById',
    components: { PageTitle },
    data: function() {
        return {
            article: {}
        }
    },
    mounted() {
        const url = `${baseApiUrl}/articles/${this.$route.params.id}`
        axios.get(url).then(res => this.article = res.data)
    },
}
</script>

<style>
    .article-content{
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;
    }

/* As classes CSS abaixo são restrições para o conteudo do artigo: */ 

    .article-content pre { /* Codigos que estao dentro do conteudo do arquivo são exibidos dentro do pre*/ 
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #FFF;
    }

    .article-content img {/* Qualquer imagem dentro do conteudo do artigo, tera altura largura de 100% do tamanho do conteudo do artigo*/ 
        max-width: 100%;
    }

    .article-content :last-child {
        margin-bottom: 0px;
    }
</style>