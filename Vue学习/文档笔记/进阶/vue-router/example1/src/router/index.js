import Vue from 'vue'
import VueRouter from 'vue-router'

// 组件
import About from '@/components/About'
import Home from '@/components/Home'
import Doc from '@/components/Doc'
import Redirect from '@/components/404'
// 插件
Vue.use(VueRouter)

var router = new VueRouter({
  mode:'history',//模式
  // linkActiveClass:'is-active',//全局改变路由切换class
  routes:[
    {
      path:'/',
      component:Home,
      name:'home',
      alias:'/home'
    },
    {
      path:'/about',
      component:About,
      name:'about'
    },
    {
      path:'/doc',
      component:Doc,
      name:'doc'
    },
    {
      path:'*',
      // component:Redirect
      // redirect:'/'
      // redirect:{path:'/'}
      // redirect:{name:'about'}
      redirect:(to)=>{
        console.log(to)//目标路由的对象信息
        var path = to.path;
        if(path === '/123'){
          return '/'
        }else if(path === '/abc'){
          return '/about'
        }
        return '/'
      }
    }
  ]
})
export default router