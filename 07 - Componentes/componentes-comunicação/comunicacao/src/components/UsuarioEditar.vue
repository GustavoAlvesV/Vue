<template>
  <div class="componente">
    <h2>Alterar os Dados de Usuário</h2>
    <p>Edite as informações</p>

    <p>
      Nome do usuário:
      <strong>{{ nome }}</strong>
    </p>
    <p>
      Idade do Usuário:
      <strong>{{idade}}</strong>
      <br />
      <button @click="alterarIdade">Alterar Idade</button>
    </p>
  </div>
</template>

<script>
import barramento from "@/barramento";

export default {
  props: {
    idade: Number,
    nome: String,
  },
  methods: {
    alterarIdade() {
      this.idade += 1;
      barramento.alterarIdade(this.idade);
    },
  },
};
</script>

<style scoped>
.componente {
  flex: 1;
  background-color: #98b99a;
  color: #fff;
}
</style>
