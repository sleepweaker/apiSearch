import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Show from '@/pages/Show'
import FrankShow from '@/pages/frankShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/show',
      name: 'Show',
      component: Show
    },
    {
      path: '/frankShow',
      name: 'FrankShow',
      component: FrankShow,
      meta: { keepAlive: true }
    }
  ]
})
