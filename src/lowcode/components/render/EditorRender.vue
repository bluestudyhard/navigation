<!--
 * new page
 * @author: blue
 * @since: 2025-01-03
 * EditorRenderDrag.vue
-->
<script setup lang="ts">
import EditorRenderDrag from './EditorRenderDrag.vue'
import type { MenuListType } from '@/types/lowcode'

const componentList = ref<MenuListType[]>([])
const activeId = ref<string | null>(null)
const currentComponent = ref<MenuListType | null>(null)

// 监听组件列表变化
watch(() => componentList.value, (newVal) => {
  console.log('componentList变化:', newVal)
})

// 处理组件选中
function handleComponentSelect(component: MenuListType) {
  activeId.value = component.id
  currentComponent.value = component
}

defineExpose({
  componentList,
})
</script>

<template>
  <div class="editor-render">
    <el-empty v-if="!componentList.length" description="请在左侧拖入组件到此处" />
    <EditorRenderDrag
      v-else
      :list="componentList"
      :active-id="activeId"
      :current-component="currentComponent"
      @select="handleComponentSelect"
    />
  </div>
</template>

<style scoped lang="scss">
.editor-render {
  width: 100%;
  overflow: auto;
  padding: 20px;
  height: 50vh;
  background-color: rgb(206, 239, 252);
}
</style>
