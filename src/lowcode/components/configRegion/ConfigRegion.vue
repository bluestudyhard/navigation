<!--
 * new page
 * @author: blue
 * @since: 2024-10-16
 * ConfigRegion.vue
-->
<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import Size from './Size.vue'
import State from './State.vue'
import { configDisplayNames, configRegion } from '@/lowcode/config'

// const props = defineProps<{
//   renderRegionConfig: any
// }>()

const renderRegionConfig = defineModel('renderRegionConfig', {
  type: Object,
  default: {},
})
const renderComponentConfig = defineModel('renderComponentConfig', {
  type: Object,
  default: {},
})
const baseRegion: { [key: string]: string[] } = { ...configRegion }
interface ConfigItem {
  id: string
  label: string
  renderName: string
  renderType: string
  renderValue: any
}

const configFormList = ref<ConfigItem[]>([])
/**
 * @description: 处理配置项的配置
 */
function handleConfig(config: any) {
  const props = config.props
  // console.log('props', props)
  const id = config.id
  // console.log('id', id)
  for (const key in props) {
    if (Object.hasOwnProperty.call(props, key)) {
      for (const regionKey in baseRegion) {
        if (baseRegion[regionKey].includes(key)) {
          const label = configDisplayNames[key]
          const renderName = key
          const renderType = regionKey
          const renderValue = props[key]
          const configItem = {
            id,
            label,
            renderName,
            renderType,
            renderValue,
          }
          configFormList.value.push(configItem)
        }
      }
    }
  }
  // 对configFormList进行排序，让其按照renderType的顺序进行排序
  configFormList.value.sort((a, b) => {
    return a.renderType.localeCompare(b.renderType)
  })
  // console.log('renderedConfig', configFormList.value)
}
// 处理如何在模板中渲染配置项
// [
//   {
//     label:'文本输入框',
//     renderName:'disabled',
//     renderType:'switch',
//     renderValue:false,
//   }
// ]
// 表单绑定的值
const lastConfig = ref({})
const configFormValues = ref({})

watch(() => renderRegionConfig.value, (newConfig) => {
  configFormList.value = []
  if (newConfig !== lastConfig.value) { // 确保是一个新的对象
    handleConfig(cloneDeep(newConfig))
    // console.log('newConfig', newConfig)
  }
}, { immediate: true, deep: true })
</script>

<template>
  <div class="container p-2">
    <p>配置区域</p>

    {{ renderRegionConfig }}
    <el-form v-model="configFormValues">
      <el-form-item
        v-for="item in configFormList"
        :key="item.renderName"
        :label="item.label"
      >
        <el-switch v-if="item.renderType === 'switch'" v-model="renderRegionConfig.props[item.renderName]" />
        <State v-else-if="item.renderType === 'state'" v-model="renderRegionConfig.props[item.renderName]" />
        <Size v-else-if="item.renderType === 'size'" v-model="renderRegionConfig.props[item.renderName]" />
        <el-input v-else v-model="renderRegionConfig.props[item.renderName]" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">

</style>
