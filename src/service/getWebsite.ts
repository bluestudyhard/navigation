import { getWebSiteList } from '@/api/website/website'

export async function webSideList() {
  const res = await getWebSiteList()
  console.log(res.data)
  return res.data
}
