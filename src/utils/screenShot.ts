import type { bookmarkTempType, websiteScreenshotType } from '@/types'
import websitesStore from '@/stores/websites'

const baseUrl = 'https://s0.wp.com/mshots/v1/'

export async function screenShot(url: string, width?: number, height?: number) {
  if (!width || !height) {
    width = 800
    height = 600
  }
  // 如果请求失败，返回空字符串
  try {
    const res = await fetch(`${baseUrl}${url}?w=${width}&h=${height}`)
    //   const blob = await res.blob()
    const resultUrl = res.url
    // console.log(res)
    //   return URL.createObjectURL(blob)
    return resultUrl
  }
  catch (e) {
    return ''
  }
}

/**
 * @description: bookmarks传入数组，拿到数组里所有的网址url，通过screenShot函数获取截图url，再存到仓库
 * @param {bookmarkTempType[]} bookmarks
 */
export async function saveBookmarksScreenshot(bookmarks: bookmarkTempType[]) {
  const store = websitesStore()
  // if (store.getScreenShotUrlList().length > 0)
  //   return
  const screenshotList: websiteScreenshotType[] = await Promise.all(
    bookmarks.map(async (item) => {
      const url = item.bookmarkWebsiteUrl
      const screenshotUrl = await screenShot(url)
      // console.log('screenshotUrl', screenshotUrl)
      if (!screenshotUrl) {
        return {
          bookmarkWebsiteUrl: url,
          screenshotUrl: '',
        }
      }
      return {
        bookmarkWebsiteUrl: url,
        screenshotUrl,
      }
    }),
  )
  console.log('screenshotList', screenshotList)
  store.saveScreenShotUrlList(screenshotList)
}
