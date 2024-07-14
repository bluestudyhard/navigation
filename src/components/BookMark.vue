<script setup lang="ts">
import { useDropZone } from '@vueuse/core'
import { ref } from 'vue'
import type { bookmarkType } from '@/types/website'

const bookmarkList = ref<{ name: string; bookmarks: bookmarkType[] }[]>([])
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
        bookmarkList.value = data as { name: string; bookmarks: bookmarkType[] }[]
      }
    }
  })
}
const showDrop = ref(false)

const dropZoneRef = ref<HTMLElement>()

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
</script>

<template>
  <div class="flex position-absolute right-0">
    <div class="drop-zone">
      <p>
        Drop files into dropZone
        <el-button @click="() => { showDrop = !showDrop }">
          点击上传
        </el-button>
      </p>

      <div v-if="showDrop" ref="dropZoneRef" class="bg-blueGray w-100 h-50">
        <div>
          isOverDropZone:
          <div :value="isOverDropZone" />
        </div>
      </div>
      <div v-for="(item, index) in bookmarkList" :key="index">
        <h3>{{ item.name }}</h3>
        <div v-for="(bookmark, index) in item.bookmarks" :key="index">
          <img :src="bookmark.icon" alt="">
          <a :href="bookmark.url" target="_blank">
            <h5>{{ bookmark.title }}</h5>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
