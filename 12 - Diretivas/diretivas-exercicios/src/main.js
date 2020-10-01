import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.directive('personalizada', {
	bind(el, binding) {
		//el.style.backgroundColor = 'lightgreen';
		el.style.backgroundColor = binding.value;
	}
})

Vue.directive('destaque', {
	bind(el, binding) {
		//el.style.backgroundColor = 'lightgreen';

		if (binding.arg === 'fundo') {
			el.style.backgroundColor = binding.value;
		} else {
			el.style.color = binding.value;
		}
	}
})

Vue.directive('destaqueComModificador', {
	bind(el, binding) {
		//el.style.backgroundColor = 'lightgreen';
		let atraso = 0

		// Se receber modificador atrasar, atraso recebera 3000.
		if (binding.modifiers['atrasar']) atraso = 3000

		setTimeout(() => {
			if(binding.arg === 'fundo') {
				el.style.backgroundColor = binding.value;
			} else {
				el.style.color = binding.value;
			}
		}, atraso)

	}
})

new Vue({
	render: h => h(App),
}).$mount('#app')
