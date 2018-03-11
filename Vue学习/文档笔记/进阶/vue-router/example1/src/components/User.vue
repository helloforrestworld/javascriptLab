<template>
  <div id="user">
    我是user
    <div class="user-list">
      <router-link active-class="nav-active" style="margin-left:40px" v-for="item,index in userList" :to="'/user/'+item.id" :key = "index">{{item.name}}</router-link>
    </div>
  </div>
</template>
<script>
var data = [
  {name:'Heisenberg','hobby':'cook',id:1,age:54},
  {name:'BarneyStinsen','hobby':'banging',id:2,age:34},
  {name:'Ted','hobby':'tell story',id:3,age:33},
]
export default {
  name: "user",
  data: () => ({
    userList:data
  }),
  created() {
    console.log(this.$route.params.userId)
  }
}
</script>
<style scoped>
</style>