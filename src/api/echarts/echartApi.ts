import { createService } from '@/utils/request'

const baseUrl = 'https://api.imooc-web.lgdsunday.club/api'

const service = createService(baseUrl)

export function getVisualization() {
  return service.get('/visualization')
}
