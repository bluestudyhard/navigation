<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { renderComponent } from '@/lowcode/config/renderComponents'

interface ComponentItem {
  id: string
  name: string
  children?: ComponentItem[]
}

const props = defineProps({
  modelValue: {
    type: Array as () => ComponentItem[],
    default: () => [],
  },
})

const emits = defineEmits(['update:modelValue'])

function getInitConfig(id: string) {
  return {
    id,
  }
}

const rowList = ref<ComponentItem[]>([
  {
    id: 'row-1',
    name: 'el-row',
    children: [], // 每行的列
  },
])

// 处理行间拖拽
function handleRowDragChange(event: any) {
  const { removed, added } = event
  if (removed && added) {
    // 处理跨行移动
    emits('update:modelValue', rowList.value)
  }
}

// 处理行内拖拽
function handleInnerDragChange(event: any, rowIndex: number) {
  emits('update:modelValue', rowList.value)
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    const newRow: ComponentItem = {
      id: `row-${Date.now()}`,
      name: 'el-row',
      children: [], // 创建新的空列数组
    }
    rowList.value.push(newRow)
    emits('update:modelValue', rowList.value)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

watch(() => rowList.value, (newVal) => {
  console.log('rowList', newVal)
}, { deep: true })
</script>

<template>
  <div class="p-4 w-full min-h-10rem bg-gray-500/5 rounded overflow-auto">
    <!-- 外层容器用于管理行 -->
    <VueDraggable
      v-model="rowList"
      :group="{ name: 'category', pull: false, put: false }"
      class="flex flex-col gap-2"
      @change="handleRowDragChange"
    >
      <div v-for="(row, rowIndex) in rowList" :key="row.id" class="w-full">
        <!-- 每行的拖拽容器 -->
        <ElRow :gutter="10" class="bg-blue-500/5 rounded-2 min-h-2rem p-2 flex">
          <VueDraggable
            v-model="row.children"
            :group="{ name: 'category', pull: true, put: true }"
            :options="{
              direction: 'horizontal',
              ghostClass: 'drag-ghost',
              animation: 150,
            }"
            class="flex flex-wrap w-full"
            @change="handleInnerDragChange($event, rowIndex)"
          >
            <ElCol
              v-for="item in row.children"
              :key="item.id"
              :span="6"
              class="bg-#fff rounded-2 min-h-2rem m-1 relative group"
            >
              <component
                :is="renderComponent(item)"
                v-bind="item"
                :custom-config="getInitConfig(item.id)"
              />
              <!-- 拖拽提示 -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <div class="absolute left-0 top-0 h-full w-1 bg-blue-500/50" />
                <div class="absolute right-0 top-0 h-full w-1 bg-blue-500/50" />
              </div>
            </ElCol>
          </VueDraggable>
        </ElRow>
      </div>
    </VueDraggable>
  </div>
</template>

<style scoped>
.drag-ghost {
  border: 2px dashed #409EFF;
  background: rgba(64, 158, 255, 0.1);
}
</style>
