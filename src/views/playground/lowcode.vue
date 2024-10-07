<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import defaultMenu from '@/constant/defaultMenu.json'
import CategoryItem from '@/lowcode/components/CategoryItem.vue'

const menuList = ref(defaultMenu)

interface MenuListType {
  menu: string
  icon: string
  label: string
}

function clone(element: Record<'name' | 'id', string>) {
  console.log('clone', element)
  const len = menuList.value.length
  return {
    name: `${element.name}-clone-${len}`,
    id: `${element.id}-clone-${len}`,
  }
}
const list2 = ref([
  {
    name: '',
    id: '1',
    label: '',
    props: {},
  },
])
</script>

<template>
  <div class="form-designer">
    <span class="border w-10%">
      {{ list2 }}
    </span>
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
        <div
          v-for="item in list2"
          :key="item.id"
          class="cursor-move h-50px bg-gray-500/5 rounded p-3"
        >
          {{ item.name }}
        </div>
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
