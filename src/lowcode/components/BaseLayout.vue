<!--
 * new page
 * @author: blue
 * @since: 2024-10-30
 * BaseLayout.vue
-->
<script setup lang="ts">
const props = defineProps<{
  modelValue: any
}>()
</script>

<template>
  <div class="container">
    <el-row gutter="10">
      <el-col :span="12" class="bg-#E5E9F2 rounded-2 min-h-2rem">
        <slot />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
