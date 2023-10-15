import { defineStore } from 'pinia'
import type menuType from '@/types/menutype'
import constantRoute from '@/router/constRoutes'
import { getUserInfo } from '@/api/user/index'

const userStore = defineStore('user', {
  state: () => {
    return {
      token: localStorage.getItem('token') || '',
      constanRoutes: constantRoute as menuType['menuRouter'],
      username: '',
      password: '',
      userAvator: '/logo.png',
      isAdmin: false,
    }
  },
  actions: {
    // 获取用户信息
    async getUser() {
      const res = await getUserInfo()
      console.log(res.data)
      if (res.data.code === 200)
        this.userAvator = res.data.user.avator
      this.username = res.data.user.username
    },
    getAudit() {
      if (this.token !== 'Admin~')
        this.isAdmin = false
      else this.isAdmin = true
    },
  },
})

export default userStore
