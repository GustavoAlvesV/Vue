import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'


import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

//TEMPORARIO!! => Para qualquer requisição que o axios fizer, ele vai manda token junto
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkRlYm9yYSBBbHZlcyIsImVtYWlsIjoiZGVib3JhLnZAaG90bWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjAzMjg5ODcyLCJleHAiOjE2MzQwNDgyNzJ9.93jM9pcgtG9E9JhtpC2EatPzhmXbKxlMNDqTR7mQFUo'

new Vue({
  store, 
  router,
  render: h => h(App)
}).$mount('#app')