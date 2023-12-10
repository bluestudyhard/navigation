export interface websiteInfo {
  data: dataType
}
interface dataType {
  url: string
  name: string
  desc?: string
  icon: string
}
export interface bookmarkType {

  title: string
  url: string
  icon?: string
  checked?: boolean
}
// 后台数据
export interface websiteType {
  bookmarkName: string
  bookmarks: bookmarkTempType[]
}

// 首页展示
export interface websiteTitleListType {
  titleName: string
  tags: {
    tagName: string
    website: websiteTempType[]
  }[]
}
export interface websiteShowType extends websiteTempType {
  titleName: string
  tagName?: string
}
export interface bookmarkTempType {
  id?: number
  bookmarkName: string
  bookmarkWebsiteTitle: string
  bookmarkWebsiteUrl: string
  bookmarkWebsiteIcon: string
  userId?: number
  checked?: boolean
}
// 首页一个网站数据
export interface websiteTempType {
  id?: number
  websiteName: string
  websiteUrl: string
  websiteIcon?: string
  websiteDescription?: string
  userId: number
  tagId: string
  websiteWeight?: number
  deleted?: boolean
}
export interface bookmarkRequestType {
  bookmarks: bookmarkTempType[]
  bookmarkName: string
}

export interface websiteTitleType {
  id?: number
  titleName: string
  userId: number
}

export interface websiteTagType {
  id?: number
  tagName: string
  userId?: number
  titleId: number
}

export interface test {
  titleName: string
  tagNames: [
    {
      tagName: string
      websites: websiteTempType
    },
  ]
}
