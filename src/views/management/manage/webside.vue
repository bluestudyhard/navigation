<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { refDebounced } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import websitesStore from '@/stores/websites'
import type { websiteType } from '@/types/website'
import Upload from '@/components/Upload.vue'
import BookmarkItem from '@/components/BookmarkItem.vue'

const useStore = websitesStore()
const { websiteList } = { ...useStore }
// 展示标题+tag titles tags
const { websiteTitleList, websiteTags, websiteTitles } = storeToRefs(useStore)
// 为每一个网站添加一个选中状态
// 获取websiteTitleList

// 拿仓库的后台网站的数据
const tempWebSiteList = ref<websiteType[]>([])
tempWebSiteList.value = websiteList.map((website) => {
  const bookmarks = website.bookmarks.map((bookmark) => {
    return { checked: false, ...bookmark }
  })
  return { ...website, bookmarks }
})
// 选择移动弹出框
const titleSelector = ref([])

console.log(websiteTitleList.value)
const dialogVisible = ref(false)
const drawer = ref(false)
// watchEffect(() => {
//   console.log(pagedWebSiteList.value)
// })
const isCheck = ref(false)

// 全选
function handleCheckAllChange(website: websiteType, e: boolean) {
  website.bookmarks.forEach((item) => {
    item.checked = e
  })
}
// 处理分页

// const pagedWebSiteList = computed(() => {
//   const startIndex = (currentPage.value - 1) * pageSize
//   const endIndex = startIndex + pageSize

//   return tempWebSiteList.value.slice(startIndex, endIndex)
// })
function handleMove() {
  dialogVisible.value = false
  const selectedWebSiteList = tempWebSiteList.value.filter((item) => {
    // 第一层筛，筛剩checked有剩的，所有bookmarks
    const selectedBookmarks = item.bookmarks.filter(bookmark => bookmark.checked)
    // 这里如果return的是selectedBookmarks，表示的是不管筛没筛，表示保留的都是原本的数组，所以白筛，需要添加，筛出的bookmarks里面的checked有true即长度>0 才保留,那这样会筛出来很多
    return selectedBookmarks.length > 0
  }).map((item) => {
    // 第二层筛只保留每一个bookmarks数组，其他的name什么的对象什么的都去掉
    const selectedBookMarks = item.bookmarks.filter(bookmark => bookmark.checked)
    return selectedBookMarks
  })
  console.log('selectedBookMark:', selectedWebSiteList)

  // const tempSelectList = selectedWebSiteList.map((item) => {
  //   const temp = item.map((website) => {
  //     return { id: website.id, websiteName: website.bookmarkWebsiteTitle, websiteUrl: website.bookmarkWebsiteUrl, websiteIcon: website.bookmarkWebsiteIcon, useId: website.userId, websiteDescription: website.bookmarkWebsiteTitle, websiteWeight: 80 }
  //   })
  // })

  websiteTitleList.value.forEach((item) => {
    if (item.title === titleSelector.value)
      item.website = [...item.website, ...selectedWebSiteList.flat()]
    else item.website = [...item.website]
  })
  console.log('websiteTitleList:', websiteTitleList.value)
  // 更新仓库中的数据
  useStore.updateWebSiteTitleList(websiteTitleList.value)
  // 删除已经筛选出来的到了新的分类的数据
  tempWebSiteList.value = tempWebSiteList.value.map((item) => {
    const selectedBookmarks = item.bookmarks.filter(bookmark => !bookmark.checked)
    return { ...item, bookmarks: selectedBookmarks }
  })
  // 更新仓库websiteList的值
  useStore.updateWebSiteList(tempWebSiteList.value)
}
function resetData() {
  const isConfirm = confirm('确定要重置数据吗？')
  if (isConfirm) {
    useStore.$reset()
    ElMessage({
      message: '重置成功',
      type: 'success',
    })
    // 刷新页面
    window.location.reload()
  }
}
// 添加搜索功能,可以根据网站的关键词搜索，也可以搜索网站的标题，也可以搜索网站对应的分类的name
const searchInput = ref('')
// 搜索节流
const searchInputDebounced = refDebounced(searchInput, 2000)
// 分页 | 总页数
// const loading = ref(false)
const total = ref(0)
const currentPage = ref(1)
const pageSize = 5
const pageCount = computed(() => {
  return Math.ceil(total.value / pageSize)
})
function handleCurrentChange(val: number) {
  currentPage.value = val
}
// 根据输入的关键词在网站标题里面寻找，然后返回包含关键词的数组
const pagedWebSiteList = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  let filteredList = tempWebSiteList.value

  if (searchInputDebounced.value.trim() !== '') {
    filteredList = tempWebSiteList.value.filter((item) => {
      const searchedBookmark = item.bookmarks.filter((bookmark) => {
        return bookmark.bookmarkWebsiteTitle.toLowerCase().includes(searchInputDebounced.value.toLowerCase().trim())
      })
      return searchedBookmark.length > 0
    }).map((item) => {
      const searchedBookmark = item.bookmarks.filter((bookmark) => {
        return bookmark.bookmarkWebsiteTitle.toLowerCase().includes(searchInputDebounced.value.toLowerCase())
      })

      return { ...item, bookmarks: searchedBookmark }
    })
  }

  total.value = filteredList.length // 更新total的值

  return filteredList.slice(startIndex, endIndex)
})
const inputTag = ref('')
const inputTitle = ref('')
const inputTitleId = ref(0)
const tagSelector = ref('')
const tagSelectorCheck = ref(false)
// 添加title
async function addTitle() {
  const isConfirm = confirm('确定要添加title吗？')
  if (isConfirm && inputTitle.value.trim() !== '') {
    const res = await useStore.addWebsiteTitle({ titleName: inputTitle.value, userId: 1 })
    if (res) {
      useStore.getWebsiteTitles()
      ElMessage({
        message: '添加成功',
        type: 'success',
      })
    }
    else {
      useStore.getWebsiteTitles()
      ElMessage({
        message: '添加失败',
        type: 'error',
      })
    }
  }

  inputTitle.value = ''
}
async function addTag(titleId: number) {
  const isConfirm = confirm('确定要添加tag吗？')
  if (isConfirm && inputTag.value.trim() !== '') {
    const res = await useStore.addWebsiteTag({ tagName: inputTag.value, userId: 1, titleId: inputTitleId.value })
    if (res) {
      useStore.getWebsiteTags()
      ElMessage({
        message: '添加成功',
        type: 'success',
      })
    }
    else {
      useStore.getWebsiteTags()
      ElMessage({
        message: '添加失败',
        type: 'error',
      })
    }
  }

  inputTitle.value = ''
}
onMounted(() => {
  useStore.getWebsiteTitles()
  useStore.getWebsiteTags()
})
</script>

