<!--
 * new page
 * @author: blue
 * @since: 2024-07-19
 * BookmarkTable.vue
-->
<script setup lang="ts">
import { ElTable } from 'element-plus'
import type { TableOption, bookmarkTempType } from '@/types/index'

const props = defineProps<{
  bookmarksPage: bookmarkTempType[]
  option: TableOption
  total: number
}>()
// 向父组件传递分页数据
const emit = defineEmits(['getCurrentPage', 'emitTableRef'])
const tableRef = ref<InstanceType<typeof ElTable>>()
// 分页数据
const pagination = ref({
  currentPage: 1,
  pageSize: 50,
  total: 0,
})
/**
 * @description: 切换页码
 * @param {number} val
 */
function handleCurrentChange(val: number) {
  pagination.value.currentPage = val
  emit('getCurrentPage', {
    ...pagination.value,
  })
}
/**
 * @description: 向父组件传递tableRef
 */
onMounted(() => {
  emit('emitTableRef', {
    tableRef: tableRef.value,
  })
})
/**
 * @description: 切换每页显示数量
 * @param {number} val
 */
function handleSizeChange(val: number) {
  pagination.value.pageSize = val
}
const selectedItems = ref<bookmarkTempType[]>([])
/**
 * @description 处理选中项变化
 * @param {Array} selection
 */
function handleSelectionChange(selection: bookmarkTempType[]) {
  selectedItems.value = selection    
}
</script>

<template>
  <div class="container">
    <ElTable
      ref="tableRef"
      :data="props.bookmarksPage"
      height="550"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        v-for="item in props.option.column"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        show-overflow-tooltip
      >
        <!-- 如果prop为icon  scope表示父组件传递给这个插槽的数据 -->
        <template v-if="item.type === 'image'" #default="scope">
          <img :src="scope.row[item.prop]" style="width: .8rem; height: .8rem">
        </template>
      </el-table-column>
    </ElTable>
    <div class="flex w-full justify-end">
      <el-pagination
        v-model="pagination"
        :page-sizes="[10, 20, 50, 100, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :default-page-size="pagination.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped></style>
