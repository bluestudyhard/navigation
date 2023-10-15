import { request } from '@/utils/request'

import type { webSiteInfo } from '@/types/webSite'

const API = {
  WEBSITEList: '/website/list',
} as const

export const getWebSiteList = () => request.get<webSiteInfo>(API.WEBSITEList)
