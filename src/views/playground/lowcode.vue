<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { cloneDeep, get } from 'lodash-es'
import defaultMenu from '@/constant/defaultMenu.json'
import CategoryItem from '@/lowcode/components/CategoryItem.vue'
import BaseInput from '@/lowcode/components/BaseInput.vue'
import ConfigRegion from '@/lowcode/components/configRegion/ConfigRegion.vue'

const menuList = ref(defaultMenu)

const components = ref({
  BaseInput,
  // 其他组件...
})

interface MenuListType {
  id: string
  menu: string
  icon: string
  label: string
  name: string
  event: string[]
  vailidate: string[]
}

function clone(element: MenuListType) {
  // console.log('clone', element)
  const obj = Object.assign(cloneDeep(element), {
    id: `${element.name}-${Date.now()}`,
  })
  return obj
}
const testConfig = ref({
  icon: {
    type: 'suffix-icon',
    iconName: 'Search',
  },
})
/**
 * @description:  为配置项传入id
 *
 */
function getInitConfig(id: string) {
  // console.log('getInitConfig', id)
  return {
    ...testConfig.value,
    id,
  }
}

const list2 = ref<MenuListType[]>([])
const renderList = ref([

  {
    name: 'input',
    render: 'BaseInput',
  },

])

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
function handleCompClick(params: MenuListType, event: MouseEvent) {
  console.log('handleCompClick', params)
  event.stopPropagation()
  // console.log('handleCompClick', params)
  activeComponent.value = params.id
  currentComponent.value = params
  // 需要在点击组件的时候，将当前组件的配置传递给属性面板
  // currentComponentConfig.value = getInitConfig(params.id)
  currentComponentConfig.value = cloneDeep({ ...currentComponentConfig.value, id: params.id })
  console.log('currentComponentConfig', currentComponentConfig.value)
  if (!componentConfigs.value[params.id]) {
    componentConfigs.value[params.id] = cloneDeep({ ...currentComponentConfig.value, id: params.id })
    console.log('componentConfigs', componentConfigs.value)
  }

  // componentConfigs.value[params.id] = cloneDeep({ ...currentComponentConfig.value, id: params.id })
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
  console.log('currentComponentConfig before', currentComponentConfig.value)

  if (currentComponentConfig.value.props)
    handleCompClick(newItem, event)
}
</script>

<template>
  <div class="form-designer w-full">
    <!-- <span class="border w-10%">
      {{ list2 }}
 }}
    </span> -->
    }}
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
      class="design-area bg-#F5F5F5 border w-full "
    >
      <VueDraggable
        v-model="list2"
        :animation="150"
        group="category"
        ghost-class="ghost"
        class="flex flex-col gap-2 p-4 w-full h-50% m-auto bg-gray-500/5 rounded overflow-auto"
        @change="handleDragChange"
      >
        <component
          :is="renderComponent(item)"
          v-for="item in list2"
          v-bind="item"
          :key="item.id"
          v-model:currentConfig="currentComponentConfig"
          v-model:emitCoinfig="componentConfigs[item.id]"
          :custom-config="getInitConfig(item.id)"
          :style="activeComponent === item.id ? activeClass : {}"
          class="cursor-move h-50px bg-gray-500/8 rounded p-3"
          @click="handleCompClick(item, $event)"
        />
        <!-- @deliver-config="currentComponentConfig = $event" -->
      </VueDraggable>
    </div>

    <span class="absolute top-50% left-20% w-50%">
      <el-tabs>
        <el-tab-pane label="属性" name="first" class="overflow-auto">
          {{ componentConfigs }}
        </el-tab-pane>
        <el-tab-pane label="事件" name="second">
          {{ componentConfigs[activeComponent] }}
        </el-tab-pane>

      </el-tabs>
    </span>
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
