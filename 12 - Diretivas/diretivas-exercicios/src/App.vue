<template>
	<div id="app">
			<h2>Diretivas</h2>
			<p>
			Anatomia Diretiva: <br />
			<strong> v-nome : argumento.modificardor="valor"> </strong>
			</p>

			<div class="container">
				<h2>Diretivas: V-TEXT e V-HTML</h2>
				<p v-text="'Usando diretiva <strong> v-text </strong>'"></p>
				<p v-html="'Usando diretiva <strong> v-html </strong>'"></p>
			</div>

			<hr />

			<div class="container">
				<h4>Criando Diretivas PERSONALIZADAS</h4>
				<p v-personalizada="'blue'">Usando diretriz personalizada</p>
				<p v-personalizada="cor">Usando diretriz personalizada</p>
			</div>
			<!--  <p v-nomeDiretiva:argumento.modificardor1.modificador2.modificardor3="valor"></p>  -->
			<hr />

			<div class="container">
				<h4>Argumentos e Diretivas</h4>
				<p>Se eu passar argumento, mudo o background.</p>
				<p>Se eu não passar argumento, mudo a cor.</p>
				<p v-destaque:fundo="'lightblue'">Usando diretriz personalizada</p>
				<p v-destaque="cor">Usando diretriz personalizada</p>
			</div>

			<hr />

			<div class="container">
				<h4>Modificadores e Diretivas</h4>
				<p>Utilizamos o modificador 'ATRASAR'.</p>
				<p>Sempre que eu colocá-lo, o style será aplicado depois de 3 segundos</p>
				<p v-destaqueComModificador:fundo.atrasar="'pink'">
					Usando diretriz personalizada
				</p>
				<p v-destaqueComModificador.atrasar="cor">
					Usando diretriz personalizada
				</p>
			</div>

			<hr />

			<div class="container">
				<h4>Diretivas Locais e Multiplos Modificadores</h4>
				<p v-destaque-local:fundo.atrasar.alternar="'blue'">
					Usando diretriz personalizada
				</p>
				<p v-destaque-local.atrasar.alternar="cor">
					Usando diretriz personalizada
				</p>
			</div>

			<hr />

			<div class="container">
				<h4>Passando valores complexos para as diretibas</h4>
				<p v-destaque-local-comp:fundo.atrasar.alternar="{
					cor1: 'green', cor2: 'red', atraso: 2000, intervalo: 200 }">
					Usando diretriz personalizada
				</p>
				<p v-destaque-local-comp.atrasar="{
					cor1: 'red', atraso: 5000 }">
					Usando diretriz personalizada
				</p>
			</div>
	</div>
</template>

<script>
export default {
	directives: {
			"destaque-local": {
				bind(el, binding) {
					const aplicarCor = cor =>{
						if (binding.arg === "fundo") {
							el.style.backgroundColor = cor;
						} else {
							el.style.color = cor;
						}
					}

					let atraso = 0;

					// Se receber modificador atrasar, atraso recebera 3000.
					if (binding.modifiers["atrasar"]) atraso = 3000;

					const cor1 = binding.value
					const cor2 = 'lightblue'
					let corAtual = cor1

					setTimeout(() => {
						//Modificar alterna, vai alterar as cores de 1 em 1 seg
						if (binding.modifiers["alternar"]){
							setInterval(() => {
								corAtual = corAtual === cor1 ? cor2 : cor1
								aplicarCor(corAtual)
							}, 1000)
						} else {
							aplicarCor(binding.value)
						}
					}, atraso);
				},
			},
			"destaque-local-comp": {
				bind(el, binding) {
					const aplicarCor = cor =>{
						if (binding.arg === "fundo") {
							el.style.backgroundColor = cor;
						} else {
							el.style.color = cor;
						}
					}

					let atraso = 0;

					// Se receber modificador atrasar, atraso recebera 3000.
					if (binding.modifiers["atrasar"]) atraso = binding.value.atraso;

					const cor1 = binding.value.cor1
					const cor2 = binding.value.cor2
					let corAtual = cor1

					setTimeout(() => {
						//Modificar alterna, vai alterar as cores de 1 em 1 seg
						if (binding.modifiers["alternar"]){
							setInterval(() => {
								corAtual = corAtual === cor1 ? cor2 : cor1
								aplicarCor(corAtual)
							}, binding.value.intervalo)
						} else {
							aplicarCor(binding.value.cor1)
						}
					}, atraso);
				},
			},
	},
	data() {
		return {
		cor: "red",
		};
	},
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  border: 1px solid #ccc;
  width: 50%;
}
</style>
