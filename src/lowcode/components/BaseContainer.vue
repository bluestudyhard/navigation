<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

import { renderComponent } from '@/lowcode/config/renderComponents' // 假设 renderComponent 是一个全局函数

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

const list = ref<ComponentItem[]>(props.modelValue)

function handleDragChange(event: any) {
  emits('update:modelValue', list.value)
}
watch(() => props.modelValue, (value) => {
  console.log('value', value)
}, { immediate: true })
</script>

<template>
  <!-- <VueDraggable
    v-model="list"
    group="category"
    class="  p-4 w-full min-h-10rem m-auto bg-gray-500/5 rounded overflow-auto"
    :style="{ display: 'inline-block' }"
    @change="handleDragChange"
  >
    <component
      :is="renderComponent(item)"
      v-for="item in list"
      :key="item.id"
      v-bind="item"
      :custom-config="getInitConfig(item.id)"
      :style="{ display: 'inline-block' }"
    >
      <BaseContainer v-if="item.children" v-model="item.children" />
    </component>
  </VueDraggable> -->
  <el-row>
    <el-col :span="24">
      <VueDraggable
        v-model="list"
        group="category"
        class="p-4 w-full min-h-10rem m-auto bg-gray-500/5 rounded overflow-auto"
        :style="{ display: 'inline-block' }"
        @change="handleDragChange"
      >
        <component
          :is="renderComponent(item)"
          v-for="item in list"
          :key="item.id"
          v-bind="item"
          :custom-config="getInitConfig(item.id)"
          :style="{ display: 'inline-block' }"
        >
          <BaseContainer v-if="item.children" v-model="item.children" />
        </component>
      </VueDraggable>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>
