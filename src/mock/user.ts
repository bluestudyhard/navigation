// function createUserList() {
//   return [
//     {
//       id: 1,
//       username: 'admin',
//       password: 'admin',
//       nickname: '管理员',
//       roles: ['admin'],
//       email: '3164752596@qq.com',
//       phone: '12345678910',
//       token: 'Admin~',
//       avatar: '/logo.png',
//     },
//     {
//       id: 2,
//       username: 'user',
//       password: 'user',
//       nickname: '普通用户',
//       roles: ['user'],
//       email: '3164752596@qq.com',
//       token: 'User~',
//       phone: '12345678910',
//       avatar: '/logo.png',
//     },
//   ]
// }
// export default [
//   {
//     url: '/api/user/login',
//     method: 'post',
//     response: ({ body }) => {
//       const { username, password } = body
//       const userList = createUserList()
//       const user = userList.find(item => item.username === username && item.password === password)
//       const token = user?.token || ''
//       if (!user) {
//         return {
//           code: 500,
//           message: '用户名或密码错误',
//         }
//       }
//       return {
//         code: 200,
//         token,

//       }
//     },
//   },
//   {
//     url: '/api/user/info',
//     method: 'get',
//     response: ({ headers }) => {
//       const token = headers.token
//       const userList = createUserList()
//       const user = userList.find(item => item.token === token)
//       if (!user) {
//         return {
//           code: 500,
//           message: '用户信息获取失败',
//         }
//       }
//       return {
//         code: 200,
//         user,
//       }
//     },
//   },
// ]
