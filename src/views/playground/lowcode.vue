<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { cloneDeep, get } from 'lodash-es'
import defaultMenu from '@/constant/defaultMenu.json'
import CategoryItem from '@/lowcode/components/CategoryItem.vue'
import ConfigRegion from '@/lowcode/components/configRegion/ConfigRegion.vue'
import { renderComponents, renderList } from '@/lowcode/config/renderComponents'
import BaseContainer from '@/lowcode/components/BaseContainer.vue'
import BaseLayout from '@/lowcode/components/BaseLayout.vue'
import EditorRenderArea from '@/lowcode/components/EditorRenderArea.vue'

const menuList = ref(defaultMenu)

const components = renderComponents

interface MenuListType {
  id: string
  menu: string
  icon: string
  label: string
  name: string
  event: string[]
  vailidate: string[]
  children?: MenuListType[]
  isContainer?: boolean
}

function clone(element: MenuListType) {
  const obj = Object.assign(cloneDeep(element), {
    id: `${element.name}-${Date.now()}`,
    children: element.isContainer ? [] : undefined,
  })
  return obj
}

/**
 * @description:  为配置项传入id
 *
 */
function getInitConfig(id: string) {
  // console.log('getInitConfig', id)
  return {
    id,
  }
}

const list2 = ref<MenuListType[]>([])

/**
 * @description: 定义渲染区的渲染列表
 * - 选项式中才能使用组件名称去渲染组件，在组合式中需要使用组件的引用去渲染
 */
function renderComponent(item: MenuListType) {
  const componentName = renderList.value.find(i => i.name === item.name)
  if (componentName) {
    const component = components.value[componentName.render as keyof typeof components.value] || null
    return component
  }
  return null
}
const activeComponent = ref<string | null>(null)
const currentComponent = ref<MenuListType | null>(null)
const currentComponentConfig = ref<any>({}) // 当前组件的配置
// 根据id为建值存多个组件的配置
const componentConfigs = ref<any>({})
/**
 * @description: 选中组件的样式
 */
const activeClass = computed(() => {
  return {

    boxShadow: 'rgb(1 108 255) 0px 0px 8px',
  }
})
/**
 * @description: 选中组件
 */
function handleCompClick(component: MenuListType) {
  activeComponent.value = component.id
  currentComponent.value = component
  currentComponentConfig.value = cloneDeep({ ...currentComponentConfig.value, id: component.id })
  console.log('currentComponentConfig', currentComponentConfig.value)
  console.log('component', component)
  if (!componentConfigs.value[component.id])
    componentConfigs.value[component.id] = cloneDeep({ ...currentComponentConfig.value, id: component.id })
}
function handleDocumentClick(event: MouseEvent) {
  // 点击编辑器的其他区域，取消选中，别的什么侧边栏不取消选中
  const designArea = document.querySelector('.design-area')
  if (designArea && designArea.contains(event.target as Node))
    activeComponent.value = null
}
/**
 * @description: 动态更新选择
 */
onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  // currentComponentConfig.value = getInitConfig('init')
})
onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})

function handleDragChange(event: any) {
  const newItem = event.clonedData
  // console.log('event', event)
  // console.log('newItem', newItem)
  // 需要currentComponentConfig有值的时候才执行add
  // console.log('currentComponentConfig before', currentComponentConfig.value)

  if (currentComponentConfig.value.props)
    handleCompClick(newItem, event)
}
</script>

<template>
  <div class="form-designer w-full">
    <div class="component-library bg-#F6F9FF w-20rem h-full overflow-auto">
      <div v-for="category in menuList" :key="category.name">
        <h3>{{ category.title }}</h3>
        <div class="flex w-full flex-wrap">
          <VueDraggable
            v-model="category.list"
            :animation="150"
            ghost-class="ghost"
            :group="{ name: 'category', pull: 'clone', put: false }"
            :clone="clone"
            :sort="false"
            class="flex flex-wrap"
          >
            <CategoryItem
              v-for="item in category.list"
              :key="item.name"
              :item="item"
            />
          </VueDraggable>
        </div>
      </div>
    </div>

    <div
      class="design-area bg-#F5F5F5 border w-full min-h-70vh"
    >
      <EditorRenderArea
        v-model:list="list2"
        v-model:current-config="currentComponentConfig"
        v-model:component-configs="componentConfigs"
        :active-component="activeComponent"
        @component-click="handleCompClick"
      />
    </div>
    <div class="property-panel w-30% h-full bg-#F5F5F5 overflow-auto">
      <!-- 属性面板内容 -->

      <!-- {{ currentComponentConfig }} -->
      <ConfigRegion v-model:render-region-config="componentConfigs[activeComponent]" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-designer {
  display: flex;
  gap:.4rem;
  height: 100vh;
  user-select: none
}
.component-library {
  padding: .6rem;
}
:global(#app) {
  overflow: hidden;
}
</style>
