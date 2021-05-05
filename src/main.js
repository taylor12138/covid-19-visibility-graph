import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import * as echarts from 'echarts'

// 将全局的echarts对象挂载到Vue的原型对象上,这里使用的是在html里导入的echarts-min包，当然你也可以用npm下载包
// 不过使用npm的包，会导致你主题用不了，作者本人被这个bug卡了1小时0.0
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
