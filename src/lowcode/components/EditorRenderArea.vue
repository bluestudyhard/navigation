<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { renderComponent } from '@/lowcode/config/renderComponents'

interface ComponentItem {
  id: string
  name: string
  children?: ComponentItem[]
}

const props = defineProps<{
  activeComponent: string | null
}>()
const emit = defineEmits(['componentClick'])
const list = defineModel<ComponentItem[]>('list')
const currentConfig = defineModel('currentConfig')
const componentConfigs = defineModel('componentConfigs')

const activeClass = computed(() => ({
  boxShadow: 'rgb(1 108 255) 0px 0px 8px',
}))

function handleDragChange(event: any) {
  console.log('拖拽变化:', event)
}

function handleCompClick(component: ComponentItem, event: MouseEvent) {
  event.stopPropagation()
  emit('componentClick', component)
}
</script>

<template>
  <div class="editor-render-area">
    <VueDraggable
      v-model="list"
      :animation="150"
      group="category"
      ghost-class="ghost"
      class="flex flex-col gap-2 p-4 w-auto min-h-70vh m-auto bg-gray-500/5 rounded overflow-auto"
      @change="handleDragChange"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="component-wrapper cursor-move bg-gray-500/8 rounded p-3"
        :style="activeComponent === item.id ? activeClass : {}"
        @click="handleCompClick(item, $event)"
      >
        <component
          :is="renderComponent(item)"
          v-bind="item"
          v-model:current-config="currentConfig"
          v-model:emit-config="componentConfigs[item.id]"
          :custom-config="{ id: item.id }"
        >
          <!-- 如果有子组件，递归渲染 -->
          <template v-if="item.children && item.children.length">
            <EditorRenderArea
              v-model:list="item.children"
              v-model:current-config="currentConfig"
              v-model:component-configs="componentConfigs"
              :active-component="activeComponent"
              @component-click="emit('componentClick', $event)"
            />
          </template>
        </component>
      </div>
    </VueDraggable>
  </div>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.component-wrapper {
  position: relative;
}

.component-wrapper.active {
  border: 2px solid #409EFF;
}
</style>
