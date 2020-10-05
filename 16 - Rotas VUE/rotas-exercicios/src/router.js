import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './components/Inicio.vue'

//import Usuario from './components/usuario/Usuario.vue'
//import UsuarioLista from './components/usuario/UsuarioLista.vue'
//import UsuarioEditar from './components/usuario/UsuarioEditar.vue'
//import UsuarioDetalhe from './components/usuario/UsuarioDetalhe.vue'

import Menu from './components/template/Menu'
import MenuAlt from './components/template/MenuAlt'
 
Vue.use(Router);

//IMPORT DINAMICO (é uma função, não propriamente o valor importado)
//Cada const é um arquivo separado que será prefetch pelo browser.
const Usuario = () => import(/*webpackChunkName:"usuario" */ './components/usuario/Usuario.vue')
const UsuarioLista = () => import(/*webpackChunkName:"usuario" */ './components/usuario/UsuarioLista.vue')
const UsuarioEditar = () => import('./components/usuario/UsuarioEditar.vue')
const UsuarioDetalhe = () => import('./components/usuario/UsuarioDetalhe.vue')

const router = new Router({
    mode:'history',
    scrollBehavior(to, from, savedPosition){
        if(savedPosition){
            return savedPosition
        }else if(to.hash){
            return{selector: to.hash}
        }
        else{
            return{x: 0, y: 0}
        }
        // return{ x:0, y:1000 }

    },
    routes: [{
        path: '/',
      //  component: Inicio,
        name: 'inicio',
        components:{
            default: Inicio,
            menu: Menu
        }
    },{
        path:'/usuario',  //  '/:id' => significa que a rota vai esperar alguma coisa/ algum parÂmetro
      //  component: Usuario,
        components:{
            default: Usuario,
            menu: MenuAlt,
            menuInferior: MenuAlt
        },
        props: true,
        children:[
            {path: '', component: UsuarioLista},
            {path: ':id', component: UsuarioDetalhe, props: true,
               /* beforeEnter:(to, from , next) => {
                    console.log('antes da rota usuario detalhe')
                    next()
                }*/
            },
            {path: ':id/editar', component: UsuarioEditar, props: true, name:'editarUsuario'}

        ]
    },{
        path:'/redirecionar',
        redirect:'/usuario'
    },{
        path:'*',  //Redireciona qualquer rota 'nao existente' para rota '/'
        redirect:'/'
    }]
})


router.beforeEach((to, from, next) => {
    
//     console.log(`from: ${from.path}   =>    to: ${to.path}`)
   next() //Se não chamar next, não haverá navegação

/*Posso dar next para uma rota específica
        if(to.path != 'usuario'){
            next('/usuario')
        }
    */ 

/* Posso abordar navegação
            next (false)
    */
})

export default router