import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'


Vue.use(Router)

export default new Router({
  //mode: hash,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
