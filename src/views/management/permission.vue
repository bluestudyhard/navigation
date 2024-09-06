<script lang="ts" setup>
import { computed, nextTick, reactive, ref } from 'vue'
import type { Ref, UnwrapRef } from 'vue'
import { cloneDeep } from 'lodash-es'

interface DataItem {
  key: string
  name: string
  age: number
  address: string
}
const cellInput = ref(null)
const columns = ref([

  {
    title: 'name',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '20%',
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '20%',
  },
  {
    title: '+',
    dataIndex: 'addNewColumn',
    key: 'addNewColumn',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
  },

])
const dataSource: Ref<DataItem[]> = ref([
  {
    key: '0',
    name: 'Edward King 0',
    age: 32,
    address: 'London, Park Lane no. 0',
  },
  {
    key: '1',
    name: 'Edward King 1',
    age: 32,
    address: 'London, Park Lane no. 1',
  },
  // 默认最后一行是新增航
  {
    key: 'addNewRow',
    name: '',
    age: null,
    address: '',
  },

])
const count = computed(() => dataSource.value.length + 1)
// const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})
const editableData = reactive<{ key: string | null; columnIndex: string | null; cellValue: string | null }>({
  key: null,
  columnIndex: null,
  cellValue: null,
})
const editableCell = ref('')
function edit(key: string, columnIndex: string) {
  const cellValue = cloneDeep(dataSource.value.filter(item => key === item.key)[0])[columnIndex] || ''
  // console.log('cellValue', cellValue)
  editableData.key = key
  editableData.columnIndex = columnIndex
  editableData.cellValue = cellValue
  nextTick(() => {
    if (cellInput.value)
      cellInput.value.focus()
  })
}
function save(key: string) {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key])
  cancel()
}

function onDelete(key: string) {
  dataSource.value = dataSource.value.filter(item => item.key !== key)
}
function handleAdd() {
  const newData: DataItem = {
    key: count.value.toString(),
    name: '',
    age: null,
    address: '',
  }
  dataSource.value.splice(dataSource.value.length - 1, 0, newData)
}
const newColumnTitle = ref('untitled')
/**
 * @description: 处理新增列 然后每次新增后将＋添加到最后一列
 */
function handleAddColumn() {
  const newColumn = {
    title: newColumnTitle.value,
    dataIndex: newColumnTitle.value,
    key: newColumnTitle.value,
  }
  columns.value.splice(columns.value.length - 2, 0, newColumn)
  dataSource.value.forEach((item) => {
    item[newColumnTitle.value] = ''
  })
}
function cancel() {
  editableData.key = null
  // delete editableData
}
/**
 * @description: 测试点击外部区域方法
 */
function handleClickOutside() {
  cancel()
}
/**
 * @description: 获取table的第一列的option用于渲染new column
 *
 */
function getColumnsOption() {
  return columns.value.map((item) => {
    return {
      title: item.title,
      dataIndex: item.dataIndex,
    }
  })[0]
}
</script>

<template>
  {{ editableData }}
  <a-button
    class="editable-add-btn"
    style="margin-bottom: 8px"
    @click="handleAdd"
  >
    Add
  </a-button>
  <!-- <a-button v-click-outside="handleClickOutside">
    点击外部区域
  </a-button> -->
  <a-table bordered :data-source="dataSource" :columns="columns">
    <template #headerCell="{ column }">
      <span>
        <a-button v-if="column.dataIndex === 'addNewColumn'" @click="handleAddColumn">
          Add
        </a-button>
        <span v-else>
          {{ column.title }}
        </span>
      </span>
    </template>
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex !== 'operation' && column.dataIndex !== 'addNewColumn' ">
        <!-- 如果不加这个 &&column.dataIndex的话 -->
        <div class="editable-cell">
          <div v-if="editableData.key === record.key && editableData.columnIndex === column.dataIndex">
            <a-input
              ref="cellInput"
              v-model:value="editableData.cellValue"
              :width="column.width"
              @blur="handleClickOutside()"
              @press-enter="save(record.key)"
            />
          </div>
          <div v-else-if="record.key === 'addNewRow' && column.dataIndex === getColumnsOption().dataIndex ">
            <a-button @click="handleAdd">
              <a-text>+</a-text>
            </a-button>
          </div>
          <div v-else @dblclick="edit(record.key, column.dataIndex)">
            {{ text }}
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation' && record.key !== 'addNewRow'">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.key)"
        >
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>
