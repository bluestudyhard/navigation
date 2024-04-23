import path from 'node:path'
import fs, { writeFileSync } from 'node:fs'

import type { Plugin } from 'vite'
import type { SFCBlock } from '@vue/compiler-sfc'
import { MagicString, compileTemplate, parse } from '@vue/compiler-sfc'
import transformComponent, { resolveVue3 } from './core/transformComponent'
import transformer from './core/transformer'

export function autoImportComponents(): Plugin {
  return {
    name: 'auto-import-components',
    async transform(code, id) {
      if (!id.endsWith('.vue'))
        return
      // 跳过对App.vue的处理
      if (id.endsWith('App.vue'))
        return
      // console.log('code', code, 'id', id)
      const { descriptor } = parse(code)
      // console.log('transform', id, 'descriptor', descriptor)
      const s = new MagicString(code)
      // console.log('s!!!! ', s.toString())
      // const results = resolveVue3(code, s)
      const result = await transformer(code, id)

      return result
      // console.log('transform', id, 'template', template)

      // const componentNames = extractComponentNames(template)
      // const imports = generateImports(componentNames)
    },

    // handleHotUpdate: async ({ file, server, read }) => {
    //   console.log('update', file)
    //   if (file.endsWith('.vue')) {
    //     const updatedCode = await read()

    //     console.log('updatedCode', updatedCode)
    //     const { descriptor } = parse(updatedCode)

    //     const template = descriptor.template
    //     console.log('template', template)
    //     if (!template)
    //       return Promise.resolve()
    //     const componentNames = extractComponentNames(template)
    //     console.log('componentNames', componentNames)
    //     const imports = generateImports(componentNames)
    //     console.log('imports!!!! ', imports)
    //     // const newCode = `${imports}\n${updatedCode}`
    //     const newCode = updatedCode.replace(/<script setup lang="ts">([\s\S]*?)<\/script>/, `<script setup lang="ts">\n${imports}\n$1</script>`)
    //     console.log('newCode', newCode)
    //   }
    // },
  }
}
function extractComponentNames(template: SFCBlock): string[] {
  const { ast } = compileTemplate({
    source: template.content,
    filename: '',
    id: '',
  })
  const componentNames: string[] = []

  function traverse(node: any) {
    if (node.type === 1 && node.tag)
      componentNames.push(node.tag)

    if (node.children)
      node.children.forEach(traverse)
  }

  traverse(ast)
  return componentNames
}
function generateImports(componentNames: string[]): string {
  // console.log('componentNames', componentNames)
  const imports = componentNames
    .map((name) => {
      const filePath = path.resolve('src/components', `${name}.vue`).replace(/\\/g, '/')
      // 将filePath中的\替换为/

      if (fs.existsSync(filePath)) {
        console.log('exists', filePath)

        return `export const ${name}: typeof import('${filePath}')['default']`
      }

      else {
        return ''
      }
    })
    .filter(Boolean)
    .join('\n')

  // 将import的格式修改为 import {xxx} from @/components/xxx
  const imports2 = componentNames.map((name) => {
    const filePath = path.resolve('src/components', `${name}.vue`).replace(/\\/g, '/')
    if (fs.existsSync(filePath))
      return `import ${name} from '${filePath}'`
  }).filter(Boolean).join('\n')
  // console.log('imports', imports)
  // 在src目录下生成components.d.ts文件
  const typesPath = path.resolve('src/components.d.ts')
  writeFileSync(typesPath, imports)
  console.log('imports2', imports2)
  return imports2
}
