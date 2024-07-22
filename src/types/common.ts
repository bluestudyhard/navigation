interface Column {
  label: string
  prop: string
  width?: number
  type?: string
}
/**
 * @description 通用表格配置
 */
export interface TableOption {
  index: boolean
  column: Column[]
}
