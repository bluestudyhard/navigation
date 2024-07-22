<!--
 * new page
 * @author: blue
 * @since: 2024-07-22
 * BookmarkExpandTable.vue
-->
<script setup lang="ts">
import type { TableOption, websiteType } from '@/types/index'

const props = defineProps<{
  websites: websiteType[]
  option: TableOption
}>()
</script>

<template>
  <div class="container">
    <el-table :data="websites" height="500px">
      <!-- default-expand-all -->
      <el-table-column type="selection" width="55" />
      <el-table-column prop="bookmarkName" label="父级" class="bg-amber" />
      <!-- 多选 -->
      <el-table-column type="expand">
        <template #default="props">
          <el-table :data="props.row.bookmarks">
            <el-table-column type="selection" width="55" />
            <el-table-column
              v-for="item in option.column"
              :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
            >
              <!-- 如果prop为icon  scope表示父组件传递给这个插槽的数据 -->
              <template v-if="item.type === 'image'" #default="scope">
                <img :src="scope.row[item.prop]" alt="" style="width: 20px; height: 20px">
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>
