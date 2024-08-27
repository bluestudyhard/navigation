<!-- eslint-disable vue/one-component-per-file -->
<script lang="ts" setup>
import { Table } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import type { UnwrapRef } from 'vue'
import type { TableColumnType } from 'ant-design-vue'
import type { bookmarkTempType, websiteType } from '@/types/index'
import { fetchMeta } from '@/utils/fetchMeta'
import { screenShot } from '@/utils/screenShot'
import websitesStore from '@/stores/websites'
import { renderColumnAll } from '@/composable/atableColumn'

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
    weight: bookmark.weight || 0,
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
const columns: TableColumnType<bookmarkTempType>[] = [
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
    resizable: true,
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
    defaultSortOrder: 'ascend',
    sorter: (a: bookmarkTempType, b: bookmarkTempType) => {
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
 * @description: 多选操作
 */

const selectedRowKeys = ref<bookmarkTempType['key'][]>([]) // Check here to configure the default column
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
 * - editableLine: 用于存储编辑行的数据
 * - UNwrapRef: 用于解包ref 将数据类型转换为普通对象，也就是不需要使用.value来获取数据
 *
 */
const editableLine: UnwrapRef<Record<string, bookmarkTempType>> = reactive({})
function edit(key: string) {
  editableLine[key] = cloneDeep(bookmarks.value.filter(item => key === item.key)[0])
}
/**
 * @description: 保存编辑行
 * - save: 保存编辑行的数据
 * - 使用asign方法，浅拷贝一层以不直接修改原数据
 */

function save(key: string) {
  // console.log('save', key)
  // 如果保存时，检查仓库数据中是否存在该数据，如果不存在则添加，存在则更新
  const keys = Object.keys(editableLine[key])

  if (!Object.keys(store.websiteList[1].bookmarks[0]).every(item => keys.includes(item))) {
    // 找到仓库中不存在的key
    const key = keys.filter(item => !Object.keys(store.websiteList[1].bookmarks[0]).includes(item)).filter(item => item !== 'key')
    console.log('key', key)
    store.addDefaultKey(key)
    // bookmarks.value.push(editableLine[key])
    // delete editableLine[key]
  }
  // if (!Object.keys(store.websiteList[0].bookmarks).includes(key))

  // bookmarks.value.push(editableLine[key])
  // store.addDefaultKey(editableLine[key])
  // delete editableLine[key]
  // return

  // bookmarks.value.push(editableLine[key])

  Object.assign(bookmarks.value.filter(item => key === item.key)[0], editableLine[key])
  // 更新仓库数据
  store.updateBookMarkList(editableLine[key])
  delete editableLine[key]
}
/**
 * @description: 取消编辑行
 */
function cancel(key: string) {
  // console.log('cancel', key)
  delete editableLine[key]
}
function onRowDblClick(record: bookmarkTempType) {
  edit(record.key!)
}
const websiteSearch = ref('')
/**
 * @description: 表格搜索，根据书签名称进行检索
 */
const bookmarkResult = computed(() => {
  if (!websiteSearch.value)
    return bookmarks.value

  return bookmarks.value.filter(bookmark =>
    bookmark.bookmarkWebsiteTitle.includes(websiteSearch.value),
  )
})
/**
 * @description: 可伸缩列
 */
function handleResizeColumn(w: number, col: TableColumnType<bookmarkTempType>) {
  col.width = w
}
/**
 * @description:导出书签
 */
function exportBookmarks() {
  store.exportBookMark()
}
/**
 * @description: 替换浏览器的收藏行为，将书签保存到本地
 */

/**
 * @description: 收藏弹窗
 */
const bookmarkModal = ref(false)
function openBookmarkModal() {
  bookmarkModal.value = true
}
/**
 * @description: ctrl+b快捷键打开收藏弹窗
 */
onMounted(() => {
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'b')
      openBookmarkModal()
  })
})
/**
 * @description: 获取网站的meta信息-head头
 */
const spinning = ref(false)
const bookmarkForm: bookmarkTempType = reactive({
  bookmarkName: '',
  bookmarkWebsiteUrl: '',
  bookmarkWebsiteIcon: '',
  bookmarkWebsiteTitle: '',
})
const previewScreenShot = ref('')
async function fetchMetaInfo(url: string) {
  try {
    spinning.value = true
    const metaInfo = await fetchMeta(url)
    bookmarkForm.bookmarkWebsiteTitle = metaInfo?.bookmarkWebsiteTitle || '暂时无法获取'
    bookmarkForm.bookmarkWebsiteIcon = metaInfo?.bookmarkWebsiteIcon || '/default.png'
    previewScreenShot.value = await screenShot(bookmarkForm.bookmarkWebsiteUrl) || '/default.png'
  }
  finally {
    spinning.value = false
  }
}
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
  {{ editableLine }}
  <a-modal v-model:open="bookmarkModal" title="编辑收藏夹" width="30%">
    <a-spin :spinning="spinning">
      <a-form :model="bookmarkForm">
        <a-form-item label="名称">
          <a-input v-model:value="bookmarkForm.bookmarkWebsiteTitle" />
        </a-form-item>
        <a-form-item label="链接">
          <a-input v-model:value="bookmarkForm.bookmarkWebsiteUrl" @blur="fetchMetaInfo(bookmarkForm.bookmarkWebsiteUrl)" />
        </a-form-item>
        <a-form-item label="图标">
          <img :src="bookmarkForm.bookmarkWebsiteIcon" alt="" w="1rem" h="1rem">
        </a-form-item>
        <a-form-item label="页面预览">
          <a-image :src="previewScreenShot" :width="100" :height="100" class="items-center" />
        </a-form-item>
        <a-form-item label="父级">
          <a-select>
            <a-select-option v-for="item in filters" :key="item.text" :value="item.value">
              {{ item.text }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
  <a-button @click="exportBookmarks">
    导出书签
  </a-button>
  <div class="container flex-col">
    <div class="w-20% m-l-auto">
      <a-input-search
        v-model:value="websiteSearch"
        placeholder="输入文字即可搜索"
        enter-button
      />
    </div>
    <div class="table-container">
      <a-table
        :columns="columns"
        :data-source="bookmarkResult"
        :scroll="{ y: 450 }"
        :pagination="{ defaultPageSize: 50 }"
        :row-selection="rowSelection"
        @row-dblclick="onRowDblClick"
        @resize-column="handleResizeColumn"
      >
        <template #bodyCell="{ column, text, record }">
          <render-column-all
            :column="column" :text="text" :record="record"
            :editable-line="editableLine"
            :save="save"
            :cancel="cancel"
            :edit="edit"
          />
        </template>
      </a-table>
    </div>
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

<style lang="scss">
.multi-ellipsis{
  width: 100%;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1 ; // 超出x行则以...形式隐藏
  -webkit-box-orient: vertical;
  cursor: pointer;
}
</style>
