<!--
 * new page
 * @author: blue
 * @since: 2024-07-02
 * BookMarkFolderItem.vue
-->
<script setup lang="ts">
import type { bookmarkTempType } from '@/types/website'

const props = defineProps<{
  bookmark: bookmarkTempType
}>()
</script>

<template>
  <div
    style="user-select: none;"
    class="flex items-center"
  >
    <img
      :src="props.bookmark.bookmarkWebsiteIcon ? props.bookmark.bookmarkWebsiteIcon : '/default.png'"
      alt=""
      class="w-3 h-3 m-2 select-none rounded-.5"
    >
    <span font-size="3" whitespace-nowrap text-ellipsis>
      {{
        props.bookmark.bookmarkWebsiteTitle
          ? props.bookmark.bookmarkWebsiteTitle.slice(0, 18)
          : props.bookmark.bookmarkWebsiteTitle
      }}
    </span>
  </div>
</template>

<style scoped lang="scss">

</style>
