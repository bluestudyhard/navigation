<!--
 * new page
 * @author: blue
 * @since: 2024-10-08
 * BaseInput.vue
-->
<script setup lang="ts">
import { inputConfig } from '@/lowcode/config/inputConfig'

// 定义一个低代码的基础Input组件
const props = defineProps<{
  config: any
}>()
const { textConfig } = inputConfig
</script>

<template>
  <div class="container">
    <el-input placeholder="请输入内容" />
  </div>
</template>

<style scoped></style>
