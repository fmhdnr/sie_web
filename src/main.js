import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';	// Element 1
import 'element-ui/lib/theme-chalk/index.css'; // Element 2

import VueRouter from 'vue-router' // 路由 1
import router from './router' // 路由 2
import axios from "axios"
import VueAxios from 'vue-axios'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

Vue.use(ElementUI); // Element 3
Vue.use(VueRouter) // 路由 3
Vue.use(VueAxios,axios)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

axios.defaults.baseURL = '/';//设置路由访问
axios.defaults.timeout = 30000;//设置超时时间
axios.interceptors.request.use(
    config => {
      if (localStorage.getItem("userInfo")) {
        config.headers["token"] = localStorage.getItem("userInfo");//把localStorage的token放在Authorization里
      }
      return config;
    },
    function(err) {
      console.log("失败信息" + err);
    }
);
// getUserInfo(jwtDecode(localStorage.getItem('userInfo')).sub).then(res=>{
//     console.log(res.data)
//     this.user.name = res.data.data.name
//     this.user.schoolid = res.data.schoolid
//     if(this.user.schoolid==1){
//         this.user.schoolid = "Northeastern University"
//     }else {
//         this.user.schoolid = "The University of Texas at Arlington"
//     }
// })
