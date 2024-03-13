import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption,
} from 'echarts/charts'
import type {
  // 组件类型的定义后缀都为 ComponentOption
  DatasetComponentOption,
  GridComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import type {
  ComposeOption,
} from 'echarts/core'

type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

export type { ECOption }

// 服务器拿的数据的类型
interface baseData {
  id?: number
  name: string
  value: number
}
export interface relationsData {
  id: number
  name: string
  source: string
  target: string
  speed: number
  value: number[]
}
export interface regionDataType {
  regions: baseData[]
}

export interface serverDataType {
  servers: baseData[]
}
export interface riskDataType {
  risks: baseData[]
}
export interface abnormalDataType {
  abnormals: baseData[]
}
export interface wordCloudDataType {
  datas: baseData[]
}
export interface totalDataType {
  total: string
  hb: string
  db: string
  hd: string
  zn: string
  xn: string
  xb: string
}
interface DataPoint {
  name: string
  value: number | number[]
}

interface categoryData {
  [key: string]: DataPoint[]
}

export interface mapDataType {
  voltageLvel: string[]
  colors: string[]
  categoryData: categoryData
  topData: categoryData
}

export interface visualDataType {
  regionData: regionDataType
  serverData: serverDataType
  riskData: riskDataType
  abnormalData: abnormalDataType
  relationData: relationsData
  wordCloudData: wordCloudDataType
  totalData: totalDataType
  mapData: mapDataType
}
