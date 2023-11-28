// import * as XLSX from 'xlsx'

// 将tempsitelist的name去除，拿到所有的bookmarks

// 将tempsitelist导出为Excel
// function exportToExcel() {
//   // 创建一个工作簿
//   const workbook = XLSX.utils.book_new()
//   const temExcelArray = tempWebSiteList.flatMap(({ name, bookmarks }) =>
//     bookmarks.map(({ title, url, icon }) => ({ name, title, url, icon })),
//   )
//   console.log(temExcelArray)
//   // 创建一个工作表

//   const worksheet = XLSX.utils.json_to_sheet(temExcelArray)

//   // 将工作表添加到工作簿
//   XLSX.utils.book_append_sheet(workbook, worksheet, '拿到的所有书签数据')

//   // 将工作簿保存为Excel文件
//   XLSX.writeFile(workbook, 'website_list.xlsx')
// }
