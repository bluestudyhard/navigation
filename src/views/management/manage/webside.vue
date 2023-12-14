<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { refDebounced } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import websitesStore from '@/stores/websites'
import type { bookmarkTempType, websiteTempType, websiteType } from '@/types/website'
import Upload from '@/components/Upload.vue'
import BookmarkItem from '@/components/BookmarkItem.vue'

const useStore = websitesStore()
const { websiteList } = { ...useStore }
console.log('websiteList', websiteList)
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
const tempSaveWebsites = ref<websiteTempType[]>([])
// 选择移动弹出框
const selectedWebSiteList = ref<bookmarkTempType[]>([])
console.log(websiteTitleList.value)
const dialogVisible = ref(false)
const drawer = ref(false)
const drawer1 = ref(false)
// watchEffect(() => {
//   console.log(pagedWebSiteList.value)
// })
const isCheck = ref(false)
const countCheck = computed(() => {
  return tempWebSiteList.value.reduce((prev, cur) => {
    return prev + cur.bookmarks.filter(item => item.checked).length
  }, 0)
})
// 取消所有的checkbox的选中状态
function cancelAllCheck() {
  tempWebSiteList.value.forEach((item) => {
    item.bookmarks.forEach((bookmark) => {
      bookmark.checked = false
    })
  })
  isCheck.value = false
}
// 处理添加title，tag那一块的
const websiteTitleTags = ref<{ value: string; label: string; children: { value: number; label: string }[] }[]>([])
const inputTag = ref('')
const inputTitle = ref('')
const inputTitleId = ref(0)
const titleSelector = ref('')
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
function uploadWebsites() {
  tempSaveWebsites.value.forEach(async (item) => {
    const res = await useStore.uploadWebsiteList(item)
    console.log(res)
  })
}

