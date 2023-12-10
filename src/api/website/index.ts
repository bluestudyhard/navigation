import { request } from '@/utils/request'

import type { websiteShowType, websiteTagType, websiteTempType, websiteTitleType } from '@/types/website'

const API = {
  WEBSITELIST: '/website',
  WEBSITELISTSAVE: '/website/save',
  WEBSITETITLE: '/websiteTitle/',
  WEBSITETITLEADD: '/websiteTitle/add',
  WEBSITETAGADD: '/website/saveTag',
  WEBSITETAG: '/website/getTag',
} as const

export const getWebsiteList = (userId: number) => request.get<websiteShowType[]>(API.WEBSITELIST, { params: { userId } })
export const getWebsietTitle = (userId: number) => request.get<websiteTitleType[]>(API.WEBSITETITLE, { params: { userId } })
// add tag
export const addWebsiteTag = (data: websiteTagType) => request.post(API.WEBSITETAGADD, data)
// add title
export const addWebsiteTitle = (data: websiteTitleType) => request.post(API.WEBSITETITLEADD, data)
export const getWebsiteTags = (userId: number) => request.get<websiteTagType[]>(API.WEBSITETAG, { params: { userId } })
export const addWebsite = (data: websiteTempType) => request.post(API.WEBSITELISTSAVE, data)
