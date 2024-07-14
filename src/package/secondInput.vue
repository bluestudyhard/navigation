<!--
 * new page
 * @author: blue
 * @since: 2024-06-02
 * secondInput.vue
-->
<script setup lang="ts">
import { ref, useAttrs, useSlots } from 'vue'
import { ElDialog, ElInput } from 'element-plus'

const attrs = useAttrs()
console.log(attrs)
const inputValue = ref('')
const slots = useSlots()
</script>

<template>
  <ElDialog v-bind="$attrs">
    <ElInput v-model="inputValue" />
    <!-- 根据传入多少的slot来定义 首先会检查到底有没有相应的slot -->
    <template v-for="(item, key, i) in slots" :key="i" #[key]="slot">
      <slot :name="key" v-bind="slot" />
    </template>
  </ElDialog>
</template>

<style scoped></style>
