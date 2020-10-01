new Vue({
    el: '#desafio',
    data: {
        valor: '',
    },
    methods: {
        exibirAlerta(){
            alert('Estou te alertando');
        },
        digitando(event){
            this.valor = event.target.value;
        }
    }
})