<template>
  <div class="header">
    <!-- <el-button @click="handleMove">
      移动到新
    </el-button> -->
    <el-button @click="isCheck = !isCheck">
      选择
    </el-button>
    <el-button @click="dialogVisible = true ">
      移动到新
    </el-button>
    <el-dialog v-model="drawer" title="大分类和标题们" width="30%" class="h-150">
      <p>websiteTItle·</p>
      <el-button @click="addTitle">
        添加title
      </el-button>
      <el-input v-model="inputTitle" />
      <el-button @click="addTag(inputTitleId)">
        添加Tag
      </el-button>
      <div>选择移动到的Title</div>
      <el-select v-model="inputTitleId" class="m-2" placeholder="Select">
        <el-option v-for="(item, index) in websiteTitles" :key="index" :label="item.titleName" :value="item.id" />
      </el-select>
      <el-input v-model="inputTag" />
      <el-button>删除</el-button>
      <el-button>编辑</el-button>
      <div class="flex justify-between">
        <section>
          <div>
            <p>websiteTitle</p>
            <h5 v-for="title in websiteTitles" :key="title.id">
              {{ title.titleName }}
            </h5>
          </div>
        </section>
        <section>
          <p>websiteTags·</p>
          <div>
            <h5 v-for="websiteTag in websiteTags" :key="websiteTag.tagName">
              {{ websiteTag.tagName }}
            </h5>
          </div>
        </section>
      </div>
    </el-dialog>
    <el-button @click="drawer = true, useStore.updateTest('old')">
      Titles/Tags
    </el-button>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <span>
        请选择要移动到的分类
        {{ titleSelector }}
        {{ tagSelector }}
        <el-select v-model="titleSelector" class="m-2" multiple>

          <el-option v-for="(item, index) in websiteTitles" :key="index" :label="item.titleName" :value="item.titleName">
            <div>
              <el-select :placeholder="item.titleName" :value="tagSelector" @input="event => tagSelector = event.target.value">
                <span v-for="tag in websiteTags" :key="tag.id">
                  <el-option v-if="tag.titleId === item.id" :label="tag.tagName" :value="tag.tagName" @change="() => { if (tag.tagName === tagSelector) tagSelectorCheck = true }" />
                </span>

              </el-select>
            </div>
          </el-option>

        </el-select>
      </span>

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

    <el-input v-model="searchInputDebounced" type="search" placeholder="Please input" class="w-50%">
      <template #prepend>
        <el-button icon="Search" />
      </template>
    </el-input>
    <p>{{ searchInputDebounced }}</p>
    <!-- <el-button @click="exportToExcel">
      导出为Excel
    </el-button> -->
  </div>
  <div class="container">
    <div class="flex  w-100% box-border m-total-webside-lists">
      <div v-for="(website, index) in pagedWebSiteList" :key="index" vloading="loading">
        <h5>{{ website.bookmarkName }}</h5>
        <el-checkbox v-if="isCheck" @change="(e: boolean) => handleCheckAllChange(website, e)">
          Check all
        </el-checkbox>
        <div class="m-website">
          <BookmarkItem :website="website" :is-check="isCheck" />
        </div>
      </div>
    </div>
  </div>
  <!-- 选择后的网站列表 -->
  <!-- <div class="flex flex-col">
    <div v-for="(item, index) in websiteTitleList" :key="index">
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
  </div> -->
  <div class="footer fixed bottom-0 right-0">
    <el-pagination
      v-model:page-size="pageSize" v-model:current-page="currentPage" background layout="prev, pager, next"
      :total="total" :page-count="pageCount" @current-change="handleCurrentChange"
    />
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
  // border-right: 1px solid #ccc;
  flex-direction: column;

  .m-website {
    display: flex;
    flex-wrap: wrap;

  }
}
</style>
@/types/website
