<template>
    <div class="usuario">
        <h2>Usuários</h2>

        <hr>
        <router-view /> <!-- Onde as rotas aninhadas de usuarios serao aplicadas  -->


<!--       <p> <strong> Codigo: </strong> {{id}}  </p>    -->
 
        <button sucesso @click="irParaInicio">Voltar</button>
    </div>
</template>


<script>

//Todo componente tem, de forma global, acesso ao $router && $route
export default {


/*  PRIMEIRA ESTRATEGIA PARA RECEBER PARAMETROS. 
    data(){
        return{
            id:this.$route.params.id  //Pega parametro a partir da rota.
        }
    },
    watch:{
        $route(to, from){
            this.id = to.params.id
        }
    },
*/

/* SEGUNDA ESTRATEGIA PARA RECEBER PARAMETROS => MAIS NOVA E MELHOR 
        USA PROPS E DENTRO DE ROUTER.JS FOI LIBERADO USO DE PROPS => PROPS: TRUE*/

//    props: ['id'],


    methods:{
        irParaInicio(){
        //    this.$router.push({path: '/'})
        //Ambos estão corretos
        //  this.$router.push('/'),
            this.$router.push({name: 'inicio'})
        }
    }

}
</script>

<style>

</style>