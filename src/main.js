// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import 'iview/dist/styles/iview.css';
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(iview)  
Vue.use(axios)  
window.testHost = "http://192.168.200.8:17777";
window.Host = "http://frank.onenet.com"


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
