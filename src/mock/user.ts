function createUserList() {
  return [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      desc: '管理员',
      roles: ['admin'],
      routes: ['home'],
      token: 'Admin~',
      avator: '/logo.png',
    },
    {
      id: 2,
      username: 'user',
      password: 'user',
      desc: '普通用户',
      roles: ['user'],
      routes: ['home'],
      token: 'User~',
      avator: '/logo.png',
    },
  ]
}
export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const userList = createUserList()
      const user = userList.find(item => item.username === username && item.password === password)
      const token = user?.token || ''
      if (!user) {
        return {
          code: 500,
          message: '用户名或密码错误',
        }
      }
      return {
        code: 200,
        token,

      }
    },
  },
  {
    url: '/api/user/info',
    method: 'get',
    response: ({ headers }) => {
      const token = headers.token
      const userList = createUserList()
      const user = userList.find(item => item.token === token)
      if (!user) {
        return {
          code: 500,
          message: '用户信息获取失败',
        }
      }
      return {
        code: 200,
        user,
      }
    },
  },
]
