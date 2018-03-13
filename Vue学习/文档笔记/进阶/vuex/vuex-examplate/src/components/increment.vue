<template>
  <div id="increment">
    <h2>简易计算器</h2>
    <div>
      <button type="button" name="button" @click="deIncrement({deNum:10})">-</button>
      <span>{{count}}</span>
      <button type="button" name="button" @click="addIncrement">+</button>
    </div>
    <p>{{filterCount}}</p>
    d1:{{d1}}
    自己的d2:{{d2}}
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: "increment",
  data: () => ({
    
  }),
  // computed:mapState({
  //   // selfCount:'count',
  //   secondCount:'count',
  //   // selfCount(state){
  //   //   return state.count
  //   // }
  //   // selfCount:(state)=>(state.count)
  // }),
  // computed:mapState(['count','d1']),
  computed:{
    ...mapState(['count','d1']),
    ...mapGetters(['filterCount']),
    d2:()=> 123,
    // filterCount(){
    //   return this.$store.getters.filterCount
    // }
  },
  methods: {
    // addIncrement () {
    //   // 提交mutations
    //   // this.$store.commit('addIncrement',{addNum:5})
    //   // 异步的提交actions
    //   this.$store.dispatch('addAction')
    // },
    // deIncrement(){
    //   this.$store.commit({
    //     type:'deIncrement',
    //     deNum:10
    //   })
    // },
    ...mapMutations(['deIncrement']),
    ...mapActions({
      addIncrement:'addAction'
    })
  }
}
</script>
<style scoped>
  #increment h2{
    color: rgb(39, 125, 157);
    font-size: 40px;
  }
  #increment button{
    width: 40px;
    height: 40px;
    border-radius: 8px;
    font-size: 24px;
  }
  #increment span{
    font-size: 24px;
  }
</style>