interface TestDataItem {
  poloc_name: string
  po_loc: string
  color: string
  size: string
  qty: string
  poloctype: string
}

interface GroupDataItem {
  poloc_name: string
  color: string
  sizes: { [key: string]: number }
  total: number
  poloctype: string
}

interface Totals {
  [key: string]: {
    [key: string]: number
    color?: { [key: string]: number }
    total?: number
    percentage?: { [key: string]: string }
  }
}

interface ResultItem {
  poloc_name: string
  color: string
  percentage: string
  total?: number
  isHightLight?: boolean
  [key: string]: any
}

function updateTotals(totalObj: { [key: string]: number; color?: { [key: string]: number }; total?: number }, size: string, color: string, qty: number) {
  if (!totalObj[size])
    totalObj[size] = 0

  if (!totalObj.color)
    totalObj.color = {}

  if (!totalObj.color[color])
    totalObj.color[color] = 0

  totalObj.color[color] += qty
  totalObj.total = (totalObj.total || 0) + qty
}
export function calculateData(testData: TestDataItem[]): ResultItem[] {
  const groupData: { [key: string]: GroupDataItem } = {}
  testData.forEach((item) => {
    const key = `${item.poloc_name}-${item.color}`
    if (!groupData[key]) {
      groupData[key] = {
        poloc_name: `${item.po_loc} ${item.poloc_name}`,
        color: item.color,
        sizes: {},
        total: 0,
        poloctype: item.poloctype,
      }
    }
    if (!groupData[key].sizes[item.size])
      groupData[key].sizes[item.size] = 0

    groupData[key].sizes[item.size] += Number.parseInt(item.qty, 10)
    groupData[key].total += Number.parseInt(item.qty, 10)
  })

  const totals: Totals = {
    自營: {},
    加盟: {},
    聯營: {},
    selfJoinFran: {},
  }
  testData.forEach((item) => {
    const qty = Number.parseInt(item.qty, 10)
    updateTotals(totals[item.poloctype], item.size, item.color, qty)
    updateTotals(totals.selfJoinFran, item.size, item.color, qty)
  })

  Object.keys(totals).forEach((key) => {
    const total = totals[key].total || 0
    const color = totals[key].color || {}
    const colorPercentage: { [key: string]: string } = {}
    Object.keys(color).forEach((colorKey) => {
      colorPercentage[colorKey] = `${((color[colorKey] / total) * 100).toFixed(0)}%`
    })
    totals[key].percentage = colorPercentage
  })

  const result: ResultItem[] = []
  const polocNames: { [key: string]: GroupDataItem[] } = {}
  const sizeSummary: { [key: string]: number } = {}

  Object.values(groupData).forEach((group) => {
    const sizes = group.sizes
    delete group.sizes
    const newGroup = { ...group, ...sizes }
    if (!polocNames[group.poloc_name])
      polocNames[group.poloc_name] = []

    polocNames[group.poloc_name].push(newGroup)

    Object.keys(sizes).forEach((size) => {
      if (!sizeSummary[size])
        sizeSummary[size] = 0

      sizeSummary[size] += sizes[size]
    })
  })

  Object.keys(polocNames).forEach((poloc_name) => {
    const locNames = polocNames[poloc_name]
    const total = locNames.reduce((acc, color) => acc + color.total, 0)
    locNames.forEach((loc, index) => {
      const percentage = `${((loc.total / total) * 100).toFixed(0)}%`
      const { poloc_name, color, ...restLoc } = loc
      if (index === 0) {
        result.push({
          poloc_name: loc.poloc_name,
          color: loc.color,
          percentage,
          ...restLoc,
        })
      }
      else {
        result.push({
          poloc_name: ' ',
          color: loc.color,
          percentage,
          ...restLoc,
        })
      }
    })

    const ttl = locNames.reduce((acc, color) => {
      Object.keys(color).forEach((key) => {
        if (!['poloc_name', 'color', 'percentage', 'total', 'poloctype'].includes(key)) {
          if (!acc[key])
            acc[key] = 0

          acc[key] += color[key]
        }
      })
      return acc
    }, { total } as { [key: string]: number })
    ttl.poloc_name = ''
    ttl.color = 'TTL'
    ttl.percentage = '100%'
    ttl.isHightLight = true
    result.push(ttl)
  })

  Object.keys(totals).forEach((key) => {
    const summaryName = key === 'selfJoinFran' ? '自營+加盟+聯營' : key
    const color = totals[key].color || {}
    const ttlSummary: { [key: string]: number | string } & { poloc_name?: string; color?: string; percentage?: string; isHightLight?: boolean; total?: number } = { color: 'TTL', percentage: '100%', total: 0 }
    Object.keys(color).forEach((colorKey, index) => {
      const colorTotal = color[colorKey]
      const colorPercentage = totals[key].percentage?.[colorKey] ?? ''
      const ttl: ResultItem = { poloc_name: '', color: colorKey, percentage: colorPercentage, isHightLight: false, total: colorTotal }
      if (index === 0) {
        ttl.poloc_name = `${summaryName} TTL`
        ttl.color = colorKey
        ttl.percentage = colorPercentage
        ttl.isHightLight = true
        result.push(ttl)
      }
      else {
        ttl.poloc_name = ' '
        ttl.color = colorKey
        ttl.percentage = colorPercentage
        result.push(ttl)
      }
      Object.keys(ttl).forEach((key) => {
        if (!['poloc_name', 'color', 'percentage', 'isHightLight'].includes(key)) {
          if (!ttlSummary[key])
            ttlSummary[key] = 0

          ttlSummary[key] += ttl[key]
        }
      })
    })
    result.push(ttlSummary)
  })
  result.forEach((item, index) => {
    item.index = index
  })
  return result
}

interface TableData {
  index: number
  cmp_name: string
  cmp_id: string
  qty1: number | string
  qty2: number | string
  percentage: string
  poc_total: number | string
  total: number
}T

export function initData(tableData: TableData[]) {
  console.log('tableData', tableData)
  // 预处理，将qty转换成数字
  tableData.forEach((item) => {
    item.qty1 = Number.parseInt(item.qty1 as string, 10)
    item.qty2 = Number.parseInt(item.qty2 as string, 10)
    item.poc_total = Number.parseInt(item.poc_total as string, 10)
  })
  tableData.forEach((item) => {
    // 将qty1和qty2转换成
    item.total = item.qty1 + item.qty2
    item.percentage = `${((item.qty2 / item.total) * 100).toFixed(0)}%`
  })
  return tableData
}
