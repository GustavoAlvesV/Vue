<template>
  <div class="componente">
    <h2>As Informações de Usuário</h2>
    <p>Vários detalhes...</p>
    <p>
      Nome do usuário:
      <strong>{{ inverterNome() }}</strong>
      <br />Idade do usuário:
      <strong>{{idade}}</strong>
      <br />
      <button @click="reiniciarNome">Reiniciar Nome</button>
      <button @click="reiniciarFn">Reiniciar Nome (callback)</button>
    </p>
  </div>
</template>

<script>
import barramento from "@/barramento";

export default {
  props: {
    nome: {
      type: String,
      default: function () {
        return Array(10).fill(0).join(",");
      },
    },
    idade: Number,
    reiniciarFn: Function,
  },
  methods: {
    inverterNome() {
      return this.nome.split("").reverse().join("");
    },
    reiniciarNome() {
      const antigo = this.nome;
      this.nome = "Pedro";
      this.$emit("nomeMudou", {
        novo: this.nome,
        antigo,
      });
    },  
  },
  created() {
      barramento.quandoIdadeMudar(idade => {
          this.idade = idade;
      });
  },
};
</script>

<style scoped>
.componente {
  flex: 1;
  background-color: #ec485f;
  color: #fff;
}
</style>
