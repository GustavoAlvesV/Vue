<template>
    <div class="stat">
        <div class="stat-icon">
            <i :class='icon' :style="styleItem"></i>
        </div>
        <div class="stat-info">
            <span class="stat-title"> {{ title }} </span>
            <span class="stat-value"> {{ value }} </span>
        </div>
    </div>
</template>

<script>
export default {
    //Tem 4 props => 1) Titulo, 2) Valor, 3)Ícone, e 4) Cor
    name:'Stat',
    props:['title', 'value', 'icon', 'color'],
    computed:{
        styleItem(){
            return 'color: ' + (this.color || '#000')  //Se a cor não estiver setada, retorno cor 'preta'
        }
    }
}
</script>

<style>
    .stat {
        flex: 1;
        display: flex;
        border-radius: 8px;
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .stat-icon{
        flex: 1;
        display: flex;
        align-items: center;
    }

    .stat-icon i{
        font-size: 5rem;
    }   

    .stat-info{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .stat-title{
        font-size: 1.2rem;
    }

    .stat-value{
        font-size: 3rem;
    }
</style>