// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias. 处理后缀名
import Vue from 'vue'
import App from './App'//根组件
import router from './router'//./router/index.js简写

Vue.config.productionTip = false//关闭生产环境提示
var test = true;
// 加上下面的注释忽略检查
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },//注册
  template: '<App/>'//<App></App>模板
});