function handleMove() {
  dialogVisible.value = false
  selectedWebSiteList.value = tempWebSiteList.value.filter((item) => {
    // 第一层筛，筛剩checked有剩的，所有bookmarks
    const selectedBookmarks = item.bookmarks.filter(bookmark => bookmark.checked)
    // 这里如果return的是selectedBookmarks，表示的是不管筛没筛，表示保留的都是原本的数组，所以白筛，需要添加，筛出的bookmarks里面的checked有true即长度>0 才保留,那这样会筛出来很多

    return selectedBookmarks.length > 0
  }).map((item) => {
    // 第二层筛只保留每一个bookmarks数组，其他的name什么的对象什么的都去掉
    const selectedBookMarks = item.bookmarks.filter(bookmark => bookmark.checked)
    return selectedBookMarks
  }).flat()
  console.log('selectedBookMark:', selectedWebSiteList)

  tempSaveWebsites.value = selectedWebSiteList.value.map((item) => {
    return {
      websiteName: item.bookmarkWebsiteTitle.slice(0, 6),
      websiteUrl: item.bookmarkWebsiteUrl,
      websiteIcon: item.bookmarkWebsiteIcon,
      websiteDescription: item.bookmarkWebsiteTitle,
      userId: 1,
      tagId: titleSelector.value[1],
      websiteWeight: 0,
    }
  })
  console.log(tempSaveWebsites.value)
  uploadWebsites()
  // websiteTitleList.value.forEach((item) => {
  //   if (item.title === titleSelector.value)
  //     item.website = [...item.website, ...selectedWebSiteList.flat()]
  //   else item.website = [...item.website]
  // })
  // console.log('websiteTitleList:', websiteTitleList.value)
  // // 更新仓库中的数据
  // useStore.updateWebSiteTitleList(websiteTitleList.value)
}
// 删除书签
async function handleDelete() {
  const isConfirm = confirm('确定要删除吗？')
  selectedWebSiteList.value = tempWebSiteList.value.filter((item) => {
    // 第一层筛，筛剩checked有剩的，所有bookmarks
    const selectedBookmarks = item.bookmarks.filter(bookmark => bookmark.checked)
    // 这里如果return的是selectedBookmarks，表示的是不管筛没筛，表示保留的都是原本的数组，所以白筛，需要添加，筛出的bookmarks里面的checked有true即长度>0 才保留,那这样会筛出来很多
    return selectedBookmarks.length > 0
  }).map((item) => {
    // 第二层筛只保留每一个bookmarks数组，其他的name什么的对象什么的都去掉
    const selectedBookMarks = item.bookmarks.filter(bookmark => bookmark.checked)
    return selectedBookMarks
  }).flat()
  console.log('selectedBookMark:', selectedWebSiteList.value)
  if (isConfirm) {
    console.log(selectedWebSiteList.value[0])
    // 删除已经筛选出来的到了新的分类的数据
    tempWebSiteList.value = tempWebSiteList.value.map((item) => {
      const selectedBookmarks = item.bookmarks.filter(bookmark => !bookmark.checked)
      return { ...item, bookmarks: selectedBookmarks }
    })
    // 更新仓库websiteList的值
    useStore.updateBookmarkList(tempWebSiteList.value)
  }
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

  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  total.value = filteredList.length // 更新total的值

  return filteredList.slice(startIndex, endIndex)
})

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
async function addTag(_titleId: number) {
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

// 回到底部
function scrollToBottom() {
  // 前往footer的位置
  const footer = document.querySelector('.footer')
  footer?.scrollIntoView({ behavior: 'smooth' })
}
onMounted(() => {
  useStore.getWebsiteTitles()
  useStore.getWebsiteTags()
  websiteTitleTags.value = websiteTitles.value.map((item) => {
    return {
      value: item.id,
      label: item.titleName,
      children: websiteTags.value.map((tag) => {
        return {
          value: tag.id,
          label: tag.titleId === item.id ? tag.tagName : '',
        }
      }).filter(tag => tag.label !== ''),
    }
  }) as any
  console.log('websiteTitleTags', websiteTitleTags.value)
})
</script>

<template>
  <el-backtop :bottom="100" :right="10" visibility-height="100" />
  <div class="container">
    <div class="header">
      <!-- <el-button @click="handleMove">

      移动到新
    </el-button> -->
      <div class="header-item">
        <div class="flex justify-around items-center m-1 relative ">
          <!-- <el-button icon="Search" class="fixed left-40" /> -->
          <el-button size="small" @click="isCheck = !isCheck">
            select
          </el-button>
          <el-button size="small" @click="dialogVisible = true">
            move to new
          </el-button>
          <el-button size="small" @click="drawer = true">
            Titles/Tags
          </el-button>
          <el-button size="small" @click="resetData">
            <el-icon>
              <Refresh />
            </el-icon>
          </el-button>
          <Upload class="m-1" />
        </div>
      </div>
      <el-dialog v-model="drawer" :lock-scroll="false">
        <template #header>
          <p>title&tags</p>
        </template>
        <div class="titles-tags overflow-hidden">
          <el-collapse>
            <el-collapse-item title="Add Title">
              <span class="flex">
                <el-input v-model="inputTitle" size="small" />
                <el-button @click="addTitle">
                  <el-icon>
                    <Plus />
                  </el-icon>
                </el-button></span>
            </el-collapse-item>
            <el-collapse-item title="Add Tag" :lock-scroll="false">
              <div class="flex flex-col">
                选择移动到的Title
                <el-select v-model="inputTitleId" size="small" class="w-30%" placeholder="Select">
                  <el-option
                    v-for="(item, index) in websiteTitles" :key="index" :label="item.titleName"
                    :value="item.id"
                  />
                </el-select>
                <span class="flex">
                  <el-input v-model="inputTag" size="small" />
                  <el-button size="small" @click="addTag(inputTitleId)">
                    <el-icon>
                      <Plus />
                    </el-icon>
                  </el-button>
                </span>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="flex justify-around">
          <section>
            <div class="flex flex-col w-25 justify-center">
              <p>websiteTitle</p>
              <el-tag
                v-for="title in websiteTitles" :key="title.id" class="flex m-1" closable effect="dark"
                type="danger"
              >
                {{ title.titleName }}
              </el-tag>
            </div>
          </section>
          <section>
            <p>websiteTags·</p>
            <div class="flex flex-col w-25 justify-center ">
              <el-tag
                v-for="websiteTag in websiteTags" :key="websiteTag.tagName" class=" flex m-1 " closable
                effect="dark"
              >
                {{ websiteTag.tagName }}
              </el-tag>
            </div>
          </section>
        </div>
      </el-dialog>

      <el-dialog v-model="dialogVisible" title="Tips" width="30%" :lock-scroll="false">
        <span>
          请选择要移动到的分类
          {{ titleSelector }}

          <div>
            <el-cascader v-model="titleSelector" :options="websiteTitleTags" />
          </div>
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

      <el-input
        v-model="searchInputDebounced" type="search" size="small" placeholder="搜索网站关键词"
        class="w-100 search absolute right-0"
      />
    </div>
    <!-- select 后的内容 -->
    <Transition name="select-menu">
      <div v-if="isCheck" class="w-91% check-area  h-17 flex fixed top-0.5 z-100 flex justify-center items-center">
        <p>已选择{{ countCheck }}</p>
        <el-button size="small" class="m-l-2 w-3 h-3 p-3" @click="dialogVisible = true">
          <el-icon><Select /></el-icon>
        </el-button>
        <el-button size="small" class="m-l-2 w-3 h-3 p-3 " @click="handleDelete">
          <el-icon>
            <Delete />
          </el-icon>
        </el-button>
        <el-button size="small" class="m-l-2 w-3 h-3 p-3 " @click="cancelAllCheck()">
          <el-icon>
            <Close />
          </el-icon>
        </el-button>
      </div>
    </Transition>
    <Transition name="select-aside">
      <div v-if="isCheck" class="h-full fixed w-42 check-area  left-0 top-0" />
    </Transition>

    <el-button class="absolute right-0 top-50%" @click="() => drawer1 = true">
      <el-icon>
        <ArrowLeft />
      </el-icon>
    </el-button>
    <el-button class="absolute right-0 top-30%" @click="scrollToBottom">
      <el-icon>
        <ArrowDownBold />
      </el-icon>
    </el-button>
    <div class="flex  w-100% box-border m-total-webside-lists">
      <TransitionGroup name="list">
        <div v-for="website in pagedWebSiteList" :key="website.bookmarkName">
          <h4>{{ website.bookmarkName }}</h4>

          <el-checkbox v-if="isCheck" @change="(e: boolean) => handleCheckAllChange(website, e)">
            <h5>Check all</h5>
          </el-checkbox>

          <div class="m-website">
            <BookmarkItem :website="website" :is-check="isCheck" @emit-is-check="check => isCheck = check" />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
  <!-- 选择后的网站列表 -->
  <el-drawer v-model="drawer1" :with-header="false" :lock-scroll="false">
    <!-- drawer不加这个lock-scoll的话，会出现body的滚动条 原因是重新计算了width 这里可以抽 -->
    <div v-for="(item, index) in websiteTitleList " :key="index">
      <h3 class="m-b--2">
        {{ item.titleName }}
      </h3>
      <span v-for="tag in item.tags" :key="tag.tagName">
        <h5 class="m-b-1">{{ tag.tagName }}</h5>
        <div class="flex flex-row flex-wrap">
          <span v-for="website in tag.website" :key="website.id">
            <span class="flex p-0 flex-col justify-center items-center m-2">
              <img :src="website.websiteIcon" alt="" class="w-3 h-3">
              <p class="font-size-2.2">{{ website.websiteName }}</p>
            </span>
          </span>
        </div>
      </span>
    </div>
  </el-drawer>
  <div class="footer relative w-full ">
    <el-pagination
      v-model:page-size="pageSize" v-model:current-page="currentPage" background layout="prev, pager, next"
      :total="total" :page-count="pageCount" class="bottom-0 absolute right-0" @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  position: relative;
  background-color: #f6fafd;
  // z-index: 100;
  bottom: 1.5rem;
  align-items: center;
  width: 100%;
  overflow: hidden;

  .header-item {
    .el-button {
      place-items: center;
      background-color: #F2F7FA;
      padding: 1em;
      border-radius: 6px;
      box-shadow: 1px 3px 8px 1px rgb(86 83 83 / 13%);
      border: 1px solid rgba(0, 0, 0, 0);
      cursor: pointer;
      transition: transform 0.5s;
      color: #0e428fba;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .el-button:hover {

      transform: translateY(0.3em);

    }
  }

  .search {
    color: #0a3370ba;
    font-weight: 600;
  }
}

