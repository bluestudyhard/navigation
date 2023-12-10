// import http from 'node:http'
import express from 'express'
import axios from 'axios'
import jsdom from 'jsdom'
import cors from 'cors'
import multer from 'multer'

// import httpProxy from 'http-proxy'
const app = express()
const upload = multer()
const port = 3080

async function testParse(url: string) {
  const res = await axios.get(url)
  // 获取目标网页的html中的head，然后拿到title和icon

  const html = res.data // 查看html的类型
  const type = typeof html
  const dom = new jsdom.JSDOM(html)
  const document = dom.window.document
  const head = document.querySelector('head')
  const title = head?.querySelector('title')?.textContent
  const icon = (head?.querySelector('link[rel="icon"]') as HTMLLinkElement)?.href
  const data = {
    title,
    icon,
  }
  console.log(type)
  return data
}

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.get('/', async (_req, res) => {
  res.send('请求成功')
})
app.get('/test', async (_req, res) => {
  const url = 'https://www.blueltytblog.top/'
  const data = await testParse(url)
  res.status(200).send(data)
})
app.post('/onesite', async (req, res) => {
  const { url } = req.body
  if (!url) {
    res.status(500).send('请求失败')
    return
  }
  const data = await testParse(url)
  res.status(200).send(data)
})
app.post('/website', upload.single('file'), (req, _res) => {
  // 获取req的数据
  const requestData = req.file
  const fileData = requestData?.buffer.toString('utf-8')
  // 将filedata转换成dom
  const dom = new jsdom.JSDOM(fileData)
  const document = dom.window.document

  const dt = document.querySelectorAll('dt')

  const h3 = document.querySelectorAll('h3')
  // console.log(dl?.innerHTML)
  dt.forEach((item) => {
    const title = item.textContent?.trim()
    const url = item.querySelector('a')?.href
    const data = {
      title,
      url,
    }

    console.log(data)
  })
  h3.forEach((item) => {
    console.log(item.textContent)
  })
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`)
})
