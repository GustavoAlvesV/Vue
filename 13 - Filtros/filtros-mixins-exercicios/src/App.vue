<template>
  <div id="app">
    <h3>Filtros & Mixins</h3>

    <!-- Nomeclatura: -->
    <!-- {{'VALOR' OU VARIÁVEL | FILTRO 1 | FILTRO 2  | FILTRO N}} -->
    <p>{{ cpf | cpf | inverter }}</p>

    <p>{{ "Gustavo Alves Vasconcelos" | cpf | inverter }}</p>
    <!-- POSSO TER O VALOR DE STRING INSERIDO DIRETAMENTE -->

    <hr />

    <h3>Filtros & V-BIND</h3>

    <input type="text" :value="cpf | cpf | inverter" />

    <hr />

    <!-- Mixens -->
    <h3>Mixins</h3>

    <span><strong>Componente</strong></span>
    <Frutas />

    <hr />
    <span> <strong> Replicada local </strong></span>
    <div class="teste">
      <ul>
        <li v-for="fruta in frutas" :key="fruta">{{ fruta }}</li>
      </ul>
      <input type="text" v-model="fruta" @keydown.enter="add" />
    </div>

    <hr />
    <span><strong>Fazendo uso de variável do Mixin</strong></span>

    <p>{{ usuarioLogado }}</p>
  </div>
</template>

<script>
import Frutas from "./components/Frutas.vue";
import frutasMixins from "@/frutasMixin.js";
import usuarioMixin from "@/usuariosMixin.js";
export default {
	components: { Frutas },
	mixins: [frutasMixins, usuarioMixin],
	//Filtros Locais
	filters: {
		cpf(valor) {
		//`${valor}` => Transforma em string, se o valor nao for.
		const arr = `${valor}`.split(""); // Coloca a string inicial em um array, onde separador é ''

		arr.splice(3, 0, "."); //Adiciona o elemento '.' na 3 posição do array, sem retirar ninguem
		arr.splice(7, 0, ".");
		arr.splice(11, 0, "-");

		return arr.join(""); // Junta o cada elemento do array com uma string '', e cria uma nova string
		},
	},
	data() {
		return {
		cpf: "12312312335",
		};
	},
	created(){
        console.log('Created - APP');
    }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 2.5rem;
}

input {
  height: 50px;
  width: 200px;
  font-size: 1.5rem;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.teste {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
