import { defineStore } from 'pinia'

// import { useStorage } from '@vueuse/core'
// import { ref } from 'vue'
import type { bookmarkTempType, websiteTagType, websiteTitleListType, websiteTitleType, websiteType } from '@/types/website'
import { uploadBookMark } from '@/api/bookmark/bookmarkApi'
import { addWebsiteTagAction, addWebsiteTitleAction, getWebsietTitleActions, getWebsiteTagsActions } from '@/service/websiteService'

// const storage = ref<websiteType[]>([])
// const storageTitleList = ref<websiteTitleListType[]>([{ title: 'AI工具集', website: [] }, { title: '大前端', website: [] }, { title: 'fishs', website: [] }])
// const websiteTags = ref<websiteTagType[]>([])
// const websiteTitles = ref<websiteTitleType[]>([])
const websitesStore = defineStore('websites', {

  state: () => {
    return {
      websiteList: [] as websiteType[], // 网站列表
      // 网站标题列表
      websiteTitleList: [{ title: 'AI工具集', website: [] }, { title: '大前端', website: [] }, { title: 'fishs', website: [] }] as websiteTitleListType[],
      websiteTags: [] as websiteTagType[], // 网站标签列表
      websiteTitles: [] as websiteTitleType[], // 网站大标题列表
      test: 'old',
    }
  },
  actions: {
    updateTest(newTest: string) {
      this.test = newTest
    },
    // 保存网站列表
    saveWebSiteList(websiteList: websiteType[]) {
      this.websiteList = websiteList
    },
    // 更新网站列表
    updateWebSiteList(newWebSiteList: websiteType[]) {
      this.websiteList = newWebSiteList
    },
    // 更新指定类别标题的网站列表
    updateWebSiteTitleList(newWebSiteTitleList: websiteTitleListType[]) {
      this.websiteTitleList = newWebSiteTitleList
    },
    // 上传bookmarks
    async uploadBookMarks(bookmarkReuqust: bookmarkTempType, bookmarkName: string) {
      const res = await uploadBookMark(bookmarkReuqust, bookmarkName)
      return res.data
    },
    // 批量上传书签
    async uploadBookMarkBatch(bookmarks: bookmarkTempType, bookmarkName: string) {
      const res = await uploadBookMark(bookmarks, bookmarkName)
      return res.data
    },
    // 获取标签(二级标题)
    async getWebsiteTags() {
      const res = await getWebsiteTagsActions(1)
      console.log('tags 数据', res)
      this.websiteTags = res
    },
    // 获取大标题
    async getWebsiteTitles() {
      const res = await getWebsietTitleActions(1)
      console.log('titles 数据', res)
      this.websiteTitles = res
    },
    // 添加标签
    async addWebsiteTag(data: websiteTagType) {
      const res = await addWebsiteTagAction(data)
      if (res)

        return true

      return false
    },
    // 添加大标题
    async addWebsiteTitle(data: websiteTitleType) {
      const res = await addWebsiteTitleAction(data)
      if (res)

        return true

      return false
    },
  },
  persist: true,
})
export default websitesStore
