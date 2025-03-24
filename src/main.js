import './mock'
import Vue from 'vue'
import App from './App.vue'
import './styles/glabal.less'
import router from './Router'
import { showMessage } from './utils/index'
import vLoading from './directives/loading'
import vLazy from './directives/lazy'
import './eventBus'
import store from './store'
store.dispatch('setting/fetchSetting');


Vue.config.productionTip = false
Vue.prototype.$showMessage = showMessage

Vue.directive('loading',vLoading);
Vue.directive('lazy',vLazy);



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
