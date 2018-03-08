// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'

// 组件
import App from './App'

Vue.config.productionTip = false


// 实例
new Vue({
  el:'#app',
  components: {
    App
  },
  template:'<App/>',
  router
})
