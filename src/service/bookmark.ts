import { deleteBookMark, deleteBookMarkBatch, getBookMarks, uploadBookMark, uploadBookMarkBatch } from '@/api/bookmark/bookmarkApi'
import type { bookmarkRequestType, bookmarkTempType } from '@/types/website'

// 获得书签列表
export async function getBookMarkListActions(userId: number) {
  const res = await getBookMarks(userId)
  return res.data
}
// 上传所有书签
export async function addBookMarkActions(data: bookmarkTempType, bookmarkName: string) {
  const res = await uploadBookMark(data, bookmarkName)
  return res.data
}
// 删除 一个or一组书签
export async function deleteBookMarkActions(data: bookmarkTempType[]) {
  if (data.length > 0) {
    const res = await deleteBookMarkBatch(data)
    return res.data
  }
  const res = await deleteBookMark(data[0])
  return res.data
}

// 批量删除bookmarkTempType
// 批量上传书签
export async function addBookMarkBatch(data: bookmarkRequestType) {
  const res = await uploadBookMarkBatch(data)
  return res.data
}
