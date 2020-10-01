<template>
	<div id="app">
		<h1>Registrar Reclamação</h1>
		<div class="conteudo" >
			<div class="painel" v-if="!enviado">
				<div class="cabecalho">Formulário</div>
				<Rotulo nome="E-mail">
					<input type="text" v-model="usuario.email">
				</Rotulo>
				<Rotulo nome="Senha">
					<input type="password" v-model="usuario.senha">
				</Rotulo>
				<Rotulo nome="Idade">
					<input type="number" v-model="usuario.idade">
				</Rotulo>
				<Rotulo nome="Mensagem">
					<textarea name="" cols="30" rows="5" v-model="usuario.mensagem"></textarea>
				</Rotulo>



<!-- CHECKBOX -->
				<Rotulo nome="Características do Problema">
					<span class="mr-4"><input type="checkbox" 
							v-model="Caracteristicas"
							value="reproduzivel"> Reproduzível
					</span>
					<span><input type="checkbox" 
							v-model="Caracteristicas"
							value="intermitente"> Intermitente
					</span>
				</Rotulo>



<!-- RADIOBOX -->
				<Rotulo nome="Qual produto?">
					<span class="mr-4">
						<input type="radio" value="Web" v-model="produto"> Web</span>
					<span class="mr-4">
						<input type="radio" value="Mobile" v-model="produto"> Mobile</span>
					<span>
						<input type="radio" value="Outro" v-model="produto"> Outro</span>
				</Rotulo>


<!-- SELECT -->
				<Rotulo nome="Prioridade">
					<select v-model="prioridade">
						<option v-for="prioridade in prioridades" 
							:value="prioridade.codigo"
							:key="prioridade.codigo"
							:selected="prioridade.codigo === 1">  <!-- Valor padrão -->
								{{ prioridade.codigo }} - {{ prioridade.nome }}</option>
					</select>
				</Rotulo>


<!-- PERSONALIZADO -->
				<Rotulo nome="Primeira Reclamação?">
					<Escolha v-model="escolha" />
				</Rotulo>


<!-- SUBMIT -->

				<hr>
				<button @click.prevent="enviar">Enviar</button>

			</div>

<!-- Vizualização -->

			<div class="painel" v-else>
				<div class="cabecalho">Resultado</div>
				<Rotulo nome="E-mail">
					<span>{{ usuario.email }}</span>
				</Rotulo>
				<Rotulo nome="Senha">
					<span>{{ usuario.senha }}</span>
				</Rotulo>
				<Rotulo nome="Idade">
					<span>{{ usuario.idade }}</span>
				</Rotulo>
				<Rotulo nome="Mensagem">
					<span style="white-space:pre;">{{ usuario.mensagem }}</span>
				</Rotulo>
				<Rotulo nome="Marque as Opções">
					<span>
						<ul>
							<li v-for="c in Caracteristicas" :key="c">{{ c }}</li>
						</ul>
					</span>
				</Rotulo>
				<Rotulo nome="Qual produto?">
					<span>{{ produto }}</span>
				</Rotulo>
				<Rotulo nome="Prioridade">
					<span> {{ prioridade }} </span>
				</Rotulo>
				<Rotulo nome="Primeira Reclamação?">
					<span>{{ escolha 	}}</span>
				</Rotulo>
			</div>
		</div>
	</div>
</template>

<script>
import Rotulo from './components/Rotulo.vue'
import Escolha from './components/Escolha.vue'

export default {
	name: 'app',
	components: { Rotulo, Escolha },
	methods:{
		enviar(){
			this.enviado = true;
		}
	},
	data(){
		return{
			mensagem: '',
			Caracteristicas: [],
			prioridade: 1,
			prioridades: [
				{codigo: 1, nome:'Baixa'},
				{codigo: 2, nome:'Intermediária'},
				{codigo: 3, nome:'Alta'}
			],
			produto: 'Web',
			usuario: {
				//Não preciso ter atributos declarados, porque diretamente o JS cria os valores;
				email: '',
				senha: '',
				idade: 25,
				mensagem: '',
				
			},
			escolha: true,
			enviado: false
		}
	}
}
</script>

<style>

body {
	background-color: #ECECEC;
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

	display: flex;
	flex-direction: column;
}

.conteudo {
	display: flex;
}

.painel {
	flex: 1;
	background: #FFF;
	margin: 0px 10px;
	padding: 20px;
	border: 1px solid #AAA;
	border-radius: 5px;
}

.painel .cabecalho {
	width: 100%;
	background-color: #DDD;
	padding: 10px 0px;
	border-radius: 5px;
	font-size: 1.4rem;
}

.painel button {
	float: right;
	margin: 10px 0px;
	padding: 10px 20px;
	font-size: 1.4rem;
	border-radius: 5px;
	color: #FFF;
	background-color: #2196F3;
}

#app h1 {
	font-weight: 200;
	margin: 20px;
	padding: 0;
}

.mr-4 {
	margin-right: 40px;
}
</style>
