<!--
 * new page
 * @author: blue
 * @since: 2024-07-03
 * folder.vue
-->
<script setup lang="ts">
import Upload from '@/components/Upload.vue'
import BookMarkFolder from '@/components/folder/BookMarkFolder.vue'
import type { websiteType } from '@/types/website'

import websitesStore from '@/stores/websites'

const store = websitesStore()
const bookmarks = ref<websiteType[]>([])
bookmarks.value = store.websiteList
</script>

<template>
  <div class="container p-4" w="full" h="100%" bg="#F6FAFD">
    <h1>1</h1>
    <Upload />
    <BookMarkFolder :bookmarks="bookmarks" />
  </div>
</template>

<style scoped lang="scss">
.folder-item {
  box-shadow:  1px 3px 6px 2px rgb(161 162 163 / 17%);
}
.border-span {
    height: .18rem;
    width: 1rem;
    margin-top: .4rem;
    border-radius: 1rem;
    background-color: #5bc92f;
    }
</style>
