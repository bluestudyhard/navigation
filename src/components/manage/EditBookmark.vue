<!--
 * new page
 * @author: blue
 * @since: 2024-08-01
 * EditBookmark.vue
-->
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { bookmarkTempType } from '@/types'
import websitesStore from '@/stores/websites'

const props = defineProps<{
  selectedItems: bookmarkTempType[]
}>()

/**
 * @description 获取书签标题列表
 */
const store = websitesStore()
store.getBookMarkTitleList()
const bookmarkTitleList = store.bookmarkTitleList
const bookmarkName = ref<string>('')
//
const dialogVisible = defineModel<boolean>('showEditDialog')
const options = ref<string[]>([])
const editValue = ref<Record<string, any>>({
  bookmarkName: '',
})
/**
 * @description: 获取选中的所有书签的键值，比如说返回书签的bookarkTitle,icon,url等,不需要实际的值
 * @param {Array} selectedItems
 */
function getOptions(selectedItems: bookmarkTempType[]) {
  if (selectedItems.length > 0) {
    // 获取第一个元素的所有键
    options.value = Object.keys(selectedItems[0])
    // 动态生成 editValue 的结构
    editValue.value = options.value.reduce((acc, key) => {
      acc[key] = ''
      return acc
    }, {} as Record<string, any>)
  }
  else {
    options.value = []
    editValue.value = {}
  }
}
/**
 * @description 添加创建时间选择器
 */
function addTimePicker() {
  const timePickerKey = 'createTime'
  if (!options.value.includes(timePickerKey)) {
    options.value.push(timePickerKey)
    editValue.value[timePickerKey] = ''
    ElMessage.success('时间选择器已添加')
  }
  else {
    ElMessage.warning('时间选择器已存在')
  }
}
/**
 * @description: 添加更新时间选择器
 */
function addUpdateTimePicker() {
  const timePickerKey = 'updateTime'
  if (!options.value.includes(timePickerKey)) {
    options.value.push(timePickerKey)
    const formattedTime = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/\//g, '-').replace(/, /g, ' ')
    editValue.value[timePickerKey] = formattedTime
    ElMessage.success('时间选择器已添加')
  }
  else {
    ElMessage.warning('时间选择器已存在')
  }
}

/**
 * @description: 批量修改以bookmarkName为一个分组的书签的数据
 */
function handleBookmarkEdit() {
  if (props.selectedItems.length === 0) {
    ElMessage.warning('请先选择书签')
    return
  }
  const bookmarkName = editValue.value.bookmarkName
  if (bookmarkName === '') {
    ElMessage.warning('请先选择书签名称')
    return
  }
  // 增加创建时间和更新时间
  const createTime = editValue.value.createTime.trim()
  const updateTime = editValue.value.updateTime.trim()
  const temp = props.selectedItems.filter(item => item.bookmarkName === bookmarkName).map((item) => {
    return {
      ...item,
      createTime,
      updateTime,
    }
  })
  console.log(temp)
  store.updateBookMarkList(temp)
  ElMessage.success('批量修改成功')
}

/**
 * @description: 监听选中项变化
 */
watchEffect(() => {
  if (options.value.length === 0)
    getOptions(props.selectedItems)

  bookmarkName.value = editValue.value.bookmarkName
})
</script>

<template>
  <div class="container">
    <el-dialog
      v-model="dialogVisible"
      title="真批量修改"
      width="80%"
      top="2vh"
    >
      {{ bookmarkName }}
      {{ editValue }} x {{ selectedItems.length }}

      <el-form
        v-model="editValue"
        class="h-30rem shadow p-4 m-2 rounded-2 flex flex-col"
        style="max-width: 600px"
      >
        <div class="flex">
          <el-button size="mini" class="m-l-auto mb-1 add-timer" type="primary" @click="addTimePicker">
            <el-icon><Timer /></el-icon>
          </el-button>
          <el-button size="mini" class="m-l-auto mb-1 add-timer" type="warning" @click="addUpdateTimePicker">
            <el-icon><Timer /></el-icon>
          </el-button>
          <el-button type="primary" size="mini" @click="handleBookmarkEdit">
            保存
          </el-button>
        </div>
        <div v-for="option in options" :key="option">
          <el-form-item :label="option">
            <el-select v-if="option === 'bookmarkName'" v-model="editValue[option]">
              <el-option
                v-for="item in bookmarkTitleList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-date-picker
              v-else-if="option === 'createTime'"
              v-model="editValue[option]"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="MMM DD, YYYY"
              time-format="HH:mm"
              value-format="YYYY-MM-DD h:m:s "
              placeholder="创建时间"
            />
            <el-date-picker
              v-else-if="option === 'updateTime'"
              v-model="editValue[option]"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="MMM DD, YYYY"
              time-format="HH:mm"
              value-format="YYYY-MM-DD h:m:s "
              placeholder="更新时间"
            />
            <el-input v-else v-model="editValue[option]" />
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped></style>
