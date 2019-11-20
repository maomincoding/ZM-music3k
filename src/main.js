import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'lib-flexible/flexible.js'
import axios from 'axios'
import animated from 'animate.css'
import Vuex from 'vuex'
import store from './store/store'
import VueCookies from 'vue-cookies'

Vue.prototype.$axios = axios
Vue.use(MuseUI)
Vue.use(animated)
Vue.use(VueCookies)
Vue.use(Vuex)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 用户名
  const user = localStorage.getItem('user')
  const cook = VueCookies.get('MUSIC_U')
  if (cook === null) {
    localStorage.clear('user')
  }
  next()
  if (!user && !cook && to.path !== '/login') {
    next('/login')
  }
  next()

  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
