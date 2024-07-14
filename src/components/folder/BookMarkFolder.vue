<!--
 * new page
 * @author: blue
 * @since: 2024-07-02
 * BookMarkFolder.vue
-->
<script setup lang="ts">
// import { type UseDraggableReturn, useDraggable } from 'vue-draggable-plus'
import {
  type DraggableEvent,
  type UseDraggableReturn,
  VueDraggable,
} from 'vue-draggable-plus'
import BookMarkFolderItem from './BookMarkFolderItem.vue'
import type { websiteType } from '@/types/website'

const props = defineProps<{
  bookmarks: websiteType[]
}>()
const websiteList = ref<websiteType[]>(props.bookmarks)
// const emits = defineEmits(['update:bookmarks'])
// 嵌套拖拽
// const list = computed({
//   get: () => props.bookmarks,
//   set: value => emits('update:bookmarks', value),
// })
// const el = ref()
// const draggable = useDraggable(el, bookmarkChildren, {
//   animation: 150,
//   ghostClass: 'ghost',
//   onStart() {
//     console.log('start')
//   },
//   onUpdate() {
//     console.log('update')
//   },
// })
// onMounted(() => {
//   draggable.start()
// })
</script>

<template>
  <div class="container">
    <div flex flex-wrap w-full gap-10>
      <VueDraggable
        v-model="websiteList"
        element="div"
        group="bookmark"
        animation="250"
        ghost-class="ghost"
        class="flex flex-wrap w-full gap-10"
        @start="() => console.log('start')"
        @update="() => console.log('update')"
      >
        <div
          v-for="(item, index) in websiteList"
          :key="index + item.bookmarkName"
          class="w-20% flex folder-item flex-col rounded-2 h-20vh overflow-auto overflow-x-hidden p-2"
        >
          <p font-550 font-size-3.75 m-0 color="#F43F5E">
            {{ item.bookmarkName }}
          </p>

          <div class="border-span" />
          <VueDraggable
            v-model="item.bookmarks"
            element="div"
            animation="250"
            ghost-class="ghost"
          >
            <BookMarkFolderItem
              v-for="(bookmark, index) in item.bookmarks"
              :key="index + bookmark.bookmarkWebsiteTitle"
              :bookmark="bookmark"
            />
          </VueDraggable>
        </div>
      </VueDraggable>
    </div>
  </div>
</template>

<style scoped lang="scss">
.folder-item {
  box-shadow: 1px 3px 6px 2px rgb(161 162 163 / 17%);
}

.border-span {
  height: 0.18rem;
  width: 1rem;

  margin-top: 0.4rem;
  border-radius: 1rem;
  background-color: #5bc92f;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb74;
  transition: all 0.3s ease-in-out;
}
</style>
