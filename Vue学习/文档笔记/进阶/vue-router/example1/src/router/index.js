import Vue from 'vue'
import VueRouter from 'vue-router'

// 组件
import About from '@/components/About'
import Home from '@/components/Home'
import Doc from '@/components/Doc'
import Slider from '@/components/Slider'
import Redirect from '@/components/404'
import User from '@/components/User'

import Study from '@/view/study'
import Work from '@/view/work'
import Hobby from '@/view/hobby'


// 插件
Vue.use(VueRouter)

var router = new VueRouter({
  mode:'history',//模式
  // linkActiveClass:'is-active',//全局改变路由切换class
  scrollBehavior(to,from,savePosition){ //滚动行为
    // console.log(to);
    // console.log(from);
    // console.log(savePosition);
    // if(savePosition){
    //   return savePosition  //前进后退 记录滚动条的位置
    //                        //实际上 新版chorme 已经默认会记录  
    // }else{
    //   return {x:0,y:0}
    // }
    
    // 通过hash定位到某个元素
    if(to.hash){
      // console.log(to.hash);
      return{
        selector:to.hash
      }
    }
  },
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
      children:[
        {
          path:'',
          component:Study,
          name:'about' //默认的子路由 name要拿过来
        },
        {
          // path:'work',  //  /about/work
          path:'/work',
          component:Work,
          name:'work'
        },
        {
          path:'/hobby',
          component:Hobby,
          name:'hobby'
        }
      ]
    },
    {
      path:'/doc',
      components:{
        default:Doc,
        slider:Slider
      },
      name:'doc'
    },
    {
      path:'/user/:userId?',
      component:User
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