import { defineStore } from 'pinia'

// import { useStorage } from '@vueuse/core'
// import { ref } from 'vue'
import type { bookmarkTempType, websiteShowType, websiteTagType, websiteTempType, websiteTitleListType, websiteTitleType, websiteType } from '@/types/website'
import { uploadBookMark } from '@/api/bookmark/bookmarkApi'
import { addWebsiteTagAction, addWebsiteTitleAction, getWebsietTitleActions, getWebsiteListActions, getWebsiteTagsActions, saveWebSiteListActions } from '@/service/websiteService'
import { deleteBookMarkActions } from '@/service/bookmark'

// const storage = ref<websiteType[]>([])
// const storageTitleList = ref<websiteTitleListType[]>([{ title: 'AI工具集', website: [] }, { title: '大前端', website: [] }, { title: 'fishs', website: [] }])
// const websiteTags = ref<websiteTagType[]>([])
// const websiteTitles = ref<websiteTitleType[]>([])
const websitesStore = defineStore('websites', {

  state: () => {
    return {
      websiteList: [{ bookmarkName: 'reading', bookmarks: [{ bookmarkWebsiteIcon: '1' }] }] as websiteType[], // 后台网站列表即书签列表
      // 网站标题列表
      websiteTitleList: [] as websiteTitleListType[],
      websiteShowList: [] as websiteShowType[],
      websiteTags: [] as websiteTagType[], // 网站标签列表
      websiteTitles: [] as websiteTitleType[], // 网站大标题列表
      bookmarkTitleList: [] as string[], // 书签大标题列表
    }
  },
  actions: {
    // 获取书签列表
    // async getBookmarkList(userId: number) {
    //   const res = await getBookMarkListActions(userId)
    //   // 将res里，所有有相同bookmarkName的数据，放到一个bookmarks数组里,形成的结构为：[{bookmarkName: 'xxx', bookmarks: [{}, {}]}]
    //   console.log('所有bookmarks', res)
    //   console.log('temp', temp)
    //   // this.websiteList = res
    // },
    // 保存书签列表
    saveBookmarkList(websiteList: websiteType[]) {
      this.websiteList = websiteList
    },
    // 更新网站列表
    updateBookmarkList(newWebSiteList: websiteType[]) {
      this.websiteList = newWebSiteList
    },
    // 上传首页网站列表
    async uploadWebsiteList(websiteList: websiteTempType) {
      const res = await saveWebSiteListActions(websiteList)
      return res
    },
    // 获取首页网站列表
    async getWebsiteList(userId: number) {
      if (this.websiteTitleList.length > 0)
        return
      const res = await getWebsiteListActions(userId)
      // console.log('网站列表', res)

      const temp = res.reduce((pre: websiteTitleListType[], cur: websiteShowType) => {
        // 判断是否存在大标题
        const titleIndex = pre.findIndex(item => item.titleName === cur.titleName)
        if (titleIndex !== -1) {
          // 判断是否存在标签以及是否被删除
          const tagIndex = pre[titleIndex].tags.findIndex(item => item.tagName === cur.tagName)
          if (tagIndex !== -1) {
            // 存在标签
            pre[titleIndex].tags[tagIndex].website.push(cur)
          }
          else {
            // 不存在标签
            pre[titleIndex].tags.push({
              tagName: cur.tagName as string,
              website: [cur],
            })
          }
        }
        else {
          // 不存在大标题
          pre.push({
            titleName: cur.titleName,
            tags: [{
              tagName: cur.tagName as string,
              website: [cur],
            }],
          })
        }
        return pre
      }, [])
      // console.log('temp', temp)
      this.websiteTitleList = temp
    },
    // 更新首页网站列表
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
    // 删除书签
    async deleteBookMark(bookmarks: bookmarkTempType[]) {
      console.log('删除书签', bookmarks)
      const res = await deleteBookMarkActions(bookmarks)
      return res.data
    },
    // 获取标签(二级标题)
    async getWebsiteTags() {
      if (this.websiteTags.length > 0)
        return
      const res = await getWebsiteTagsActions(1)
      // console.log('tags 数据', res)
      this.websiteTags = res
    },
    // 获取大标题
    async getWebsiteTitles() {
      if (this.websiteTitles.length > 0)
        return
      const res = await getWebsietTitleActions(1)
      // console.log('titles 数据', res)
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

    /**
     * @description: 2024.08.01 重新开写store
     */
    /**
     * @description: 获取所有书签的大标题即bookmarkName
     */
    getBookMarkTitleList() {
      const temp = this.websiteList.map(item => item.bookmarkName)
      this.bookmarkTitleList = temp
    },
    /**
     * @description: 更新书签列表，传入部分的已经更新的书签列表
     */
    updateBookMarkList(newBookMarks: bookmarkTempType[]) {
      this.websiteList.forEach((item, index) => {
        const temp = newBookMarks.find(newItem => newItem.bookmarkName === item.bookmarkName)
        if (temp)
          this.websiteList[index].bookmarks = newBookMarks
      })
      console.log(this.websiteList)
    },
  },
  persist: true,
})
export default websitesStore
