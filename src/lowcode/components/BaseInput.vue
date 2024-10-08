<!--
 * new page
 * @author: blue
 * @since: 2024-10-08
 * BaseInput.vue
-->
<script setup lang="ts">
// 定义一个低代码的基础Input组件
const props = defineProps<{
  inputVal: string
  placeholder: string
  options: any
}>()
</script>

<template>
  <div class="container">
    <el-input  placeholder="请输入内容" />
  </div>
</template>

<style scoped></style>
