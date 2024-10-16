<!--
 * new page
 * @author: blue
 * @since: 2024-10-16
 * ConfigRegion.vue
-->
<script setup lang="ts">
import { configRegion } from '@/lowcode/config'

const testConfig = ref({
  id: '',
  name: 'base-text-input',
  props: {
    type: 'text',
    label: '文本输入框',
    placeholder: '请输入',
    defaultValue: '',
    disabled: false,
    size: ['small', 'default', 'large'],
    state: ['normal', 'success', 'warning', 'error'],
    icon: {
      type: ['prefix-icon', 'suffix-icon'],
      iconName: '',
    },
    maxLength: 100,
    showWordLimit: false,
    clearable: false,
    showPassword: false,
    readonly: false,
    autofocus: false,
    autocomplete: 'off',
    inputStyle: {
      width: '12rem',
    },
    // 定义渲染配置项的配置

  },
  children: [],
  events: ['blur', 'focus', 'change', 'input', 'clear'],
})
const { baseRegion } = configRegion
// 处理配置项的配置
function handleConfig(config: any) {
  const props = config.props
  const renderedConfig: any = {}

  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      // 检查 baseRegion 中是否存在该配置项
      for (const regionKey in baseRegion) {
        if (baseRegion[regionKey].includes(key))
          renderedConfig[key] = props[key]
      }
    }
  }
  console.log('renderedConfig', renderedConfig)
  return renderedConfig
}
onMounted(() => {
  handleConfig(testConfig.value)
})
</script>

<template>
  <div class="container p-2">
    <p>配置区域</p>
    <el-form>
      <el-form-item label="标签文本">
        <el-input />
      </el-form-item>
      <el-form-item label="输入提示">
        <el-input placeholder="请输入" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
