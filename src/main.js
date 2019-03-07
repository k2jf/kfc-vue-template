import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'

import 'iview/dist/styles/iview.css'
import 'dayjs/locale/zh-cn'

Vue.config.productionTip = false

Vue.prototype.$baseUrl = config.baseUrl

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

localStorage.setItem('k2_key', config.k2Key)
