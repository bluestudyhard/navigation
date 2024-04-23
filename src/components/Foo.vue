<script setup lang='ts'>
import { ref } from 'vue'

const name = ref('jack')
</script>

<template>
  <input v-model="name" type="text">
  <h1>成功unplugin!</h1>
</template>

<style lang="scss">
input {
  color: #333;
}
</style>
