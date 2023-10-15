export interface webSiteInfo {
  data: dataType
}
interface dataType {
  url: string
  name: string
  desc?: string
  icon: string
}

export interface bookMarkType {
  title: string
  url: string
  icon?: string
  checked?: boolean
}

export interface webSiteType {
  name?: string
  bookmarks: bookMarkType[]
}

// 网站新分类标题列表
export interface webSiteTitleListType {
  title: string
  website: bookMarkType[]
}
