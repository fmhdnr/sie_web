import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';	// Element 1
import 'element-ui/lib/theme-chalk/index.css'; // Element 2

import VueRouter from 'vue-router' // 路由 1
import router from './router' // 路由 2
import axios from "axios"
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(ElementUI); // Element 3
Vue.use(VueRouter) // 路由 3
Vue.use(VueAxios,axios)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
