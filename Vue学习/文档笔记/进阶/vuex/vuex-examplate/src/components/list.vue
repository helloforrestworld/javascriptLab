<template>
    <ul class="list">
      <li 
        v-for="item in list"
        @mousedown = "changeValue(item)"
      >{{item.title}}</li>
    </ul>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const {mapState} = createNamespacedHelpers('selectMoudle')
// import {mapState} from 'vuex'
export default {
  computed:{
    // data(){
    //   return this.$store.state.selectMoudle.list
    // }
    // ...mapState({
    //    data: state => state.selectMoudle.list
    //  })
     // ...mapState('selectMoudle',['list'])
    ...mapState(['list'])
  },
  methods: {
    changeValue(item) {
      this.$store.commit('selectMoudle/changeValue',{title:item.title})
    }
  },
  created() {
    //do something after creating vue instance
    this.$store.dispatch('selectMoudle/getList',1)
  }
}
</script>
