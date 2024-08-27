export const testOption = {
  columnWidth: 100,
  column: [
    { label: '工廠', prop: 'port', width: 150 },
    {
      label: '尺码比例',
      prop: 'sizes',
      children: [
        { label: 'S', prop: 'S', width: 100 },
        { label: 'M', prop: 'M', width: 100 },
        { label: 'L', prop: 'L', width: 100 },
        { label: 'XL', prop: 'XL', width: 100 },
        { label: 'XXL', prop: 'XXL', width: 100 },
        { label: 'XXXL', prop: 'XXXL', width: 100 },
      ],
    },
  ],
  sum: true,
  sumProp: 'total',
  sumLabel: '合计',
  sumFunc: () => {},
}
export const owsExcelHeadLineOption = {
  size: 'small',
  labelWidth: 150,
  submitBtn: false,
  emptyBtn: false,
  menuSpan: 6,
  column: [
    {
      label: '款號',
      type: 'input',
      prop: 'po_no',
      disabled: true,
      // dicData: [],
      span: 12,
    },
    {
      label: '工廠',
      type: 'input',
      prop: 'factory_name',
      // dicData: [],
    },
    {
      label: '設計號',
      type: 'input',
      prop: 'des_id',
      // dicData: [],
    },
    {
      label: '面料',
      type: 'input',
      prop: 'Fabric',
      // dicData: [],
    },
    {
      label: '零售額',
      type: 'input',
      prop: 'ref_price',
      // dicData: [],
      span: 6,
    },
    {
      label: '吊牌價',
      type: 'input',
      labelPosition: 'left',
      prop: 'origpri',
      span: 6,
    },
    {
      label: '貨品類別',
      type: 'input',
      prop: 'GoodsGroup',
      // dicData: [],
    },
    {
      label: '單價(RMB/不含稅): ',
      type: 'input',
      prop: 'notTaxprice',
      // dicData: [],
    },
    {
      label: '合同總件數',
      type: 'input',
      prop: 'ponoTotal',
      // dicData: [],
    },
    {
      label: '單價(RMB/含稅): ',
      type: 'input',
      prop: 'Taxprice',
      // dicData: [],
    },
    {
      label: '合同總銀碼(含稅): ',
      type: 'input',
      prop: 'ponoSilvercode',
      // dicData: [],
      span: 10,
    },
    {
      label: '毛利率(零售額-单价含税)/零售額',
      type: 'input',
      prop: 'gross',
      // dicData: [],
      span: 10,
      labelWidth: 220,
    },
  ],
}

// 假定我的数据是这样的
const data = [
  {
    port: 'C4-001 廣東總倉',
    S: '19%',
    M: '30%',
    L: '33%',
    XL: '19%',
    XXL: '-',
    XXXL: '-',
  },
  {
    port: 'C5-001 西北總倉',
    S: '-',
    M: '26%',
    L: '35%',
    XL: '22%',
    XXL: '17%',
    XXXL: '-',
  },
  {
    port: 'P8-001 華中總倉',
    S: '15%',
    M: '31%',
    L: '31%',
    XL: '23%',
    XXL: '-',
    XXXL: '-',
  },
  {
    port: 'C8-011 線下樣辦店倉',
    S: '-',
    M: '-',
    L: '-',
    XL: '-',
    XXL: '-',
    XXXL: '-',
  },
  {
    port: 'A4-001 廣東聯營',
    S: '8%',
    M: '29%',
    L: '33%',
    XL: '29%',
    XXL: '-',
    XXXL: '-',
  },
  {
    port: 'B5-001 四川聯營',
    S: '-',
    M: '29%',
    L: '43%',
    XL: '29%',
    XXL: '-',
    XXXL: '-',
  },
  {
    port: 'B8-001 華中聯營',
    S: '-',
    M: '36%',
    L: '33%',
    XL: '18%',
    XXL: '12%',
    XXXL: '-',
  },
  {
    port: 'F1-002 山東NEW商',
    S: '11%',
    M: '22%',
    L: '22%',
    XL: '22%',
    XXL: '22%',
    XXXL: '-',
  },
]
/**
 * @description: 根据数据生成表格的配置来打印表格
 */
