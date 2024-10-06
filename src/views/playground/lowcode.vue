<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElInput } from 'element-plus'

const components = ref([
  { type: 'button', label: 'Button', component: ElButton },
  { type: 'input', label: 'Input', component: ElInput },
])

const designArea = ref([])
const selectedComponent = ref(null)

function onDrop(event) {
  event.preventDefault()
  const component = event.dataTransfer.getData('component')
  designArea.value.push(JSON.parse(component))
}

function selectComponent(component) {
  selectedComponent.value = component
}
</script>

<template>
  <div class="form-designer">
    <div class="component-library bg-blueGray w-15rem h-full">
      <div
        v-for="component in components" :key="component.type"
        draggable="true"
        @dragstart="event => event.dataTransfer.setData('component', JSON.stringify(component))"
      >
        {{ component.label }}
      </div>
    </div>
    <div
      class="design-area bg-coolGray border w-full h-50vh"
      @drop="onDrop"
      @dragover="event => event.preventDefault()"
    >
      <component
        :is="component.component"
        v-for="(component, index) in designArea"
        :key="index"
        @click="selectComponent(component)"
      />
    </div>
    <div class="property-panel w-8rem bg-emerald">
      <div v-if="selectedComponent">
        <h3>Component Properties</h3>
        <p>Type: {{ selectedComponent.type }}</p>
        <p>Label: {{ selectedComponent.label }}</p>
        <!-- Add more properties as needed -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-designer {
  display: flex;
  width: 100%;
  height: 100vh;
}
.component-library, .design-area, .property-panel {
  margin: 10px;
}
</style>
