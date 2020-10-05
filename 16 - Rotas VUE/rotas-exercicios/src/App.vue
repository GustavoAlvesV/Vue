<template>
  <div id="app">
    <h1>Rotas com VueRouter</h1>
    <!--		<Menu />		-->
    <router-view name="menu" />

    <transition mode="out-in" 
			enter-active-class="animated rubberBand" 
			leave-active-class="animated rollOut"	>
      
      <router-view />
      <!-- Animação transição de VIEW, já foi importado biblitoeca ANIMATE.CSS-->
    </transition>

    <router-view name="menuInferior" />
  </div>
</template>

<script>
// import Menu from './components/template/Menu'
export default {
  //	components:{Menu},
};
</script>
<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
