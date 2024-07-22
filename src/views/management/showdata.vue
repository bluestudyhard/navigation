<!--
 * new page
 * @author: blue
 * @since: 2024-07-13
 * showdata.vue
-->
<script setup lang="ts">
import BookmarkExpandTable from '@/components/manage/BookmarkExpandTable.vue'
import BookmarkTable from '@/components/manage/BookmarkTable.vue'
import type { TableOption, bookmarkTempType, websiteType } from '@/types/index'

import websitesStore from '@/stores/websites'

/**
 * @description: 处理书签的数据
 */
const store = websitesStore()
const websites = ref<websiteType[]>([])
websites.value = store.websiteList
const bookmarks = ref<bookmarkTempType[]>([])
bookmarks.value = store.websiteList.flatMap(item =>
  item.bookmarks.map(bookmark => ({
    bookmarkName: item.bookmarkName,
    bookmarkWebsiteTitle: bookmark.bookmarkWebsiteTitle,
    bookmarkWebsiteUrl: bookmark.bookmarkWebsiteUrl,
    bookmarkWebsiteIcon: bookmark.bookmarkWebsiteIcon,
  })),
)
/**
 * @description: 表格配置
 */
const option = ref<TableOption>()
option.value = {
  index: true,
  column: [
    {
      label: '父级',
      prop: 'bookmarkName',
      width: 80,

    },
    {
      label: '书签名称',
      prop: 'bookmarkWebsiteTitle',
    },
    {
      label: '书签url',
      prop: 'bookmarkWebsiteUrl',
    },
    {
      label: '图标',
      prop: 'bookmarkWebsiteIcon',
      type: 'image',
      width: 80,
    },
    {
      label: '创建时间',
      prop: 'bookmarkCreateTime',
      width: 150,
    },
    {
      label: '更新时间',
      prop: 'bookmarkUpdateTime',
      width: 150,
    }],
}
const tableMode = ref('default')
/**
 * @description: 分页
 */
const pagination = ref({
  currentPage: 1,
  pageSize: 50,
  total: 0,
})
/**
 * @description: 分页bookmarks
 */
const bookmarksPage = computed(() => {
  const { currentPage, pageSize } = pagination.value
  return bookmarks.value.slice((currentPage - 1) * pageSize, currentPage * pageSize)
})
</script>

<template>
  <div class="container">
    <div>
      <el-button>add</el-button>
    </div>
    <el-tabs v-model="tableMode" class="demo-tabs">
      <el-tab-pane label="默认" name="default">
        <BookmarkTable
          :bookmarks-page="bookmarksPage"
          :option="option!"
          :total="bookmarks.length"
          @get-current-page="(val) => pagination = val"
        />
      </el-tab-pane>
      <el-tab-pane label="折叠" name="expand">
        <BookmarkExpandTable :websites="websites" :option="option!" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped></style>
