import { defineStore } from 'pinia'

export const useAvatarStore = defineStore('avatar', {
  state: () => {
    return {
      userAvatar: '/logo.png', // 头像
    }
  },
})
