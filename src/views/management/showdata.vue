<!--
 * new page
 * @author: blue
 * @since: 2024-07-13
 * showdata.vue
-->
<script setup lang="ts">
import type { bookmarkTempType, websiteType } from '@/types/website'

import websitesStore from '@/stores/websites'

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
const option = ref()
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
function handleClick(tab: any) {
  console.log(tab)
}
console.log(bookmarks.value)
</script>

<template>
  <div class="container">
    <h1>书签管理temp</h1>
    <el-tabs class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="默认" name="default">
        <el-table :data="bookmarks" height="600">
          <el-table-column type="selection" width="55" />
          <el-table-column
            v-for="item in option.column"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
          >
            <!-- 如果prop为icon  scope表示父组件传递给这个插槽的数据 -->
            <template v-if="item.type === 'image'" #default="scope">
              <img :src="scope.row[item.prop]" alt="" style="width: 20px; height: 20px">
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="折叠" name="expand">
        <el-table :data="websites" height="500px">
          <!-- default-expand-all -->
          <el-table-column type="selection" width="55" />
          <el-table-column prop="bookmarkName" label="父级" class="bg-amber" />
          <!-- 多选 -->
          <el-table-column type="expand">
            <template #default="props">
              <el-table :data="props.row.bookmarks">
                <el-table-column type="selection" width="55" />
                <el-table-column
                  v-for="item in option.column"
                  :key="item.prop"
                  :label="item.label"
                  :prop="item.prop"
                  :width="item.width"
                >
                  <!-- 如果prop为icon  scope表示父组件传递给这个插槽的数据 -->
                  <template v-if="item.type === 'image'" #default="scope">
                    <img :src="scope.row[item.prop]" alt="" style="width: 20px; height: 20px">
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped></style>
