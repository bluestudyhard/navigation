import { addWebsite, addWebsiteTag, addWebsiteTitle, getWebsietTitle, getWebsiteList, getWebsiteTags } from '@/api/website'
import type { websiteTagType, websiteTempType, websiteTitleType } from '@/types/website'

export async function addWebsiteTagAction(data: websiteTagType) {
  const res = await addWebsiteTag(data)
  return res.data as number
}

export async function addWebsiteTitleAction(data: websiteTitleType) {
  const res = await addWebsiteTitle(data)
  return res.data as number
}

export async function getWebsietTitleActions(userId: number) {
  const res = await getWebsietTitle(userId)
  return res.data
}

export async function getWebsiteTagsActions(userId: number) {
  const res = await getWebsiteTags(userId)
  return res.data
}

// 添加到首页展示网站
export async function saveWebSiteListActions(data: websiteTempType) {
  const res = await addWebsite(data)
  return res.data as number
}

// 获得首页展示网站
export async function getWebsiteListActions(userId: number) {
  const res = await getWebsiteList(userId)
  return res.data
}
