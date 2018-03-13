<template>
    <section class="warp">
      <div class="searchIpt clearFix">
        <select-input :show-list.sync="listShow" :value="value"></select-input>
        <list v-show="listShow" @get-value = "changeValue"></list>
      </div>
    </section>
</template>

<script>

import selectInput from '@/components/selectInput'
import list from '@/components/list'


export default {
  data(){
      return {
        listShow: false,
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
