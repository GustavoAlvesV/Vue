<template>
  <div class="container">
    <h1>Componente Usuário</h1>
    <p>Esse é um componente muito legal!</p>
    <p>
      <strong>{{nome}}</strong>
    </p>
    <p>
      <strong>{{idade}}</strong>
    </p>
    <button @click="alterarNome">Alterar nome</button>
    <hr />

    <div class="componentes">
      <app-usuario-info
        :nome="nome"
        :idade="idade"
        @nomeMudou=" nome = $event.antigo + $event.novo"
        :reiniciarFn="reiniciarNome"
      />

      <app-usuario-editar 
        :nome="nome" 
        :idade="idade" 
        />
    </div>
  </div>
</template>

<script>
import UsuarioInfo from "./UsuarioInfo";
import AppUsuarioEditar from "./UsuarioEditar";

export default {
  components: { AppUsuarioInfo: UsuarioInfo, AppUsuarioEditar },
  data() {
    return {
      nome: "Pedro",
      idade: 21,
    };
  },
  methods: {
    alterarNome() {
      this.nome = "Ana";
    },
    reiniciarNome() {
      this.nome = "Pedro";
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #27363b;
  color: #fff;
  padding: 10px;
}

.container hr {
  margin: 20px 10px;
}

.componentes {
  display: flex;
}

.componentes > * {
  margin: 10px;
}
</style>
