<script lang="ts" setup>
import { Table } from 'ant-design-vue'
import type { bookmarkTempType, websiteType } from '@/types/index'

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
    createTime: bookmark.createTime || '',
    updateTime: bookmark.updateTime || '',
  })),
)
//
// const emit = defineEmits(['getCurrentPage', 'emitTableRef'])
const columns = [

  {
    title: '父级',
    key: 'bookmarkName',
    dataIndex: 'bookmarkName',
    width: 60,
    align: 'center',
  },
  {
    title: '书签名称',
    key: 'bookmarkWebsiteTitle',
    dataIndex: 'bookmarkWebsiteTitle',
    width: 150,
  },
  {
    title: '书签url',
    key: 'bookmarkWebsiteUrl',
    dataIndex: 'bookmarkWebsiteUrl',
    width: 150,
  },
  {
    title: '图标',
    key: 'bookmarkWebsiteIcon',
    dataIndex: 'bookmarkWebsiteIcon',
    type: 'image',
    align: 'center',
    width: 80,
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    width: 100,
  },
  {
    title: '更新时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    width: 100,
  },
  {
    title: '权重',
    key: 'weight',
    dataIndex: 'weight',
    width: 80,
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
  },
]

const pagination = ref(
  {
    currentPage: 1,
    pageSize: 50,
    showSizeChanger: true,
    pageSizeOptions: ['20', '50', '100'],
  },
)

/**
 * @description: 传递分页数据
 */

function handlePageChange(page: number, pageSize: number) {
  pagination.value.currentPage = page
  pagination.value.pageSize = pageSize
  // emit('getCurrentPage', {
  //   ...pagination.value,
  // })
}
const bookmarksPage = computed(() => {
  const { currentPage, pageSize } = pagination.value
  const start = (currentPage - 1) * pageSize
  const end = currentPage * pageSize
  return bookmarks.value.slice(start, end)
})

/**
 * @description: 多选操作
 */

interface DataType {
  key: string | number
}
const selectedRowKeys = ref<DataType['key'][]>([]) // Check here to configure the default column

function onSelectChange(changableRowKeys) {
  console.log('selectedRowKeys changed: ', changableRowKeys)
  selectedRowKeys.value = changableRowKeys
}

const rowSelection = computed(() => {
  return {
    selectedRowKeys: selectedRowKeys.value,
    onChange: onSelectChange,
    hideDefaultSelections: true,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  }
})
</script>

<template>
  <!--
 atable的插槽
 #bodyCell，表示非表头的单元格插槽
 #headerCell，表示表头的单元格插槽

-->

  <div class="table-container flex flex-col">
    <a-table
      :columns="columns"
      :data-source="bookmarksPage"
      :scroll="{ y: 500 }"
      :pagination="false"
      :row-selection="rowSelection"
    >
      <template #bodyCell="{ column, record }">
        <span v-if="column.type === 'image'">
          <img :src="record[column.dataIndex]" rounded-1 w="1rem" h="1rem">
        </span>
        <span v-else>
          <a-tooltip placement="top" :title="record[column.dataIndex]" color="#108ee9">
            <span class="multi-ellipsis">{{ record[column.dataIndex] }}</span>
          </a-tooltip>
        </span>
      </template>
    </a-table>
    <a-pagination
      :current="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="bookmarks.length"
      :show-size-changer="true"
      :page-size-options="pagination.pageSizeOptions"
      class="mt-2 flex justify-end"
      @change="handlePageChange"
    />
  </div>
</template>

<style scoped lang="scss">
.multi-ellipsis{
  width: 100%;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:1; // 超出x行则以...形式隐藏
  -webkit-box-orient: vertical;
  cursor: pointer;
}
</style>
