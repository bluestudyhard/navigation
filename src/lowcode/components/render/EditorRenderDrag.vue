<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import type { MenuListType } from '@/types/lowcode'
import { renderComponent } from '@/lowcode/config/renderComponents'

const props = defineProps<{
  list: MenuListType[]
  activeId?: string | null
  currentComponent?: MenuListType | null
}>()

const emit = defineEmits(['select', 'update:list'])

function handleDragChange(e: any) {
  console.log('拖拽变化:', e)
  emit('update:list', props.list)
}

function handleComponentClick(component: MenuListType, event: Event) {
  event.stopPropagation()
  emit('select', component)
}

// 获取组件初始配置
function getInitConfig(id: string) {
  return {
    id,
  }
}
</script>

<template>
  <div class="render-container">
    <VueDraggable
      :list="list"
      group="components"
      :animation="150"
      class="drag-container"
      @change="handleDragChange"
    >
      <template #item="{ element }">
        <div
          class="component-wrapper"
          :class="{ 'is-active': activeId === element.id }"
          @click="handleComponentClick(element, $event)"
        >
          <!-- 渲染组件 -->
          <component
            :is="renderComponent(element)"
            v-bind="element"
            :custom-config="getInitConfig(element.id)"
          />

          <!-- 如果有子组件,递归渲染 -->
          <template v-if="element.children && element.children.length">
            <editor-render-drag
              :list="element.children"
              :active-id="activeId"
              :current-component="currentComponent"
              @select="$emit('select', $event)"
            />
          </template>
        </div>
      </template>
    </VueDraggable>
  </div>
</template>

<style scoped>
.drag-container {
  min-height: 50px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.component-wrapper {
  margin-bottom: 8px;
  background: white;
  padding: 10px;
  border-radius: 4px;
  cursor: move;
}

.is-active {
  border: 2px solid #409eff;
}
</style>
