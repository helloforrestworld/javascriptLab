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
          :to="{path:'/doc'}" 
          exact 
          tag="li"
          active-class="nav-active"
        >
          <span>Document</span>
        </router-link>
        <router-link 
          to="/about" 
          exact 
          tag="li"
          active-class="nav-active"
        >
          <span>About</span>
        </router-link>
      </ul>
    </div>
    <router-view class="center"/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
</style>
