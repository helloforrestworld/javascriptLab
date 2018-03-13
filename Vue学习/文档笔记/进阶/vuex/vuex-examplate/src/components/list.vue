<template>
    <ul class="list">
      <li 
        v-for="item in data"
        @mousedown = "getValue(item)"
      >{{item}}</li>
    </ul>
</template>

<script>
export default {
  props:['data'],
  methods: {
    getValue(item) {
      this.$emit('get-value',item)
    }
  }
}
</script>
