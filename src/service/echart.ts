import { getVisualization } from '@/api/echarts/echartApi'
import type { visualDataType } from '@/types'

export async function getEchartDataActions() {
  const res = await getVisualization()
  return res as unknown as visualDataType
} // 获得echart数据
