<!--
 * new page
 * @author: blue
 * @since: 2024-10-08
 * BaseInput.vue
-->
<script setup lang="ts">
import { InputConfig } from '@/lowcode/config/inputConfig'

// import { LowCodeConfig } from '@/types/lowcode'

// 定义一个低代码的基础Input组件
const props = defineProps<{
  customConfig: any
}>()
const { text } = InputConfig
// 处理组件的配置
const InputConfigOption = ref({})
function handleConfig() {
  const config = Object.assign({}, props.customConfig, text)
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
}
onMounted(() => {
  handleConfig()
})
</script>

<template>
  <div class="container">
    <el-input v-bind="InputConfigOption.props" />
  </div>
</template>

<style scoped></style>
