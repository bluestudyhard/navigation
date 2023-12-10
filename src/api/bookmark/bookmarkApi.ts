import { request } from '@/utils/request'

import type { bookmarkRequestType, bookmarkTempType } from '@/types/website'

const API = {

  BOOKMARKS: '/bookmarks',
  BOOKMARKSADD: '/bookmarks/add',
  BOOKMARKADDBATCH: '/bookmarks/addBatch',
  BOOKMARKSDELETE: '/bookmarks/delete',
  BOOKMARKSDELETEBATCH: '/bookmarks/deleteBatch',
} as const

export const getBookMarks = (userId: number) => request.get<bookmarkTempType[]>(API.BOOKMARKS, { params: { userId } })
export const uploadBookMark = (data: bookmarkTempType, bookmarkName: string) => request.post(API.BOOKMARKSADD, { ...data, bookmarkName })
export const uploadBookMarkBatch = (data: bookmarkRequestType) => request.post(API.BOOKMARKADDBATCH, data)
export const deleteBookMark = (data: bookmarkTempType) => request.post(API.BOOKMARKSDELETE, data)
export const deleteBookMarkBatch = (data: bookmarkTempType[]) => request.post(API.BOOKMARKSDELETEBATCH, data)
