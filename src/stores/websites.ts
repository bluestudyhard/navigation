import { defineStore } from 'pinia'
import type { webSiteTitleListType, webSiteType } from '@/types/webSite'

const webSitesStore = defineStore('websites', {
  state: () => {
    return {
      webSiteList: [] as webSiteType[],
      // 网站标题列表
      webSiteTitleList: [{ title: '编程入门', website: [] }, { title: '大前端', website: [] }, { title: 'AI工具集', website: [] }] as webSiteTitleListType[],
    }
  },
  actions: {
    // 保存网站列表
    saveWebSiteList(webSiteList: webSiteType[]) {
      this.webSiteList = webSiteList
    },
    // 更新指定类别标题的网站列表
    updateWebSiteTitleList(newWebSiteTitleList: webSiteTitleListType[]) {
      this.webSiteTitleList = newWebSiteTitleList
    },
  },
  persist: true,
})
export default webSitesStore
