<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data(){
    return{
      
    }
  },
  created() {
    // axios({
    //   method:'get',
    //   url:'https://www.easy-mock.com/mock/5aa7ebafdee46352178289fb/example/mock',
    //   params:{a:1}
    // })
    // .then((res)=>{
    //   console.log(res)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
    // axios({
    //   method:'post',
    //   url:'https://www.easy-mock.com/mock/5aa7ebafdee46352178289fb/example/upload',
    //   params:{a:1}
    // })
    // .then((res)=>{
    //   console.log(res)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
    // axios.get('https://www.easy-mock.com/mock/5aa7ebafdee46352178289fb/example/mock',{
    //   params:{b:1}
    // })
    // .then((res)=>{
    //   console.log(res)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
    // axios.post('https://www.easy-mock.com/mock/5aa7ebafdee46352178289fb/example/upload',{
    //   b:1
    // })
    // .then((res)=>{
    //   console.log(res)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
