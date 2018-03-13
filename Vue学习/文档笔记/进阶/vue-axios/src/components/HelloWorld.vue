<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import queryString from 'queryString' //系统内置 处理字符串



// 创建令牌(取消清除)
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
var source2 = CancelToken.source();

var HTTP = axios.create({
  baseURL:'https://www.easy-mock.com/mock/5aa7ebafdee46352178289fb/example/',
  timeout:2000,
  headers:{
    'myName':'helloforrest',
    'content-type':'application/x-www-form-urlencoded'
  },
  responseType:'json',
  // params:{a:1},
  // 只限于 post put patch 
  transformRequest:[function(data){ //格式发送出去的数据
    // name=BEEE&age=23 发送的数据转为这种格式  还需要设置content-type
    // data.bb = 11 可以添加
    return queryString.stringify(data)
  }],
  transformResponse:[function(data){//格式接受的数据
    // data.abc = 11
    return data
  }],
  validateStatus(status){//判断状态码  再判定请求的成功和失败
    return status < 404
  },
  cancelToken:source.token //取消请求
})

var HTTP2 = axios.create({
  baseURL:'https://www.easy-mock.com/mock/5aa7ebafdee46352178289fb/example/',
  timeout:2000,
  headers:{
    'myName':'helloforrest',
    'content-type':'application/x-www-form-urlencoded'
  },
  responseType:'json',
  cancelToken:source2.token //取消请求
})



export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    // 这个请求被取消了
    HTTP.post('upload',{"name":'BEEE',"age":23})
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        if(axios.isCancel(err)){
          console.log('用户取消了')
        }else{
          console.log(err)
        }
      })
    // 这个请求没被取消
    HTTP2.get('mock')
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    source.cancel('用户取消了')
    
    // 并发请求
    // axios.all(HTTP2.get('mock'),HTTP.post('upload',{'bb':1}))
    //   .then(axios.spread((res1,res2)=>{
    //     // 分别拿到两个请求结果
    //     // 如果不用axios.spread拿到的是一个数组 数组里面分别存在两组数据
    // }))
    
    
    //拦截请求
    
    // HTTP.interceptors.request.use(function(config){
    // 
    // },function(err){})
    // 
    // //拦截响应
    // HTTP.interceptors.response.use(function(config){
    // 
    // },function(err){})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
