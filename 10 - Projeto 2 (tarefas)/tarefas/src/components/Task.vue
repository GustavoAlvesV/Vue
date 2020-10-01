<template>

    <div 
        @click="$emit('task-state-change', task)"
        class="task" :class="stateClass">
        <span @click.stop="$emit('task-deleted', task)" class="close">x</span>
        <p>{{Task.name}}</p>
    </div>
<!-- 
PROBLEMA: 
    @click="$emit('task-deleted', task)" =>  VAI PROPAGAR O EVENTO PARA DIV, OU SEJA, 2 EVENTOS DE CLICK SERAO CHAMANDO, CAUSANDO ERRO.
    OU SEJA, A TASK É EXCLUIDA E DEPOIS ELE TENTA MUDAR O ESTADO DA TASK EXCLUIDA, CAUSANDO ERRO.

SOLUÇÃO:  ".STOP"
    @click.stop="$emit('task-deleted', task)" => NAO VAI PROPAGAR O EVENTO PARA DIV.
 -->

</template>



<script>
export default {
    props:{
        Task:{ type: Object, required: true}
    },
    computed: {
        stateClass(){
            return {
                pending: this.Task.pending,
                done: !this.Task.pending
            }
        }
    }
}
</script>



<style>

.task{
    position: relative;
    box-sizing: border-box; /*PERMITE INCLUIR PADDING E BORDER A LARGURA E ALTURA TOTAL De UM ELEMENTO  */
    width: 350px;
    height: 150px;
    padding: 10px;
    border-radius: 8px;
    font-size: 2rem;
    font-weight: 300;
    cursor: pointer;
    user-select: none;  /*PARA SELECIONAR O TEXTO*/
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}

.pending{
    border-left: 12px solid #B73229;
    background-color: #F44336;
}

.done{
    color: #ddd; /*COR TEXTO*/
    border-left: 12px solid #0A8F08;
    background-color: #4CAF50;
    text-decoration: line-through; /*LINHA NO TEXTO*/
}

.pending .close {
    background-color: #B73229;
}

.done .close {
    background-color:  #0A8F08;
}

.close{
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    height: 20px;
    width: 20px;

    border-radius: 10px;

    display: flex;
    justify-content: center;
    
}

</style>