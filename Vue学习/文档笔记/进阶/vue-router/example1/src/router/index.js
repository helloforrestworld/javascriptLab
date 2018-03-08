import Vue from 'vue'
import VueRouter from 'vue-router'

// 组件
import About from '@/components/About'
import HelloWorld from '@/components/HelloWorld'

Vue.use(VueRouter)

var router = new VueRouter({
  routes:[
    {
      path:'/',
      component:HelloWorld
    },
    {
      path:'/about',
      component:About
    }
  ]
})
export default router