<script setup lang="ts">
// import { onMounted } from 'vue'
// import userStore from '@/stores/user'

// const useStore = userStore()
// onMounted(() => {
//   useStore.getAudit()
//   useStore.getUser()
// })
</script>

<template>
  <div class="open-source-container">
    <div class="open-source">
      <!-- <h1>Blue navigation</h1> -->
      <!-- <img src="/public/shader1.png"> -->
      <div class="mask w-100%  absolute" />
      <video loop="true" autoplay="true" preload="auto" muted class="w-100% h-100vh fixed object-fill top-0 ">
        <source src="/public/shader.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<style scoped lang="scss">
.open-source-container {
  height: 3000px;
  // overflow: hidden;
  overflow-x: hidden;
  // height: 100vh;
  position: relative;
}

.mask {
  background-color: rgba(217, 217, 217, 0.004);
  backdrop-filter: blur(1px);
  z-index: 50;
  height: 2000px;
  top: 3%;
}

.open-source {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  // height: 2000px;

  margin: 0 auto;
  // 模糊

  // background: #9c9797 url("/public/shader1.png") no-repeat;
  // background-size: 100% 100%;

}
</style>
