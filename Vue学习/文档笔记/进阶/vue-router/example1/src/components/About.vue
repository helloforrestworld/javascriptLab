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
  </div>
</template>
<script>
export default {
  name: "about",
  data: () => ({

  })
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