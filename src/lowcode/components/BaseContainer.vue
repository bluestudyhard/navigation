<script setup lang="ts">
import { defineEmits, defineProps, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { ElCol, ElRow } from 'element-plus'
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
    children: [], // 用于存储该行的列
  },
])

function handleDragChange(event: any, rowIndex: number) {
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
  <div class="p-4 w-full min-h-10rem  bg-gray-500/5 rounded overflow-auto">
    <VueDraggable
      v-for="(row, rowIndex) in rowList"
      :key="row.id"
      v-model="row.children"
      group="category"
      :options="{ direction: 'horizontal', ghostClass: 'drag-ghost' }"
      class="bg-blue-500/5 rounded-2 min-h-2rem"
      @change="handleDragChange($event, rowIndex)"
    >
      <ElRow :gutter="10">
        <ElCol
          v-for="item in row.children"
          :key="item.id"
          :span="6"
          class="bg-#fff w-full rounded-2 min-h-2rem m-1 p-2"
        >
          <VueDraggable
            v-model="row.children"
            group="category"
          >
            <component
              :is="renderComponent(item)"
              v-bind="item"
              :custom-config="getInitConfig(item.id)"
            >
              <!-- <BaseContainer v-if="item.children" v-model="item.children" /> -->
            </component>
          </VueDraggable>
        </ElCol>
      </ElRow>
    </VueDraggable>
  </div>
</template>

<style scoped>
.drag-ghost {
  border: 2px dashed #409EFF;
}
</style>
