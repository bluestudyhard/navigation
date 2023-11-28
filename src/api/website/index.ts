import { request } from '@/utils/request'

import type { websiteInfo, websiteTagType, websiteTitleType } from '@/types/website'

const API = {
  WEBSITEList: '/website',
  WEBSITETITLE: '/websiteTitle/',
  WEBSITETITLEADD: '/websiteTitle/add',
  WEBSITETAGADD: '/website/saveTag',
  WEBSITETAG: '/website/getTag',
} as const

export const getWebSiteList = (userId: number) => request.get<websiteInfo>(API.WEBSITEList, { params: { userId } })
export const getWebsietTitle = (userId: number) => request.get<websiteTitleType[]>(API.WEBSITETITLE, { params: { userId } })
// add tag
export const addWebsiteTag = (data: websiteTagType) => request.post(API.WEBSITETAGADD, data)
// add title
export const addWebsiteTitle = (data: websiteTitleType) => request.post(API.WEBSITETITLEADD, data)
export const getWebsiteTags = (userId: number) => request.get<websiteTagType[]>(API.WEBSITETAG, { params: { userId } })
