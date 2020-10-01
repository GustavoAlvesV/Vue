new Vue({
    el: '#app',
    data: {
        playerLife: 100,
        monsterLife: 100,
        running: false,
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }

    },
    methods: {
        startGame() {
            this.running = true;
            this.playerLife = 100;
            this.monsterLife = 100;
        }, 
        ataque() {
            this.dano('monsterLife', 1, 12, false);
            this.dano('playerLife', 6, 18, false);
        },
        dano(prop, min, max, special) {
            const plus = special ? 5:0;
            const hurt = this.getRandom( min + plus, max + plus);
            this[prop] = Math.max(this[prop] - hurt, 0);
        },
        getRandom(min,max){
            const value = Math.random() * (max-min) + min;
            return Math.round(value);
        },




    },
    watch: {

    }
})