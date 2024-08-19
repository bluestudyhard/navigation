import type { bookmarkTempType, websiteType } from '@/types/index'

/**
 * @description: 导出书签为json文件,并且调用浏览器下载
 */

export function exportBookmark(bookmark: websiteType[]) {
  const data = JSON.stringify(bookmark)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'bookmarks.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
