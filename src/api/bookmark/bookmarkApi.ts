import { request } from '@/utils/request'

import type { bookmarkRequestType, bookmarkTempType } from '@/types/website'

const API = {

  BOOKMARKS: '/bookmarks',
  BOOKMARKSADD: '/bookmarks/add',
  BOOKMARKADDBATCH: '/bookmarks/addBatch',
  BOOKMARKSDELETE: '/bookmarks/delete',
} as const

export const getBookMarks = () => request.get<bookmarkRequestType[]>(API.BOOKMARKS)
export const uploadBookMark = (data: bookmarkTempType, bookmarkName: string) => request.post(API.BOOKMARKSADD, { ...data, bookmarkName })
export const uploadBookMarkBatch = (data: bookmarkRequestType) => request.post(API.BOOKMARKADDBATCH, data)
export const deleteBookMark = (data: bookmarkRequestType) => request.post(API.BOOKMARKSDELETE, data)
