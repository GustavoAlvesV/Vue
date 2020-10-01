export default{
    data(){
        return{
            fruta: '',
            frutas: ['laranja', 'maça', 'uva']
        }
    },
    methods:{
        add(){
            this.frutas.push(this.fruta);
            this.fruta = '';
        }
    },

    created(){
        console.log('Created - Frutas Mixin')
    }
}