.container {

  overflow: hidden;

  .check-area {
    background-color: rgba(127, 127, 127, 0.044);
    backdrop-filter: blur(6px);
    color: #0c3779;
    font-weight: 600;
    letter-spacing: 1px;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
  }

}

.m-total-webside-lists {
  // border-right: 1px solid #ccc;
  flex-direction: column;

  .m-website {
    display: flex;
    flex-wrap: wrap;

    transition: height 1s ease;
    overflow: hidden;

  }
}

.m-website-show-item {

  width: 100px;
  height: 100px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;

}

/*
  很好理解 from to active就是整个动画过程的状态
*/

// 默认Transition

.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);

}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  // position: absolute;
  transition: all 0.5s ease-in-out;
  opacity: 0.6;
}

.select-menu-enter-active {
  transform: translateZ(0);
  transition: all 0.4s ease;
  transform: translateY(0rem);
}

.select-menu-enter-from {
  transform: translateY(-100px);
}

.select-menu-leave-active {
  transition: all 0.4s ease;
  // transform: translateY(-0.5rem);
}

.select-menu-leave-to {
  transform: scale(1.01) translateY(1px) translateX(1rem);
}

.select-aside-enter-active {
  transform: translateZ(0) translateX(0rem);
  transition: all 0.4s ease;

}

.select-aside-enter-from {
  transform: translateX(-42rem);
}

.select-aside-leave-active {
  transition: all 4s ease;
  // transform: translateY(-0.5rem);
}

.select-aside-leave-to {
  transform: translateX(-1rem);
}

.check-enter-from,
.check-enter-active {
  transform: translateZ(0);
  // transform: translateY(-0.5rem);
  transition: all 0.4s ease;
  opacity: 0.5;
}

.check-leave-to {
  // transform: translateY(-0.5rem);
  opacity: 0.6;
}

.check-leave-active {
  transition: all 0.4s ease;
  // transform: translateY(-0.5rem);
}
</style>

<style>
.el-button--small {
  --el-button-size: 30px;
}
</style>
