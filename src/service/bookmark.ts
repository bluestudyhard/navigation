import { deleteBookMark, getBookMarks, uploadBookMark, uploadBookMarkBatch } from '@/api/bookmark/bookmarkApi'
import type { bookmarkRequestType, bookmarkTempType } from '@/types/website'

// 活的书签列表
export async function getBookMarkList() {
  const res = await getBookMarks()
  return res.data
}
// 上传所有书签
export async function addBookMark(data: bookmarkTempType, bookmarkName: string) {
  const res = await uploadBookMark(data, bookmarkName)
  return res.data
}
// 删除

export async function deleteBookMarkById(data: bookmarkRequestType) {
  const res = await deleteBookMark(data)
  return res.data
}

// 批量上传书签
export async function addBookMarkBatch(data: bookmarkRequestType) {
  const res = await uploadBookMarkBatch(data)
  return res.data
}
