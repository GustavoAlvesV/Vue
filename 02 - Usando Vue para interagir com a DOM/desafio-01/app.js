new Vue({
    el: '#desafio',
    data: {
        nome: 'Gustavo',
        idade: '27',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png'
    },
    methods: {
        random: function () {
            return Math.random()
        },
        idadeX3: function(){
            return (this.idade*3)
        }
    }
})