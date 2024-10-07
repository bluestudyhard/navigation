<!--
 * new page
 * @author: blue
 * @since: 2024-10-07
 * CategoryItem.vue
-->
<script setup lang="ts">
const props = defineProps<{
  item: {
    icon: string
    label: string
  }
}>()
</script>

<template>
  <div class="container p-.4rem w-33.3% cursor-pointer">
    <div class="_fc-l-icon w-full flex-col flex items-center justify-center">
      <i class="fc-icon" :class="item.icon || 'icon-input'" />
      <span class="font-size-12px">
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
