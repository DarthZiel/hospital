import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import {store} from './store'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import moment from 'moment'

Vue.prototype.moment = moment

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(Vuex);

Vue.prototype.$http = axios;
axios.defaults.baseURL = "https://hospitalll.pythonanywhere.com/"

Vue.use(VueResource)

new Vue({
  store,
  el: '#app',
  render: h => h(App),
  vuetify : new Vuetify(),
  router,
  
})
 