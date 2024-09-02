<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import type { Ref, UnwrapRef } from 'vue'
import { CheckOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons-vue'
import { cloneDeep } from 'lodash-es'

interface DataItem {
  key: string
  name: string
  age: number
  address: string
}

const columns = ref([

  {
    title: 'name',
    dataIndex: 'name',
    width: '30%',
  },
  {
    title: 'age',
    dataIndex: 'age',
  },
  {
    title: 'address',
    dataIndex: 'address',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
  },
  {
    title: '+',
    dataIndex: 'addNewColumn',
    key: 'addNewColumn',
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
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})

function edit(key: string) {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0])
}
function save(key: string) {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key])
  delete editableData[key]
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
/**
 * @description: 处理新增列 然后每次新增后将＋添加到最后一列
 */
function handleAddColumn() {
  columns.value.splice(columns.value.length - 1, 0, {
    title: 'untitled',
    dataIndex: '',
    key: '',
  })
}
</script>

<template>
  <a-button
    class="editable-add-btn"
    style="margin-bottom: 8px"
    @click="handleAdd"
  >
    Add
  </a-button>
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
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <div v-if="editableData[record.key]">
            <a-input v-model:value="editableData[record.key].name" @press-enter="save(record.key)" />
          </div>
          <div v-else-if="record.key === 'addNewRow'">
            {{ text || ' ' }}
            <a-button @click="handleAdd">
              <a-text>+</a-text>
            </a-button>
          </div>
          <div v-else @dblclick="edit(record.key)">
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
