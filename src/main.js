import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueStorage from 'vue-ls'

import config from '@/config'

Vue.use(VueStorage, config.storageOptions)

Vue.config.productionTip = false
new Vue({
  router,
  components: { App },
  render: h => h(App),
}).$mount('#app')
