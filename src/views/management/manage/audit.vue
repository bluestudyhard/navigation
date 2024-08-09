<script lang="ts" setup>
import { computed, ref, unref } from 'vue'
import { Table } from 'ant-design-vue'

interface DataType {
  key: string | number
  name: string
  age: number
  address: string
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]

const data: DataType[] = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  })
}

const selectedRowKeys = ref<DataType['key'][]>([]) // Check here to configure the default column

function onSelectChange(changableRowKeys: string[]) {
  console.log('selectedRowKeys changed: ', changableRowKeys)
  selectedRowKeys.value = changableRowKeys
}

const rowSelection = computed(() => {
  return {
    selectedRowKeys: unref(selectedRowKeys),
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
  <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" />
</template>
