<script lang="ts" setup>
import { clone, cloneDeep } from 'lodash-es'
import type { UnwrapRef } from 'vue'
import { computed, reactive, ref } from 'vue'
import { BM_PONOCOLSIZEData } from '@/constant/data'
import { BmPonoSalesColorTableOption } from '@/constant/option'

interface User {
  date: string
  name: string
  address: string
}

const option = BmPonoSalesColorTableOption
const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const editableLine: UnwrapRef<Record<string, any>> = reactive({})
/**
 * @description: 练一下computed的机制
 * - 先对data的数据进行一些处理
 */
const testData = ref(BM_PONOCOLSIZEData)

const groupDataCompu = computed(() => {
  const groupData: { [key: string]: any } = {}
  testData.value.forEach((item, index) => {
    const key = `${item.poloc_name}-${item.color}`
    if (!groupData[key]) {
      groupData[key] = {

        poloc_name: `${item.po_loc} ${item.poloc_name}`,
        color: item.color,
        sizes: {},
        total: 0,
        poloctype: item.poloctype,
      }
    }
    if (!groupData[key].sizes[item.size])
      groupData[key].sizes[item.size] = 0

    groupData[key].sizes[item.size] += Number.parseInt(item.qty, 10)
    groupData[key].total += Number.parseInt(item.qty, 10)
  })
  return groupData
})

const totalsCompu = computed(() => {
  const totals: { [key: string]: { [x: string]: number; color?: { [x: string]: number }; total?: number; percentage?: { [x: string]: string } } } = reactive({
    自營: {},
    加盟: {},
    聯營: {},
    selfJoinFran: {},
  })
  testData.value.forEach((item) => {
    const qty = Number.parseInt(item.qty, 10)
    updateTotals(totals[item.poloctype], item.size, item.color, qty)
    updateTotals(totals.selfJoinFran, item.size, item.color, qty)
  })
  return totals
})

function updateTotals(totalObj: { [x: string]: number; color?: any; total?: any }, size: string, color: string, qty: number) {
  if (!totalObj[size])
    totalObj[size] = 0

  if (!totalObj.color)
    totalObj.color = {}

  if (!totalObj.color[color])
    totalObj.color[color] = 0

  totalObj.color[color] += qty
  totalObj.total = (totalObj.total || 0) + qty
}

const percentagesCompu = computed(() => {
  const totals = totalsCompu.value
  Object.keys(totals).forEach((key) => {
    const total = totals[key].total
    const color = totals[key].color
    const colorPercentage = {}
    Object.keys(color).forEach((colorKey) => {
      colorPercentage[colorKey] = `${((color[colorKey] / total) * 100).toFixed(0)}%`
    })
    totals[key].percentage = colorPercentage
  })

  return totals
})

const tableComputed = computed(() => {
  // 打印看看有没有重新执行
  console.log('love h 2000')
  const groupedData = groupDataCompu.value
  const totals = percentagesCompu.value
  const result = [] as any []
  const polocNames: { [key: string]: any[] } = {}
  const sizeSummary: { [key: string]: number } = {}

  Object.values(groupedData).forEach((group) => {
    const sizes = group.sizes
    delete group.sizes
    const newGroup = { ...group, ...sizes }
    if (!polocNames[group.poloc_name])
      polocNames[group.poloc_name] = []

    polocNames[group.poloc_name].push(newGroup)

    // Update sizeSummary
    Object.keys(sizes).forEach((size) => {
      if (!sizeSummary[size])
        sizeSummary[size] = 0

      sizeSummary[size] += sizes[size]
    })
  })

  Object.keys(polocNames).forEach((poloc_name) => {
    const locNames = polocNames[poloc_name]
    const total = locNames.reduce((acc, color) => acc + color.total, 0)
    locNames.forEach((loc, index) => {
      const percentage = `${((loc.total / total) * 100).toFixed(0)}%`
      const { poloc_name, color, ...restLoc } = loc
      if (index === 0) {
        result.push({
          poloc_name: loc.poloc_name,
          color: loc.color,
          percentage,
          ...restLoc,
        })
      }
      else {
        result.push({
          poloc_name: ' ',
          color: loc.color,
          percentage,
          ...restLoc,
        })
      }
    })

    const ttl = locNames.reduce((acc, color) => {
      Object.keys(color).forEach((key) => {
        if (!['poloc_name', 'color', 'percentage', 'total', 'poloctype'].includes(key)) {
          if (!acc[key])
            acc[key] = 0

          acc[key] += color[key]
        }
      })
      return acc
    }, { total })
    ttl.poloc_name = ''
    ttl.color = 'TTL'
    ttl.percentage = '100%'
    ttl.isHightLight = true
    result.push(ttl)
  })

  Object.keys(totals).forEach((key) => {
    const summaryName = key === 'selfJoinFran' ? '自營+加盟+聯營' : key
    const color = totals[key].color as any
    const ttlSummary: { [key: string]: number | string } & { poloc_name?: string; color?: string; percentage?: string; isHightLight?: boolean; total?: any } = { color: 'TTL', percentage: '100%', total: 0 }
    Object.keys(color).forEach((colorKey, index) => {
      const colorTotal = color[colorKey]
      const colorPercentage = totals[key].percentage?.[colorKey] ?? {}
      const ttl = { poloc_name: '', color: colorKey, percentage: colorPercentage, isHightLight: false, total: colorTotal }
      if (index === 0) {
        ttl.poloc_name = `${summaryName} TTL`
        ttl.color = colorKey
        ttl.percentage = colorPercentage
        ttl.isHightLight = true
        result.push(ttl)
      }
      else {
        ttl.poloc_name = ' '
        ttl.color = colorKey
        ttl.percentage = colorPercentage
        result.push(ttl)
      }
      Object.keys(ttl).forEach((key) => {
        if (!['poloc_name', 'color', 'percentage', 'isHightLight'].includes(key)) {
          if (!ttlSummary[key])
            ttlSummary[key] = 0

          ttlSummary[key] += ttl[key]
        }
      })
    })
    result.push(ttlSummary)
  })
  result.forEach((item, index) => {
    item.index = index
  })
`  testData.value = result`
  return result
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
    if (item.index === _index)
      item.L = editableLine[_index].L

    return item
  })
  console.log('testData', testData.value[0])
  delete editableLine[_index]
}
watch(() => testData.value, (newVal) => {
  // 动态更新data数据
}, { deep: true })
</script>

<template>
  <p color-yellow>
    {{ editableLine }}
  </p>
  <p color-blueGray>
    {{ tableComputed[0] }}
  </p>
  <p color-fuchsia>
    {{ testData[0] }}
  </p>
  <el-button @click="count">
    count
  </el-button>
  <el-table :data="tableComputed" style="width: 100%">
    <el-table-column
      v-for="item in option.column"
      :key="item"
      :prop="item.prop"
      :label="item.label"
    >
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
