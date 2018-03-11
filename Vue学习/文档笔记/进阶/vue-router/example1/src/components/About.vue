<template>
  <div id="about">
    <p>about</p>
    <a class="toless" href="https://less.bootcss.com/">less</a>
    <hr>
    <ul class="nav">
      <router-link :to="{name:'about'}" tag="li" exact active-class="nav-active">
        <a>study</a>
      </router-link>
      <router-link :to="{name:'work'}" tag="li" active-class="nav-active">
        <a>work</a>
      </router-link>
      <router-link :to="{name:'hobby'}" tag="li" active-class="nav-active">
        <a>hobby</a>
      </router-link>
    </ul>
    <hr>
    <router-view></router-view>
    测试数据::{{text}}
  </div>
</template>
<script>
export default {
  name: "about",
  data: () => ({
    text:'没改变'
  }),
  beforeCreate(){
    // console.log('beforeCreate')
  },
  beforeRouteEnter(to,from,next){
    // console.log('beforeRouteEnter')
    // console.log(this) //undefined 实例还没加载完
    next((vm)=>{
      vm.text = '改变了'// 接受回调 异步改变
    })
  },
  beforeRouteUpdate(to,from,next){
    // console.log('beforeRouteUpdate')
    next()
  },
  beforeRouteLeave(to,from,next){
    // 路由切换走之前  例如数据还没计算好不让切换到别的路由
    // console.log('beforeRouteLeave');
    next()
  }
}
</script>
<style lang="less" scoped>
@org:rgb(228, 113, 6);
@skyblue:rgb(33, 171, 208);
#about{
  p{
    color:@org
  }
  .toless{
    color: @skyblue
  }
}
</style>