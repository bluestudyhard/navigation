import axios from 'axios'

export default async function requestIframe(targetUrl: string) {
  const res = await axios.post('http://localhost:3090/iframe', {
    targetUrl,
  })
  return res.data
}
