<script setup lang="ts">
import { useDropZone } from '@vueuse/core'
import { ref } from 'vue'

import type { webSiteType } from '@/types/webSite'

import webSitesStore from '@/stores/websites'

const bookMarkList = ref<webSiteType[]>([])
const useStore = webSitesStore()

function parseHtml(html: HTMLElement) {
  const main = html.querySelector('DL DT')
  const DT = Array.from(main!.querySelectorAll('DT'))

  return DT.map((item) => {
    const name = item.querySelector('H3')
    if (!name)
      return undefined

    const _bookmark = Array.from(item.querySelectorAll('A')) as HTMLAnchorElement[]
    const bookmarks = _bookmark.map(bookmark => ({
      title: bookmark.textContent,
      url: bookmark.href,
      icon: bookmark.attributes.getNamedItem('icon')?.value,
    }))
    return {
      name: name.textContent,
      bookmarks,
    }
  }).filter(item => item !== undefined)
}
function onDrop(files: File[] | null) {
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
        bookMarkList.value = data as webSiteType[]
        useStore.saveWebSiteList(bookMarkList.value)
      }
    }
  })
}
const showDrop = ref(false)

const dropZoneRef = ref<HTMLElement>()

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
</script>

<template>
  <div class="drop-zone">
    <p>
      <el-button @click="() => { showDrop = !showDrop }">
        点击上传
      </el-button>
    </p>
    <el-dialog v-model="showDrop">
      <template #header>
        <p>将文件拖拽到此处</p>
      </template>

      <div v-if="showDrop" ref="dropZoneRef" class="bg-blueGray w-100 h-50">
        <div>
          isOverDropZone:
          <div :value="isOverDropZone" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.total-tabs {
    display: flex;
    flex-direction: column;
}

.tab-site-lists {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    flex-wrap: wrap;
}
</style>
