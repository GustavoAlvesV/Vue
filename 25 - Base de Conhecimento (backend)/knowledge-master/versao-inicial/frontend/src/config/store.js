//Area de armazenamento para comunicacao dos componenetes

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: true,
        user: {
            name: 'Usuario Mock',
            email: 'mock@coder.com.br'
        }

    },
    mutations: { //Responsavel pela alternacia do estado do menu Ou setar um valor fixo.
        toggleMenu(state, isVisible){
            
            if(!state.user) {
                state.isMenuVisible = false
                return
            }
            
            if(isVisible === undefined){
                state.isMenuVisible = !state.isMenuVisible
            }else{
                state.isMenuVisible = isVisible
            }

        }
    }
})