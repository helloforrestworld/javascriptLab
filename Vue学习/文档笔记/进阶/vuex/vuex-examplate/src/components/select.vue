<template>
    <section class="warp">
      <div class="searchIpt clearFix">
        <select-input :show-list.sync="listShow" :value="value"></select-input>
        <list :data="data" v-show="listShow" @get-value = "changeValue"></list>
      </div>
    </section>
</template>

<script>

import selectInput from '@/components/selectInput'
import list from '@/components/list'

let data = ['javascript','vue','react','jquery']

export default {
  data(){
      return {
        listShow: false,
        data:data,
        value:''
      }
  },
  methods: {
    changeValue(item){
      this.value = item
    }
  },
  components: {
    selectInput,
    list
  }
}
</script>
