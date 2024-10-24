<!--
 * new page
 * @author: blue
 * @since: 2024-10-08
 * BaseInput.vue
-->
<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import { InputConfig } from '@/lowcode/config/inputConfig'

// import { LowCodeConfig } from '@/types/lowcode'

// 定义一个低代码的基础Input组件
const props = defineProps<{
  customConfig: any
}>()

const deliverConfig = defineModel('currentConfig', {})
const emitConfig = defineModel('emitCoinfig', {})
const { text } = InputConfig
// 处理组件的配置
const InputConfigOption = ref({})

// 初始化组件配置
function initConfig() {
  // const config = Object.assign({}, props.customConfig.value, text)
  const config = Object.assign({}, props.customConfig.value, text)
  console.log('config', config)
  InputConfigOption.value = config
  // 如果有icon配置，需要处理icon
  if (config.icon) {
    const icon = config.icon
    const iconType = icon.type
    InputConfigOption.value = {
      ...InputConfigOption.value,
      props: {
        ...InputConfigOption.value.props,
        [iconType]: icon.iconName,
      },
    }
  }
  deliverConfig.value = InputConfigOption.value
  // console.log('emitConfig 相当于在这里给componentconfig赋值了', emitConfig.value, InputConfigOption.value)
}

function handleConfig() {
  // console.log('props', props.customConfig)
  const config = Object.assign({}, emitConfig.value, text)
  // console.log('config', config)
  InputConfigOption.value = config
  // 如果有icon配置，需要处理icon
  if (config.icon) {
    const icon = config.icon
    const iconType = icon.type
    InputConfigOption.value = {
      ...InputConfigOption.value,
      props: {
        ...InputConfigOption.value.props,
        [iconType]: icon.iconName,
      },
    }
  }
  // emitConfig.value = InputConfigOption.value
}
const defaultStyle = {
  width: '12rem',
}
watch(() => emitConfig.value, (newVal) => {

})
onMounted(() => {
  initConfig()
})
</script>

<template>
  <div class="container">
    <el-input v-if="emitCoinfig && emitCoinfig.props" v-bind="emitCoinfig.props" />
    <el-input
      v-else placeholder="请输入" :input-style="defaultStyle"
    />
  </div>
</template>

<style scoped></style>
