import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'
// vue调试工具开启
Vue.config.devtools = true;

Vue.config.productionTip = false

// 增加时间纵线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

//使用图片懒加载插件 
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})
// 解决移动端延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
