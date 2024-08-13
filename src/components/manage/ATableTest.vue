<script lang="ts" setup>
import { Table } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import type { UnwrapRef } from 'vue'
import type { TableColumnType } from 'ant-design-vue'
import type { bookmarkTempType, websiteScreenshotType, websiteType } from '@/types/index'

import websitesStore from '@/stores/websites'
import { saveBookmarksScreenshot, screenShot } from '@/utils/screenShot'

interface TableDataType extends bookmarkTempType {

}
/**
 * @description: 处理书签的数据
 */
const store = websitesStore()
const websites = ref<websiteType[]>([])
websites.value = store.websiteList
const bookmarks = ref<bookmarkTempType[]>([])
bookmarks.value = store.websiteList.flatMap(item =>
  item.bookmarks.map(bookmark => ({
    key: bookmark.bookmarkWebsiteUrl,
    bookmarkName: item.bookmarkName.toLocaleLowerCase(),
    bookmarkWebsiteTitle: bookmark.bookmarkWebsiteTitle,
    bookmarkWebsiteUrl: bookmark.bookmarkWebsiteUrl,
    bookmarkWebsiteIcon: bookmark.bookmarkWebsiteIcon,
    createTime: bookmark.createTime || '',
    updateTime: bookmark.updateTime || '',
  })),
)
/**
 * @description: 配置书签筛选项——bookmarkName
 */
const filters = ref(
  websites.value.map(item => ({
    text: item.bookmarkName,
    value: item.bookmarkName.toLocaleLowerCase(),
  })),
)

/**
 * @description: 表格配置列
 */
const columns: TableColumnType<TableDataType>[] = [
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
    filters: filters.value,
    // filterMode: 'tree',
    filterSearch: (input, filter) => (filter.value as string).includes(input),
    onFilter: (value, record) => {
      // console.log(value)
      return record.bookmarkName.includes(value as string)
    },
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
    // defaultSortOrder: 'descend',
    sorter: (a: TableDataType, b: TableDataType) => {
      const dateA = a.updateTime ? new Date(a.updateTime).getTime() : 0
      const dateB = b.updateTime ? new Date(b.updateTime).getTime() : 0
      return dateB - dateA
    },
  },
  {
    title: '权重',
    key: 'weight',
    dataIndex: 'weight',
    width: 80,
  },
  {
    title: 'operation',
    key: 'operation',
    width: 80,
  },
]

/**
 * @description: 传递分页数据 勾八官方自带分页
 */

/**
 * @description: 多选操作
 */

const selectedRowKeys = ref<DataType['key'][]>([]) // Check here to configure the default column
interface DataType {
  key: string
  name: string
  age: number
  address: string
}
function onSelectChange(changableRowKeys: string[]) {
  // console.log('selectedRowKeys changed: ', changableRowKeys)
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
/**
 * @description: 多选后的书签
 */
const selectedBookmarks = computed(() =>
  bookmarks.value.filter(bookmark => selectedRowKeys.value.includes(bookmark.key!)),
)
/**
 * @description: 编辑行
 */
const editableData: UnwrapRef<Record<string, bookmarkTempType>> = reactive({})
function edit(key: string) {
  editableData[key] = cloneDeep(bookmarks.value.filter(item => key === item.key)[0])
}
function save(key: string) {
  // console.log('save', key)
  // 如果保存时，发现原数据里面没有这个key，说明是新增的数据，直接添加这个数据字段到书签里
  
  Object.assign(bookmarks.value.filter(item => key === item.key)[0], editableData[key])
  // 更新仓库数据
  store.updateBookMarkList(editableData[key])
  delete editableData[key]
}
function cancel(key: string) {
  // console.log('cancel', key)
  delete editableData[key]
}
function onRowDblClick(record: bookmarkTempType) {
  edit(record.key!)
}
/**
 * @description: 测试截图
 */

async function testScreenShot() {
  await saveBookmarksScreenshot(bookmarks.value)
  // console.log(res)
}
/**
 * @description: 获取所有网站的预览图
 */
const screenShotList = ref<websiteScreenshotType[]>([])
onMounted(async () => {
  screenShotList.value = store.getScreenShotUrlList()
  // console.log(screenShotList.value)
})
</script>

<template>
  <!--
 atable的插槽
 #bodyCell，表示非表头的单元格插槽
 #headerCell，表示表头的单元格插槽

-->
  <!--
使用多选的前提是数据里面有key字段，这个字段是必须的
-->
  <a-button @click="testScreenShot">
    test 截图
  </a-button>
  <div class="table-container flex flex-col">
    <a-table
      :columns="columns"
      :data-source="bookmarks"
      :scroll="{ y: 450 }"
      :pagination="{ defaultPageSize: 100 }"
      :row-selection="rowSelection"
      @row-dblclick="onRowDblClick"
    >
      <template #bodyCell="{ column, text, record }">
        <span v-if="column.type === 'image'">
          <img :src="record[column.dataIndex]" rounded-1 w="1rem" h="1rem">
        </span>
        <span v-else-if="column.key === 'operation'">
          <div class="editable-row-operations">

            <span v-if="editableData[record.key]" class="flex gap-2">
              <a-typography-link @click="save(record.key)">Save</a-typography-link>
              <a-typography-link @click="cancel(record.key)">Cancel</a-typography-link>
            </span>
            <span v-else>
              <a @click="edit(record.key)">Edit</a>
            </span>
          </div>
        </span>
        <span v-else>
          <span v-if="column.dataIndex === 'bookmarkWebsiteUrl' ">

            <!-- <a-tooltip placement="top" :title="record[column.dataIndex]" color="#108ee9">

              <a-image :src="screenShotList.find(item => item.bookmarkWebsiteUrl === record[column.dataIndex])?.screenshotUrl" rounded-1 w="0.2rem" h="0.2rem" />
            </a-tooltip> -->
            <a-popover placement="topRight" trigger="hover">
              <template #content>
                <a-image
                  :src="screenShotList.find(item => item.bookmarkWebsiteUrl === record[column.dataIndex])?.screenshotUrl"
                  rounded-1
                  width="15rem"
                  height="15rem"
                />
              </template>
              <a :href="record[column.dataIndex]" target="_blank"> <span class="multi-ellipsis">{{ record[column.dataIndex] }}</span></a>
            </a-popover>
          </span>
          <span v-else-if="column.dataIndex === 'bookmarkWebsiteTitle'">
            <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
            />
            <span v-else class="multi-ellipsis">{{ record[column.dataIndex] }}</span>
          </span>
          <span v-else-if="editableData[record.key]">
            <!-- 这里再加一个:value是因为要绑定数据到input的value里，不然默认是空的 -->
            <a-input
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
            />
            <!-- {{ editableData[record.key][column.dataIndex] }} -->
          </span>
          <span v-else>{{ text }} </span>
        </span>
        <!-- 添加编辑行 -->
      </template>
    </a-table>
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
