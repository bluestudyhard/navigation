import { defineStore } from 'pinia'
import { ref } from 'vue'
import type menuType from '@/types/menutype'
import constantRoute from '@/router/constRoutes'
import { getUserInfo } from '@/api/user/index'
import router from '@/router'

const token = ref(localStorage.getItem('token') || '')
const userStore = defineStore('user', {
  state: () => {
    return {
      token: token.value,
      constanRoutes: constantRoute as menuType['menuRouter'],
      username: '',
      password: '',
      userAvatar: '/logo.png',
      isAdmin: false,
      userId: 0,
    }
  },

  actions: {
    // 获取用户信息
    async getUser() {
      // 如果已经拿到了用户信息就不再获取了
      if (this.username)
        return
      const res = await getUserInfo()

      console.log(res.data)
      if (res.data.code === 200) {
        this.userAvatar = res.data.user.avatar
        this.username = res.data.user.username
        this.userId = res.data.user.id
      }
    },
    getToken() {
      this.token = localStorage.getItem('token') || ''
    },
    getAudit() {
      if (this.token !== 'Admin~')
        this.isAdmin = false
      else this.isAdmin = true
    },
    // 登出
    logout() {
      // 移除token
      localStorage.removeItem('token')
      // 移除用户信息
      this.$patch({
        token: '',
        username: '',
        userAvatar: '/logo.png',
        userId: 0,
      })

      router.push('/login')
    },
  },
  persist: true,
})

export default userStore
