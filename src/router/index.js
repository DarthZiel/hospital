import VueRouter from 'vue-router'
import drugsVue from '../components/drugs.vue'
import homeVue from '../components/homeVue'
import loginVue from '../components/login'
import profileVue from '../components/profile.vue'

const router = new VueRouter({
  mode: 'history', 
  routes: [
    {
      path: '/login',
      component: loginVue,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/',
      component: homeVue
    },
    {
      path: '/profile/:id',
      component: profileVue
    },
    {
      path: '/drugs',
      component: drugsVue
    },
  ],
  
})
export default router