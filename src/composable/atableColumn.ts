import { h } from 'vue'
import { Image, Input, Popover, Typography } from 'ant-design-vue'
import type { TableColumnType } from 'ant-design-vue'
import type { bookmarkTempType } from '@/types/index'
import websitesStore from '@/stores/websites'

interface recordType extends bookmarkTempType {
  [key: string | number]: string | number | boolean | undefined
}
const screenShotList = ref(websitesStore().screenshotList)
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
function renderBodyCell(column: TableColumnType<bookmarkTempType>, text: string, record: recordType, editableLine: Record<string, bookmarkTempType>, save: (key: string) => void, cancel: (key: string) => void, edit: (key: string) => void) {
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

export const renderColumnAll = defineComponent({
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
    save: {
      type: Function as PropType<(key: string) => void>,
      required: true,
    },
    cancel: {
      type: Function as PropType<(key: string) => void>,
      required: true,
    },
    edit: {
      type: Function as PropType<(key: string) => void>,
      required: true,
    },
  },
  setup(props) {
    return () => renderBodyCell(props.column, props.text, props.record, props.editableLine, props.save, props.cancel, props.edit)
  },
})
