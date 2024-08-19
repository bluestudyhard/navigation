/**
 * @description: 根据url获取网址的head信息
 * @param {string} url
 * - url: 网址 icon的url title
 */
export async function fetchMeta(url: string) {
  const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
  if (res.ok) {
    // console.log(res.content)
    const data = await res.json()
    const parser = new DOMParser()
    const doc = parser.parseFromString(data.contents, 'text/html')
    const title = doc.head.querySelector('title')?.textContent
    const icon = (doc.head.querySelector('link[rel="shortcut icon"]') as HTMLLinkElement)?.href
    console.log('icon', doc)
    console.log('icon', icon)
    console.log('title', title)
    return {
      bookmarkWebsiteTitle: title || '未知',
      bookmarkWebsiteIcon: icon,
    }
  }
}
