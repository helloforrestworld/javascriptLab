import Vue from 'vue'
import Router from 'vue-router'


import Select from '@/components/select'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Select',
      component: Select
    }
  ]
})
