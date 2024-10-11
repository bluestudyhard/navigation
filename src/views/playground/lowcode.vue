<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { cloneDeep } from 'lodash-es'
import defaultMenu from '@/constant/defaultMenu.json'
import CategoryItem from '@/lowcode/components/CategoryItem.vue'
import BaseInput from '@/lowcode/components/BaseInput.vue'

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
  console.log('clone', element)
  const obj = Object.assign(cloneDeep(element), {
    id: `${element.name}-${Date.now()}`,
  })
  return obj
}
const testConfig = {
  icon: {
    type: 'suffix-icon',
    iconName: 'Search',
  },
}
const list2 = ref<MenuListType[]>([])
const renderList = ref([
  {
    name: 'input',
    render: 'BaseInput',
  },

])
const textComp = ref('BaseInput')
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
/**
 * @description: 选中组件的样式
 */
const activeClass = computed(() => {
  return {
    border: '1px solid #409EFF',
    boxShadow: '0 0 10px #409EFF',
  }
})
/**
 * @description: 选中组件
 */
function handleCompClick(params: MenuListType, event: MouseEvent) {
  event.stopPropagation()
  console.log('handleCompClick', params)
  activeComponent.value = params.id
}
function handleDocumentClick() {
  if (activeComponent.value !== null) {
    // console.log('handleDocumentClick')
    activeComponent.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <BaseInput :custom-config="testConfig" />
  <component
    :is="textComp"
    class="cursor-move h-50px bg-gray-500/5 rounded p-3"
    :custom-config="testConfig"
  />
  <div class="form-designer">
    <!-- <span class="border w-10%">
      {{ list2 }}

    </span> -->
    <div class="component-library bg-#F6F9FF w-20rem h-full">
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
      >
        <component
          :is="renderComponent(item)"
          v-for="item in list2"
          v-bind="item"
          :key="item.id"
          :style="activeComponent === item.id ? activeClass : {}"
          class="cursor-move h-50px bg-gray-500/8 rounded p-3"
          :custom-config="testConfig"
          @click="handleCompClick(item, $event)"
        />
      </VueDraggable>
    </div>
    <div class="property-panel w-15rem bg-emerald">
      <!-- 属性面板内容 -->
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
</style>
