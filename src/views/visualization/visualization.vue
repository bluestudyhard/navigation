<!--
 * new page
 * @author: blue
 * @since: 2024-03-10
 * visualization.vue
-->
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

import type { visualDataType } from '@/types'
import { useVisualizeStore } from '@/stores/visualize'

const target = ref<HTMLElement>()
const chart = ref<echarts.ECharts>()
const data = ref<visualDataType>()

const visualizeStore = useVisualizeStore()

function renderChart() {
  chart.value = echarts.init(target.value)
  const options: EChartsOption = {
    // 标题
    title: {
      text: 'ECharts 入门示例',
      textStyle: {},
    },
    // 提示框
    tooltip: {},

    // x轴的数据
    xAxis: {
      show: false, // 隐藏x轴
      type: 'value',
      max: (value) => {
        return value.max * 1.2
      },

    },
    // y轴的数据
    yAxis: {
      type: 'category',
      data: data.value?.regionData.regions.map(item => item.name),
      axisLine: {
        show: false, // 隐藏y轴
      },
      axisLabel: {
        color: '#282C34',
      },
      // 翻转
      inverse: true,
    },
    // 图表绘制的位置
    grid: {
      left: '0',
      right: '0',
      top: '10%',
      bottom: '0',
      containLabel: true,
      // title不按照grid的位置来定位

    },
    // 图表数据
    series: [
      {
        // 图表类型
        type: 'bar',
        // 数据
        data: data.value?.regionData.regions.map(item => item.value),
        showBackground: true,
        backgroundStyle: {
          color: '#F1F2F3',
        },
        itemStyle: {
          color: '#5C98D0', // 柱子颜色
          borderRadius: 5, // 柱子的圆角
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 5,
        },
        barWidth: 10, // 柱子宽度
        // 轴上的字体颜色
        label: {
          show: true,
          position: 'right',
          color: '#282C34',
        },
      },
    ],
  }
  chart.value?.setOption(options as any)
}
function loadData() {
  visualizeStore.getVisualData()
  data.value = visualizeStore.visualData
}

onMounted(async () => {
  loadData()
  renderChart()
})
onUnmounted(() => {
  chart.value?.dispose()
})
// 定期刷新数据
setInterval(() => {
  loadData()
}, 3000)
// 监听数据的变化
watch(data, () => {
  renderChart()
})
</script>

<template>
  <div id="container" class="container  h-full ">
    <div ref="target" class="chart w-40 h-40" />
    <div class="screen w-30 h-30 bg-blue" />
  </div>
</template>

<style scoped></style>
