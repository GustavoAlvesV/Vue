<template>
  <div class="citacoes">
    <span>
      <button @click="numero--">&lt;</button>
      <button @click="numero++">&gt;</button>
    </span>
    <span class="mostrar">Indice: {{ indice }}</span>
    <span class="mostrar">Numero: {{ numero }}</span>

<!--  (1)      Passando por PROPRS 
    <citacao :texto="citacoes[indice].texto"></citacao>   
-->

<!-- (2)        Passando por SLOT     
            <citacao>
            <h1>{{ citacoes[indice].autor}}</h1>
            <p>{{citacoes[indice].texto}}</p>
            <h6>{{citacoes[indice].fonte}}</h6>
            </citacao>        
-->

<!-- (3)        Passando por SLOT  nomeado
    <citacao>
      <h1 slot="autor">{{ citacoes[indice].autor}}</h1>
      <p slot="texto">{{citacoes[indice].texto}}</p>
      <h6 slot="fonte">{{citacoes[indice].fonte}}</h6>
    </citacao>
-->

    <citacao>
      <h1 slot="autor">{{ citacoes[indice].autor}}</h1>
      <p>{{citacoes[indice].texto}}</p>
      <h6 slot="fonte">{{citacoes[indice].fonte}}</h6>
    </citacao>


  </div>
</template>

<script>
import citacao from "./Citacao";

export default {
  components: { citacao },

  data() {
    return {
      numero: 0,
      citacoes: [
        {
          fonte: "Jornal do Empreendedor",
          texto:
            "Lembre-se sempre que você é absolutamente único. Assim como todos os outros.",
          autor: "Margaret Mead",
        },
        {
          fonte: "Frases de Mãe",
          texto: "Isso não é um quarto, é um chiqueiro.",
          autor: "Roberta",
        },
        {
          fonte: "Frases de Pai",
          texto: "Vou contar até 3! 1, 2, 2...",
          autor: "Gustavo",
        },
      ],
    };
  },
  computed: {
    indice() {
      return Math.abs(this.numero % 3);
    },
  },
};
</script>

<style scoped>
.citacoes {
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  margin: 10px;
}
.mostrar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
}
</style>
