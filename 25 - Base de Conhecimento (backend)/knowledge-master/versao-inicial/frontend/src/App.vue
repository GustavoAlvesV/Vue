<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible}"> <!-- Classe CSS condicional, para quando menu estiver invisivel -->
		<Header title="Cod3r - Base de Conhecimento" 
			:hideToggle="false"
			:hideUserDropdown="false"/>
		<Menu />
		<Content />
		<Footer />
	</div>
</template>

<script>

import {mapState} from 'vuex'
import Header from "./components/template/Header"
import Menu from "./components/template/Menu"
import Content from "./components/template/Content"
import Footer from "./components/template/Footer"


export default {
	name: "App",
	components: {Header, Menu, Content, Footer},
	computed: mapState(['isMenuVisible'])
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0px;
	}

	#app{
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;

		display: grid;
		grid-template-rows: 60px 1fr 40px; /*Temos 3 linhas no nosso grid => Header / Content (maximo que puder) / Footer*/
		grid-template-columns: 300px 1fr; /*Temos 2 colunas no nosso grid => Menu / Content */

		grid-template-areas: /*Define as areas e onde cada componente vai se encaixar dentro dessas areas.*/
			"header header"
			"menu content"
			"menu footer";
	}

	#app.hide-menu { /*Nesse caso, vou definir novas areas de menu (caso menu esteja invisivel) */
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer";
	}

</style>