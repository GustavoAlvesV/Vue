import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.directive('quando', {
	bind(el, binding){

		const tipo = binding.arg;
		const fn = binding.value;

		el.addEventListener(tipo, fn);

	}
})

new Vue({
	render: h => h(App),
}).$mount('#app')
