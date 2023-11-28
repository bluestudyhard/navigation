<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as three from 'three'
import { RotationJoystickControls } from 'three-joystick'

// 注意这里的scene不能变成响应式的，不然会报错什么matrix找不到
const scene = new three.Scene()

const camera = ref(new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
const renderer = ref(new three.WebGLRenderer())
camera.value.position.z = 2
// 设置渲染区域大小
renderer.value.setSize(1000, 1000)
// 获取dom元素

// 物体
const geometry = new three.BoxGeometry()
// 材质
const material = new three.MeshBasicMaterial({ color: 0x00FF00 })
// 网格
const cube = new three.Mesh(geometry, material)
// 将网格加入到场景中
scene.add(cube)

function animate() {
  requestAnimationFrame(animate)

  renderer.value.render(scene, camera.value)
}
const joystickControls = new RotationJoystickControls(
  camera.value,
  scene,
  cube,
)

onMounted(() => {
  document.getElementById('canvas-container')?.appendChild(renderer.value.domElement)
  joystickControls.update()
  animate()
})
</script>

<template>
  <div id="canvas-container" />
</template>
