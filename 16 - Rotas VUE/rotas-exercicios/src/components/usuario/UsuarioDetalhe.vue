<template>
    <div class="usuario-detalhe">
        <h3>Usuario Detalhe</h3>

        <p> <strong> Codigo: </strong> {{id}}  </p>

       <router-link tag="button" primario 
            :to="{name: 'editarUsuario', params: {id}, 
                query:{completo: true, lingua: 'pt'}, 
                hash:'#rodape'}">   
                                 <!-- {id: $route.params.id} } -->


 <!--   <router-link tag="button" primario :to="`/usuario/${id}/editar`"> AMBOS MESMA COISA-->
 <!--   <router-link tag="button" primario :to="`/usuario/${$route.params.id}/editar`"> AMBOS MESMA COISA-->

            Editar
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['id'],

    //Posso usar essa função para por autenticaçao, por exemplo.
    beforeRouteEnter(to, from, next){        
        console.log('Dentro componente -> Usuario Detalhe')
        next()

    //  console.log(this.id)
    //  Seu eu tentar acessar: 'this.id' nesse momento => nao vai dar, pq o componente nao foi nem criado ainda.

    /* 
    Como acessar os dados entao? (seja ele data, computed ou etc)
            ACESSANDO DENTRO DA FUNCAO `NEXT`, PQ DENTRO DELA ESTOU RECEBENDO A INSTANCIA DO MEU COMPONENETE.
     
            EXEMPLO:
                next(vm => {
                    console.log(vm.id)   => vm e a instancia do meu componente
                })
    */

    }
}
</script>

<style>

</style>