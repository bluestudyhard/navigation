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
  <nav class="position-fixed flex justify-center items-center w-100%">
    <router-link to="/login">
      Login
    </router-link>
    <router-link to="/">
      Home
    </router-link>
    <router-link to="/management">
      后台管理
    </router-link>
    <router-link to="/themes">
      主题
    </router-link>
    <router-link to="/playground">
      测试区
    </router-link>
  </nav>
  <!-- <h1>Blue navigation</h1> -->
  <router-view />
</template>

<style scoped lang="scss">
nav {
  background-color: #f9f9f930;
  z-index: 10;
}
</style>
