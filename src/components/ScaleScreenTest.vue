<!--
 * new page
 * @author: blue
 * @since: 2024-03-13
 * ScaleScreenTest.vue
-->
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const screenRef = ref<HTMLElement>()
const isFullScreen = ref(false)
function handleScreenAuto() {
  screenRef.value = document.querySelector('#app') as HTMLElement
  // console.log(screenRef.value)
  const w = 1920
  const h = 1080
  const clientWidth = screenRef.value.clientWidth
  const clientHeight = screenRef.value.clientHeight
  const scaleWidth = clientWidth / w
  const scaleHeight = clientHeight / h
  let transformScale
  if (isFullScreen.value) {
    transformScale = `scale(${scaleWidth}, ${scaleHeight} ) translate(-50%)`
  }
  else {
    const scale = clientWidth / clientHeight < w / h ? scaleWidth : scaleHeight // 如果屏幕的宽高比小于原始宽高比，那么以宽度为基准，否则以高度为基准 就是说我们竖着缩放的时候，宽会比较小，所以缩放比例就是以宽度为基准
    transformScale = `scale(${scale}) translate(-50%)`
  }
  screenRef.value.style.transform = transformScale
}
const debounceFn = useDebounceFn(handleScreenAuto, 100)
window.addEventListener('resize', debounceFn)
</script>

<template>
  <div class="container" />
</template>

<style scoped></style>
