<!-- eslint-disable vue/one-component-per-file -->
<script lang="ts" setup>
import { Image, Input, Popover, Table, Typography } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import type { UnwrapRef } from 'vue'
import type { TableColumnType } from 'ant-design-vue'
import type { bookmarkTempType, websiteScreenshotType, websiteType } from '@/types/index'

import websitesStore from '@/stores/websites'
import { saveBookmarksScreenshot, screenShot } from '@/utils/screenShot'

interface recordType extends bookmarkTempType {
  [key: string]: string | number | boolean | undefined
}
interface columnType extends bookmarkTempType {
  dataIndex: string | number
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
 */
const editableLine: UnwrapRef<Record<string, bookmarkTempType>> = reactive({})
function edit(key: string) {
  editableLine[key] = cloneDeep(bookmarks.value.filter(item => key === item.key)[0])
}
function save(key: string) {
  // console.log('save', key)
  // 如果保存时，发现原数据里面没有这个key，说明是新增的数据，直接添加这个数据字段到书签里

  Object.assign(bookmarks.value.filter(item => key === item.key)[0], editableLine[key])
  // 更新仓库数据
  store.updateBookMarkList(editableLine[key])
  delete editableLine[key]
}
function cancel(key: string) {
  // console.log('cancel', key)
  delete editableLine[key]
}
function onRowDblClick(record: bookmarkTempType) {
  edit(record.key!)
}
/**
 * @description: 获取所有网站的预览图
 */
const screenShotList = ref<websiteScreenshotType[]>([])
onMounted(async () => {
  screenShotList.value = store.getScreenShotUrlList()
  // console.log(screenShotList.value)
})
/**
 * @description: 动态更新网站url和previewUrl的映射
 */
const previewUrl = computed(() => (url: string) => {
  return screenShotList.value.find(item => item.bookmarkWebsiteUrl === url)?.screenshotUrl
})

/**
 * @description: 这些函数用于渲染表格中的不同单元格内容
 * - renderIcon: 渲染图标
 * - renderEditableInput: 渲染可编辑的输入框
 * - renderBookmarkWebsiteUrl: 渲染书签网站URL
 * - renderOperation: 渲染操作列
 * @param: column, text, record, editableLine
 */
function renderBodyCell(column: TableColumnType<bookmarkTempType>, text: string, record: recordType, editableLine: Record<string, bookmarkTempType>) {
  /**
   * @description:  图表渲染函数
   */
  function renderIcon(iconUrl: string) {
    return h('span', [
      h('img', {
        src: iconUrl,
        class: 'rounded-1',
        style: { width: '1rem', height: '1rem' },
      }),
    ])
  }

  /**
   * @description: 可编辑的input渲染函数
   */
  function renderEditableInput(modelValue: string, updateModelValue: (value: string) => void) {
    return h('span', [
      h(Input, {
        value: modelValue,
        onInput: (event: Event) => updateModelValue((event.target as HTMLInputElement).value),
      }),
    ])
  }
  /**
   * @description: 渲染书签网站url
   * @param: websiteUrl
   */
  function renderBookmarkWebsiteUrl(websiteUrl: string) {
    return h('span', [
      h(
        Popover,
        { placement: 'topRight', trigger: 'hover' },
        {
          content: () =>
            h(Image, {
              src: previewUrl.value(websiteUrl),
              class: 'rounded-1',
              style: { width: '15rem', height: '15rem' },
            }),
          default: () =>
            h(
              'a',
              { href: websiteUrl, target: '_blank' },
              h('span', { class: 'multi-ellipsis' }, websiteUrl),
            ),
        },
      ),
    ])
  }
  /**
   * @description: 操作列渲染函数
   * @param: editableLine,record,edit,save,cancel
   */
  function renderOperation(editableLine: Record<string, bookmarkTempType>, record: recordType, edit: (key: string) => void, save: (key: string) => void, cancel: (key: string) => void) {
    return h('span', [
      h('div', { class: 'editable-row-operation' }, [
        editableLine[record.key!]
          ? h('span', { class: 'flex gap-2' }, [
            h(Typography.Link, { onClick: () => save(record.key!) }, 'Save'),
            h(Typography.Link, { onClick: () => cancel(record.key!) }, 'Cancel'),
          ])
          : h('span', [h('a', { onClick: () => edit(record.key!) }, 'Edit')]),
      ]),
    ])
  }

  return h('span', [
    column.dataIndex === 'bookmarkWebsiteIcon'
      ? h(renderIcon(record[column.dataIndex]))
      : column.key === 'operation'
        ? h(renderOperation(editableLine, record, edit, save, cancel))
        : h('span', [
          column.dataIndex === 'bookmarkWebsiteUrl'
            ? h(renderBookmarkWebsiteUrl(record[column.dataIndex]))
            : editableLine[record.key!]
              ? h(renderEditableInput(
                editableLine[record.key as string][column.dataIndex],
                (value: string) => {
                  editableLine[record.key as string][column.dataIndex] = value
                },
              ))
              : h('span', { class: 'multi-ellipsis' }, text),
        ]),
  ])
}
const renderAll = defineComponent({
  props: {
    column: {
      type: Object as PropType<TableColumnType<bookmarkTempType>>,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    record: {
      type: Object as PropType<recordType>,
      required: true,
    },
    editableLine: {
      type: Object as PropType<Record<string, bookmarkTempType>>,
      required: true,
    },
  },
  setup(props) {
    return () => renderBodyCell(props.column, props.text, props.record, props.editableLine)
  },
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
  <!-- <a-button @click="testScreenShot">
    test 截图
  </a-button> -->
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
        <render-all :column="column" :text="text" :record="record" :editable-line="editableLine" />
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
