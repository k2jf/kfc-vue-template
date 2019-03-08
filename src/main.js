import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'
import kfcAxios from './libs/kfc-axios'

import 'iview/dist/styles/iview.css'
import 'dayjs/locale/zh-cn'

Vue.use(kfcAxios, {
  baseUrl: config.baseUrl,
  login: function () {
    console.warn('需要自己实现')
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

sessionStorage.setItem('$kmx-auth-token', config.k2Key)
