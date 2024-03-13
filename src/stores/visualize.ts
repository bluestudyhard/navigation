import { defineStore } from 'pinia'
import type { visualDataType } from '@/types'
import { getEchartDataActions } from '@/service/echart'

export const useVisualizeStore = defineStore('visualize', {
  state: () => {
    return {
      visualData: {} as visualDataType,
    }
  },
  actions: {
    async  getVisualData() {
      const res = await getEchartDataActions()
      this.visualData = res
      // console.log(res)
    },
  },
})
