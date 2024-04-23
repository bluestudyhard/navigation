import MagicString from 'magic-string'
import transformComponent from './transformComponent'

export default async function transformer(code: string, id: string) {
  const s = new MagicString(code)
  await transformComponent(code, id, s)
  const result = { code: s.toString(), map: s.generateMap({ hires: true }) }
  console.log('transformmer result', result)
  return result
}
