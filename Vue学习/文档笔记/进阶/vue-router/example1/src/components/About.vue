<template>
  <div id="about">
    <p>about</p>
    <a href="https://less.bootcss.com/">less</a>
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
  a{
    color: @skyblue
  }
}
</style>