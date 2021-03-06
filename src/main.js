// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as dd from 'dingtalk-jsapi'
import axios from 'axios'
import cookies from 'vue-cookies'
import '../my-theme/index.less'
import HeyUI from 'heyui'

Vue.config.productionTip = false
Vue.prototype.$dd = dd
Vue.prototype.$http = axios

Vue.use(HeyUI)
Vue.use(cookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
