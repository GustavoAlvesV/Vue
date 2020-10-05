<template>
    <nav class="menu">
        <ul>
            <li>
                <router-link to="/" active-class="active" exact>
                    Início</router-link>
            </li>

            <router-link to="/usuario" tag="li" active-class="active">
                <a>Usuário</a> </router-link>


            <!-- No caso, do metodo 1 para receber parametro, temos um Problema: 
                    Quando uma router-link é duplicado a navegação entre eles naõ muda o id 
                        EXEMPLO:
                                        <router-link to="/usuario/1" tag="li" active-class="active">
                                            <a>Usuário 1</a> </router-link>
                                        <router-link to="/usuario/2" tag="li" active-class="active">
                                            <a>Usuário 2</a> </router-link>-->
            <!-- Solução: Usar WATCH-->
        </ul>
    </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>