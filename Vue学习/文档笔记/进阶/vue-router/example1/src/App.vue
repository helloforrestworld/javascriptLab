<template>
  <div id="app">
    <div class="nav-box">
      <ul class="nav">
        <router-link 
          to="/" 
          exact 
          tag="li"
          active-class="nav-active"
        >
          <i class="fa fa-home"></i>
          <span>Home</span>
        </router-link>
        <router-link 
          :to="{path:'/doc#abc'}" 
          tag="li"
          active-class="nav-active"
        >
          <span>Document</span>
        </router-link>
        <router-link 
          to="/about" 
          tag="li"
          active-class="nav-active"
        >
          <span>About</span>
        </router-link>
        <router-link 
          to="/user" 
          tag="li"
          active-class="nav-active"
        >
          <span>User</span>
        </router-link>
      </ul>
    </div>
    <div style="position:absolute;top:120px;z-index:99">
      <input type="button" value="后退" @click = "backHandle">
      <input type="button" value="前进" @click = "forwardHandle">
      <input type="button" value="前进2步" @click = "goHandle(2)">
      <input type="button" value="后退2步" @click = "goHandle(-2)">
      <input type="button" value="push" @click = "pushHandle">
      <input type="button" value="replace" @click = "replaceHandle">
    </div>
    <!-- <transition mode="in-out"> -->
    <!-- <transition :name="transtionName">
      <router-view class="slider" name="slider"/>
    </transition> -->
    <transition :name="transtionName">
      <router-view class="center"/>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      transtionName:''
    }
  },
  watch:{
    $route(to,from){
      if(to.meta.index < from.meta.index){
        this.transtionName = 'right'
      }else{
        this.transtionName = 'left'
      }
    }
  },
  methods: {
    backHandle() {
      this.$router.back() //后退一步
    },
    forwardHandle(){
      this.$router.forward() //前进一步
    },
    goHandle(step){
      this.$router.go(step) //前进后退指定步数
    },
    pushHandle(){
      this.$router.push({path:'/doc#abc',query:'1111'})//跳转到指定导航 并添加历史记录
    },
    replaceHandle(){
      this.$router.replace({path:'/about'})//替代先前一条的历史记录
    }
  }
}
</script>

<style>
  .v-enter{
    opacity: 0;
  }
  .v-enter-to{
    opacity: 1;
  }
  .v-enter-active{
    transition: 500ms;
  }
  .v-leave{
    opacity: 1;
  }
  .v-leave-to{
    opacity: 0;
  }
  .v-leave-active{
    transition: 500ms;
  }
  .left-enter{
    transform: translateX(100%);
  }
  .left-enter-to{
    transform: translateX(0);
  }
  .left-enter-active{
    transition: 500ms;
  }
  .left-leave{
    transform: translateX(0);
  }
  .left-leave-to{
    transform:translateX(-100%);
  }
  .left-leave-active{
    transition: 500ms;
  }
  
  
  .right-enter{
    transform: translateX(-100%);
  }

  .right-enter-active,.right-leave-active{
    transition: 500ms;
  }

  .right-leave-to{
    transform: translateX(100%);
  }

</style>
