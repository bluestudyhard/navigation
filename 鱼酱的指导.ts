// const res = {
//   AIxxx: {
//     工具集: [
//       {
//         name: '人教版八年级',
//       }, {
//         name: '书栈网 · ',
//       },
//     ],
//     biede: [
//       {
//         name: '物语系列顺序',
//       },
//     ],
//   },
// }

// // v-for="(folderName, tags) in Object.entries(res)" :key="folderName"
// //          v-for="(tagName, websites) in tags" :key="tagName"

// interface Res {
//   [key: string]: {
//     [key: string]: {
//       name: string
//     }[]
//   }
// }

// const arr = [
//   {
//     website_name: '人教版八年级',
//     tag_name: '工具集',
//     title_name: 'AI工具集',
//   },
//   {
//     website_name: '书栈网 · ',
//     tag_name: '工具集22',
//     title_name: 'AI工具集11',
//   },
//   {
//     website_name: '微信读书-正',
//     tag_name: '工具集',
//     title_name: 'AI工具集',
//   },
//   {
//     website_name: '富爸爸穷爸爸',
//     tag_name: '工具集22',
//     title_name: 'AI工具集11',
//   },
//   {
//     website_name: '物语系列顺序',
//     tag_name: '工具集',
//     title_name: 'AI工具集',
//   },
// ]

// const data: Res = arr.reduce((acc, cur) => {
//   const { website_name, tag_name, title_name } = cur
//   if (!acc[title_name])
//     acc[title_name] = {}

//   if (!acc[title_name][tag_name])
//     acc[title_name][tag_name] = []

//   acc[title_name][tag_name].push({ name: website_name })
//   return acc
// }, {})

// console.log(data)

// const apiRes = {
//   code: 233,
//   data: [

//   ],
// }
