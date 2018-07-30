import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Show from '@/pages/Show'
import FrankShow from '@/pages/frankShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/show',
      name: 'Show',
      component: Show
    },
    {
      path: '/frankShow',
      name: 'FrankShow',
      component: FrankShow
    }
  ]
})
