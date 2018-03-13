<template>
    <div class="clearFix">
      <input
        class="keyWord"
        @focus="showList"
        @blur = "hideList"
        :value = "title"
      />
      <input type="button" value="GO">
      <span></span>
    </div>
</template>

<script>

export default {
  props:['value'],
  computed:{
    title(){
      return this.$store.state.selectMoudle.title
    }
  },
  methods: {
    showList(){
      this.$emit('update:showList',true)
    },
    hideList(){
      this.$emit('update:showList',false)
    }
  }
}
</script>
