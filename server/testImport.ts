import path from 'node:path'
import fs from 'node:fs'
import { parse } from '@vue/compiler-sfc'

const __dirname = path.resolve()

fs.readFile(path.join(__dirname, 'src/components/Foo.vue'), 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const sfc = parse(data)
  console.log(sfc)
})
