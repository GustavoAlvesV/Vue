<template> 
    <div class="teste">
        <ul>
            <li v-for="fruta in frutas" :key="fruta"> {{ fruta }}</li>
        </ul>
        <input type="text" v-model="fruta" @keydown.enter="add">
    </div>
</template>

<script>
import frutasMixins from '@/frutasMixin.js'
import usuarioMixin from '@/usuariosMixin.js'
export default {
    mixins: [frutasMixins, usuarioMixin],
    created(){
        console.log('Created - Frutas')
    }
}
</script>

<style>

.teste{
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>