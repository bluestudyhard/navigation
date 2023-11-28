<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const joystickPosition = ref({ x: 0, y: 0 })
const isDragging = ref(false)

function handleMouseDown(event) {
  isDragging.value = true
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

function handleMouseMove(event) {
  if (isDragging.value) {
    const joystick = document.querySelector('.joystick')
    const base = document.querySelector('.base')
    const stick = document.querySelector('.stick')
    const rect = joystick.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = event.clientX - centerX
    const deltaY = event.clientY - centerY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const maxDistance = base.clientWidth / 2 - stick.clientWidth / 2

    if (distance <= maxDistance) {
      stick.style.transform = `translate(${deltaX}px, ${deltaY}px)`
      joystickPosition.value = { x: deltaX, y: deltaY }
    }
    else {
      const angle = Math.atan2(deltaY, deltaX)
      const limitedX = Math.cos(angle) * maxDistance
      const limitedY = Math.sin(angle) * maxDistance
      stick.style.transform = `translate(${limitedX}px, ${limitedY}px)`
      joystickPosition.value = { x: limitedX, y: limitedY }
    }
  }
}

function handleMouseUp() {
  isDragging.value = false
  const stick = document.querySelector('.stick')
  stick.style.transform = 'translate(0, 0)'
  joystickPosition.value = { x: 0, y: 0 }
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

onMounted(() => {
  const base = document.querySelector('.base')
  base.addEventListener('mousedown', handleMouseDown)
})

onUnmounted(() => {
  const base = document.querySelector('.base')
  base.removeEventListener('mousedown', handleMouseDown)
})
</script>

<template>
  <div class="joystick" :style="{ transform: `translate(${joystickPosition.x}px, ${joystickPosition.y}px)` }">
    <div class="base" />
    <div class="stick" />
  </div>
</template>

<style scoped>
.joystick {
    position: relative;
    width: 200px;
    height: 200px;
}

.base {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: #ccc;
    border-radius: 50%;
}

.stick {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background-color: #f00;
    border-radius: 50%;
}
</style>
