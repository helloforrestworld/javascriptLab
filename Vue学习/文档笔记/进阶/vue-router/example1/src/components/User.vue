<template>
  <div id="user">
    我是user
    <div class="user-list">
      <router-link active-class="nav-active" style="margin-left:40px" v-for="item,index in userList" :to="{path:'/user/'+item.type+'/'+item.id,query:{info:'follow'}}" :key = "index">{{item.name}}</router-link>
    </div>
    <hr>
    <div class="message" v-if="userInfo.name">
      <ul style="font-size:26px">
        <li>姓名:{{userInfo.name}}</li>
        <li>年龄:{{userInfo.age}}</li>
        <li>爱好:{{userInfo.hobby}}</li>
      </ul>
      <router-link  active-class="nav-active" style="font-size:26px; color:rgb(78, 133, 218)"exact to="?info=follow">他的关注</router-link>
      <router-link active-class="nav-active" style="font-size:26px;color:rgb(78, 133, 218)" exact to="?info=share">他的分享</router-link>
      <p>{{$route.query}}</p>
    </div>
    
  </div>
</template>
<script>
var data = [
  {name:'Heisenberg','hobby':'cook',id:1,age:54,type:'vip'},
  {name:'BarneyStinsen','hobby':'banging',id:2,age:34,type:'vip'},
  {name:'Ted','hobby':'tell story',id:3,age:33,type:'common'},
]
export default {
  name: "user",
  data: () => ({
    userList:data,
    userInfo:{}
  }),
  created() {
    this.getData()
  },
  watch:{
    $route(){
      this.getData()
    }
  },
  methods: {
    getData() {
      var id = this.$route.params.userId;
      if(id){
        this.userInfo = this.userList.filter((item)=>{
          return item.id == id 
        })[0]
      }else{
        this.userInfo = {}
      }
    }
  }
}
</script>
<style scoped>
</style>