export function generalExcelTableOption(data, option, styles) {
  const keys = Object.keys(data[0])
  // 如果没有手动传入Option配置项，那么就根据数据生成配置项
  if (!styles) {
    styles = {
      width: 100,
    }
  }
  if (!option) {
    // 1. 将data的值全部结构，拿到所有的key作为表头

    // 2. 生成表格的配置
    const column = keys.map((key) => {
      return {
        label: key,
        prop: key,
      }
    })
    // console.log("column", column)
  }
  // 如果有传入配置项，那么就直接使用传入的配置项,然后和data进行匹配
  if (option) {
    const optionColumn = option.column
    const optionKeys = optionColumn.map(item => item.prop)
    // 如果传入的data中有多余的key就过滤掉，反正是以配置项为最后的配置
    const resultKeys = keys.filter(key => optionKeys.includes(key))

    return {
      column: resultKeys.map((key) => {
        return optionColumn.find(item => item.prop === key)
      }),
      ...option,
    }
  }
}
// "po_no": "A-JW-42-173540-51",
// "po_loc": "A4-001",
// "poloc_name": "廣東聯營",
// "poloctypeid": "2",
// "poloctype": "聯營",
// "color": "2022",
// "size": "L",
// "sizseq": "17",
// "qty": "8"
export const BmPonoSalesColorTableOption = {
  columnWidth: 100,
  column: [
    {
      label: '口岸',
      prop: 'poloc_name', // po_loc + "-" + poloc_name
      width: 160,
    },
    {
      label: '颜色号',
      prop: 'color',
      width: 100,
    },
    {
      label: '颜色%',
      prop: 'percentage',
    },

    // {
    //   label: '尺码件数',
    //   children: [

    //     { label: '合计', prop: 'total' },
    //   ],
    // },
    { label: 'S', prop: 'S', width: 100 },
    { label: 'M', prop: 'M', width: 100 },
    { label: 'L', prop: 'L', width: 100 },
    { label: 'XL', prop: 'XL', width: 100 },
    { label: 'XXL', prop: 'XXL', width: 100 },
    { label: 'XXXL', prop: 'XXXL', width: 100 },
    { label: '合计', prop: 'total', width: 100 },
  ],
}
export const BmPonoSalesColorTableOption1 = {
  columnWidth: 100,
  column: [
    {
      label: '口岸',
      prop: 'poloc_name', // po_loc + "-" + poloc_name
      width: 150,
    },
    {
      label: '尺码比例',
      children: [{ label: '合计', prop: 'total' }],
    },
  ],
}
/**
 * @description: 第三个表格的配置
 */
export const BmPonoSalePeriodTableOption = {
  columnWidth: 100,
  column: [
    {
      label: '销售时段',
      prop: 'poloc_name',
      width: 150,
    },
    {
      label: '倒倉期',
      prop: 'arrdate',
      width: 100,
    },
    {
      label: '首銷期',
      prop: 'saleDate',
      width: 100,
    },
    {
      label: '末銷期',
      prop: 'finishDate',
      width: 100,
    },
  ],
}
export function generalBmPonoSalesColorTableOption(data, option, key) {
  const sizeArr = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']

  // 拿到所有data中是这个key的数据，然后生成children，比如说尺码总共有s,m,l,xl,xxl,xxxl

  let temp = new Set(
    data.map((item) => {
      return item[key]
    }),
  )
  temp = Array.from(temp)
  console.log('temp!!!!!!!!', temp)
  // 如果满足temp是sizeArr的子集，那么就生成children
  if (temp.every(item => sizeArr.includes(item))) {
    const resultChirdren = sizeArr.map((item) => {
      return {
        label: item,
        prop: item,
      }
    })
    // 找到option中的children，然后push进去
    const optionChildren = option.column.find(item => item.children)
    optionChildren.children = resultChirdren
    return option
  }

  const resultChirdren = Array.from(temp).map((item) => {
    return {
      label: item,
      prop: item,
    }
  })
  console.log('option', option)
  console.log('resultChirdren', resultChirdren)
  const optionChildren = option.column.find(item => item.children)
  console.log('optionChildren', optionChildren)
  optionChildren.children = resultChirdren
  return option
  // console.log("resultChirdren", resultChirdren)
}
