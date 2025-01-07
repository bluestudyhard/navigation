import axios from 'axios'

async function findImageUrl(url) {
  const response = await axios.get(url)
  const data = response.data
  return data
}

async function findimgurl(fileid) {
  if (fileid !== '') {
    const result = await findImageUrl(`https://jsonplaceholder.typicode.com/photos/${fileid}`)
    const url = JSON.stringify(result)

    return url
  }
  return null // 如果 fileid 为空，返回 null
}

async function getImgUrl() {
  const url = await findimgurl('1')
  return url
}
console.log(getImgUrl())
