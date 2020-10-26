<template>

    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Adminitração do Sistema" sub="Cadastros & Cia"     /> 
        <div class="admin-page-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Artigos" active>
                        <ArticleAdmin>Artigos </ArticleAdmin>
                    </b-tab>
                    <b-tab title="Categorias" >
                        <CategoryAdmin>Categorias</CategoryAdmin>
                    </b-tab>
                    <b-tab title="Usuários">
                        <UserAdmin>Usuários</UserAdmin>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
  
</template>

<script>


import PageTitle from '../template/PageTitle'
import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'

export default {
    name:'AdminPages',
    components:{ PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin }

}
</script>

<style>

</style>