import { defineStore } from 'pinia'

export const useAvatorStore = defineStore('avator', {
  state: () => {
    return {
      userAvator: '/logo.png', // 头像
    }
  },
})
