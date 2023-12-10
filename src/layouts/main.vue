<script setup lang="ts"></script>

<template>
  <!-- 路由组件出口的位置 -->
  <el-backtop :bottom="100" :right="10" visibility-height="100" target="main" />
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由的子路由 -->
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss" scoped>
.fade-enter-from {
    opacity: 0;
}

.fade-enter-active {
    transition: all 0.3s;
}

.fade-enter-to {
    opacity: 1;
}
</style>
