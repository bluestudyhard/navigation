<script setup lang="ts">
import { ref } from 'vue'

const components = ref([])
const selectedComponent = ref(null)

function addComponent(type: string) {
  const newComponent = {
    type,
    props: {
      label: type === 'text' ? '文本框' : '按钮',
    },
  }
  components.value.push(newComponent)
  selectedComponent.value = newComponent
}

function handleDragStart(event: { dataTransfer: { setData: (arg0: string, arg1: any) => void } }, type: any) {
  event.dataTransfer.setData('componentType', type)
}

function handleDrop(event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any } }) {
  event.preventDefault()
  const type = event.dataTransfer.getData('componentType')
  addComponent(type)
}

function handleDragOver(event: { preventDefault: () => void }) {
  event.preventDefault()
}
</script>

<template>
  <div class="form-designer">
    <div class="component-library">
      <button
        draggable="true"
        @dragstart="event => handleDragStart(event, 'text')"
      >
        文本框
      </button>
      <button
        draggable="true"
        @dragstart="event => handleDragStart(event, 'button')"
      >
        按钮
      </button>
    </div>
    <div
      class="design-area bg-blueGray w-full h-30vh"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <component
        :is="component.type"
        v-for="(component, index) in components"
        :key="index"
        v-bind="component.props"
      />
    </div>
    <div class="property-panel">
      <div v-if="selectedComponent">
        <label>标签: <input v-model="selectedComponent.props.label"></label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-designer {
  display: flex;
}
.component-library, .design-area, .property-panel {
  margin: 10px;
}
</style>
