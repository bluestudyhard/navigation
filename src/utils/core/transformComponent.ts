import path from 'node:path'
import type MagicString from 'magic-string'

export function resolveVue3(code: string, s: MagicString) {
  const results = []
  /**
     * when using some plugin like plugin-vue-jsx, resolveComponent will be imported as resolveComponent1 to avoid duplicate import
     */
  for (const match of code.matchAll(/_resolveComponent[0-9]*\("(.+?)"\)/g)) {
    const matchedName = match[1]
    console.log('matchedName', matchedName)
    if (match.index != null && matchedName && !matchedName.startsWith('_')) {
      const start = match.index
      const end = start + match[0].length
      results.push({
        rawName: matchedName,
        replace: resolved => s.overwrite(start, end, resolved),
      })
    }
  }
  console.log('results !!!!! !!!!!', results)
  return results
}

async function findComponent(name: string) {
  // 查找src/components下的文件
  const filePath = path.resolve('src/components', `${name}.vue`).replace(/\\/g, '/')
  console.log('filePath', filePath)
  return filePath
}
function stringifyImport(info: string | { name?: string; as: string; from: string }) {
  if (typeof info === 'string')
    return `import '${info}'`
  if (!info.as)
    return `import '${info.from}'`
  else if (info.name)
    return `import { ${info.name} as ${info.as} } from '${info.from}'`
  else
    return `import ${info.as} from '${info.from}'`
}
function stringifyComponentImport(filePath: string, varName: string) {
  return `import ${varName} from '${filePath}'\n`
}
export default async function transformComponent(code: string, id: string, s: MagicString) {
  let no = 0
  const results = resolveVue3(code, s)
  for (const { rawName, replace } of results) {
    // 将name变成大驼峰命名
    const name = rawName.replace(/-(\w)/g, (_, s) => s.toUpperCase())
    console.log('name', name)
    const component = await findComponent(name)
    if (component) {
      const varName = `_unplugin_components_${no}`
      s.prepend(stringifyComponentImport(component, varName))
      no += 1
      replace(varName)
    }
  }
}
