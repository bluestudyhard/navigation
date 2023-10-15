<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import webSitesStore from '@/stores/websites'
import type { webSiteTitleListType, webSiteType } from '@/types/webSite'
import Upload from '@/components/Upload.vue'

const useStore = webSitesStore()
const { webSiteList, webSiteTitleList } = { ...useStore }
// 为每一个网站添加一个选中状态
// 获取websiteTitles
const websiteTitles = ref<webSiteTitleListType[]>([])
// 拿仓库的数据
const tempWebSiteList = webSiteList.map((item) => {
  const website = item
  website.bookmarks = item.bookmarks.map((bookmark) => {
    const tempBookmark = bookmark
    tempBookmark.checked = false
    return tempBookmark
  })
  return website
})
const titleSelector = ref('')
websiteTitles.value = [...webSiteTitleList]
// console.log(webSiteTitleList)
const dialogVisible = ref(false)

const isIndeterminate = ref(true)
// 全选
function handleCheckAllChange(website: webSiteType) {
  const allChecked = website.bookmarks.every(bookmark => bookmark.checked as boolean)
  // const allUnchecked = website.bookmarks.every(bookmark => !bookmark.checked)

  website.bookmarks.forEach((bookmark) => {
    // Fix for Problem 1: Check if bookmark is an object before setting checked property
    if (typeof bookmark === 'object')
      bookmark.checked = !allChecked as boolean
  })

  isIndeterminate.value = website.bookmarks.some(bookmark => bookmark.checked) && !allChecked
}
// 选择一些网站进行分类，点击移动然后新建一个新的数组，根据已选择的网站来分类
// 然后将原来的数组中的已选择的网站删除
// const selectedWebSite = ref<webSiteType[]>([])
function handleMove() {
  dialogVisible.value = false
  const selectedWebSiteList = tempWebSiteList.filter((item) => {
    const selectedBookMark = item.bookmarks.filter(bookmark => bookmark.checked)
    // 第一层筛，先筛出已经选择了的网站
    // 然后筛出的每一个小书签再和原本的书签进行比较
    return selectedBookMark.length > 0 ? item.bookmarks = selectedBookMark : ''
  })

  // 第二层筛，将已经选择的网站的原有的name过滤，然后将新的已选中的放到指定的类别下
  // 然后将原来的网站的已选中的网站删除
  // flat 是可以将数组扁平化为1维数组，在这里我们筛了以后其实还是套了一层大的
  const newbookmarks = selectedWebSiteList.map((item) => {
    const tempBookmarks = item.bookmarks.filter(bookmark => bookmark.checked)
    return tempBookmarks
  }).flat()
  console.log(newbookmarks)
  // 然后在webSiteTitleList中找到titleSelector的title，然后将bookmarks赋值给新分类
  const newWebSiteTitleList = webSiteTitleList.map((item) => {
    if (item.title === titleSelector.value) {
      if (!item.website)
        item.website = []
      item.website = [...item.website, ...newbookmarks]
    }

    return item
  })
  // 更新仓库中的数据
  // useStore.updateWebSiteTitleList(newWebSiteTitleList)
  // 移除原来的已经选择的网站
  tempWebSiteList.forEach((item) => {
    item.bookmarks = item.bookmarks.filter(bookmark => !bookmark.checked)
  })
  console.log(selectedWebSiteList)
  console.log(newWebSiteTitleList)
}
function resetData() {
  useStore.$reset()
  ElMessage({
    message: '重置成功',
    type: 'success',
  })
}
</script>

<template>
  <div class="header">
    <!-- <el-button @click="handleMove">
      移动到新
    </el-button> -->
    <el-button @click="dialogVisible = true">
      移动到新
    </el-button>

    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <span>
        请选择要移动到的分类
        <el-select v-model="titleSelector" class="m-2" placeholder="Select">
          <el-option v-for="(item, index) in websiteTitles" :key="index" :label="item.title" :value="item.title" />
        </el-select></span>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleMove">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
    <Upload />
    <el-button @click="resetData">
      重置数据
    </el-button>
  </div>
  <div class="container">
    <div class="flex flex-col w-50% box-border m-total-webside-lists">
      <div v-for="(website, index) in tempWebSiteList" :key="index">
        <h3>{{ website.name }}</h3>
        <el-checkbox v-model="website.bookmarks" :indeterminate="isIndeterminate" @change="handleCheckAllChange(website)">
          Check all
        </el-checkbox>
        <div v-for="(item, index) in website.bookmarks" :key="index" class="flex">
          <div class="flex justify-center">
            <img :src="item.icon" alt="" class="w-10 h-10">
            <a :href="item.url" target="_blank">
              <h5>{{ item.title }}</h5>
            </a>
            <el-checkbox v-model="item.checked" :lable="item.checked" border />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <div v-for="(item, index) in websiteTitles" :key="index">
        <h3>{{ item.title }}</h3>
        <div v-for="(websiteTag, index) in item.website" :key="index" class="flex">
          <div class="flex justify-center">
            <img :src="websiteTag.icon" alt="" class="w-10 h-10">
            <a :href="websiteTag.url" target="_blank">
              <h5>{{ websiteTag.title }}</h5>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  position: relative;

  align-items: center;
}

.container {
  display: flex;
}

.m-total-webside-lists {
  border-right: 1px solid #ccc;
}
</style>
