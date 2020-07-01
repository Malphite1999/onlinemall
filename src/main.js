import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
// vue调试工具开启
Vue.config.devtools = true;

Vue.config.productionTip = false

// 增加时间纵线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
