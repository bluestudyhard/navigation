<!--
 * new page
 * @author: blue
 * @since: 2024-10-16
 * ConfigRegion.vue
-->
<script setup lang="ts">
import Size from './Size.vue'
import State from './State.vue'
import { configDisplayNames, configRegion } from '@/lowcode/config'

const props = defineProps<{
  renderRegionConfig: any
}>()

const baseRegion: { [key: string]: string[] } = { ...configRegion }
interface ConfigItem {
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
  console.log('props', props)
  const id = config.id
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
  console.log('renderedConfig', configFormList.value)
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
const configFormValues = ref({})
watch(() => props.renderRegionConfig, (newConfig) => {
  configFormList.value = []
  if (newConfig) {
    console.log('newConfig', newConfig)
    handleConfig(newConfig)
  }
}, { immediate: true })
</script>

<template>
  <div class="container p-2">
    <p>配置区域</p>
    {{ configFormValues }}
    {{ configFormList }}
    <el-form v-model="configFormValues">
      <el-form-item
        v-for="item in configFormList"
        :key="item.renderName"
        :label="item.label"
      >
        <el-switch v-if="item.renderType === 'switch'" v-model="item.renderValue" />
        <State v-else-if="item.renderType === 'state'" v-model="item.renderValue" />
        <Size v-else-if="item.renderType === 'size'" v-model="item.renderValue" />
        <el-input v-else v-model="item.renderValue" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">

</style>
