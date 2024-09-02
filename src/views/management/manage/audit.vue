<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import type { UnwrapRef } from 'vue'
import { computed, reactive, ref } from 'vue'
import { BM_PONOCOLSIZEData } from '@/constant/data'
import { BmPonoSalesColorTableOption } from '@/constant/option'
import { calculateData } from '@/composable/calculateTable'

const option = BmPonoSalesColorTableOption

const editableLine: UnwrapRef<Record<string, any>> = reactive({})
/**
 * @description: 练一下computed的机制
 * - 先对data的数据进行一些处理
 */
const testData = ref(BM_PONOCOLSIZEData)

const tableData = computed(() => {
  return calculateData(testData.value)
})

function count() {
  testData.value = testData.value.map((item) => {
    item.color = 'red'
    return item
  })
}

function handleEdit(index: number) {
  editableLine[index] = cloneDeep(testData.value.filter(item => item.index === index)[0])
}
function handleDelete(index: number) {
  delete editableLine[index]
}
function handleSave(_index: number) {
  console.log('editableLine', editableLine[_index])
  testData.value = testData.value.map((item) => {
    if (item.index === _index) {
      console.log('item', item)
      item = editableLine[_index]
    }

    return item
  })
  delete editableLine[_index]
}
onMounted(() => {
  console.log('tableData', tableData)
})
</script>

<template>
  <p color-yellow>
    {{ editableLine }}
  </p>

  <p color-fuchsia>
    计算属性后的 {{ tableData[0] }}
  </p>
  <p color-cyan>
    数据源  {{ testData[0] }}
  </p>
  <el-button @click="count">
    count
  </el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column v-for="item in option.column" :key="item" :prop="item.prop" :label="item.label">
      <template #default="{ row }">
        <el-input v-if="editableLine[row.index]" v-model="editableLine[row.index][item.prop]" />
        <span v-else>{{ row[item.prop] }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <span v-if="editableLine[row.index]" flex gap-2>
          <el-button type="text" @click="handleSave(row.index)">
            保存
          </el-button>
          <el-button type="text" @click="handleDelete(row.index)">
            删除
          </el-button>
        </span>
        <el-button v-else type="text" @click="handleEdit(row.index)">
          编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
