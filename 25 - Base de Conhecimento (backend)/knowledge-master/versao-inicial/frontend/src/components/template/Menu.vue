<template>
    <aside class="menu" v-show="isMenuVisible"></aside> <!-- Poderia ter usado um v-if tambem. -->
</template>

<script>

import {mapState} from 'vuex' //Responsavel por mapear um atributo da store dentro do meu componen  te
export default {
    name: 'Menu',
    computed: mapState(['isMenuVisible'])
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

</style>