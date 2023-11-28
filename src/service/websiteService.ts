import { addWebsiteTag, addWebsiteTitle, getWebsietTitle, getWebsiteTags } from '@/api/website'
import type { websiteInfo, websiteTagType, websiteTitleType } from '@/types/website'

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
