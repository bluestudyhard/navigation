<!--
 * new page
 * @author: blue
 * @since: 2024-08-15
 * PreViewUrl.vue
-->
<script setup lang="ts">
const props = defineProps<{
  websiteUrl: string
  previewUrl: string
}>()
</script>

<template>
  <div class="container">
    <a-popover placement="topRight" trigger="hover">
      <template #content>
        <a-image
          :src="previewUrl"
          rounded-1
          width="15rem"
          height="15rem"
        />
      </template>
      <a :href="websiteUrl" target="_blank"> <span class="multi-ellipsis">{{ websiteUrl }}</span></a>
    </a-popover>
  </div>
</template>

<style scoped lang="scss">
.multi-ellipsis{
  width: 100%;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 超出x行则以...形式隐藏
  -webkit-box-orient: vertical;
  cursor: pointer;
}
</style>
