<script setup lang="ts">
import { useDropZone } from '@vueuse/core'
import { ref } from 'vue'

import type { bookmarkRequestType, websiteType } from '@/types/website'

import websitesStore from '@/stores/websites'
import userStore from '@/stores/user'

const showDrop = ref(false)

const dropZoneRef = ref<HTMLElement>()

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
const vloading = ref(false)
const userId = ref(0)
userId.value = userStore().userId
const bookmarkList = ref<websiteType[]>([])
const useStore = websitesStore()
const bookmarkRaws = ref<bookmarkRequestType[]>([])
function parseHtml(html: HTMLElement) {
  const main = html.querySelector('DL DT')
  const DT = Array.from(main!.querySelectorAll('DT'))

  return DT.map((item) => {
    const name = item.querySelector('H3')
    if (!name)
      return undefined

    const _bookmark = Array.from(item.querySelectorAll('A')) as HTMLAnchorElement[]
    const bookmarks = _bookmark.map(bookmark => ({
      bookmarkWebsiteTitle: bookmark.textContent,
      bookmarkWebsiteUrl: bookmark.href,
      bookmarkWebsiteIcon: bookmark.attributes.getNamedItem('icon')?.value,
    }))
    return {
      bookmarkName: name.textContent,
      bookmarks,
    }
  }).filter(item => item !== undefined)
}
function onDrop(files: File[] | null) {
  vloading.value = true
  setTimeout(() => {
    vloading.value = false
    showDrop.value = false
    // 刷新页面
    location.reload()
  }, 2000)
  if (!files)
    return
  console.log(files)
  // 如果文件是html就解析
  files.forEach((file) => {
    if (file.type === 'text/html') {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = function (e) {
        const div = document.createElement('div')
        div.innerHTML = e.target?.result as string
        console.log(div)
        // console.log(typeof div)
        const data = parseHtml(div)
        bookmarkList.value = data as websiteType[]
        bookmarkRaws.value = bookmarkList.value
        useStore.saveBookmarkList(bookmarkList.value)
      }
    }
  })
}

async function upLoadBookmarks() {
  console.log(bookmarkRaws.value)
  bookmarkRaws.value.forEach(async (item) => {
    item.bookmarks.forEach(async (bookmark) => {
      const res = await useStore.uploadBookMarks(bookmark, item.bookmarkName)
      console.log(res)
    })
  })
}
</script>

<template>
  <div class="drop-zone">
    <p>
      <el-button class="el-button_1" size="small" @click="() => { showDrop = !showDrop }">
        <el-icon>
          <UploadFilled />
        </el-icon>
      </el-button>
    </p>
    <el-dialog v-model="showDrop" :lock-scroll="false">
      <template #header>
        <p>将文件拖拽到此处</p>
      </template>

      <div v-if="showDrop" ref="dropZoneRef" v-loading="vloading" class="bg-blueGray w-auto h-50">
        <div>
          isOverDropZone:
          <div :value="isOverDropZone" />
        </div>
      </div>
      <el-button @click="upLoadBookmarks">
        上传服务器
      </el-button>
    </el-dialog>
  </div>
</template>

<style scoped>
.total-tabs {
  display: flex;
  flex-direction: column;
}

.el-button_1 {
  place-items: center;
  background-color: #F2F7FA;
  padding: 1em;
  border-radius: 10px;
  margin-left: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0);
  cursor: pointer;
  transition: transform 0.5s;
  color: #0e428fd1;
  font-weight: 600;
  letter-spacing: 0.5;
}

.el-button:hover {

  transform: translateY(0.3em);

}

.tab-site-lists {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  flex-wrap: wrap;
}
</style>
