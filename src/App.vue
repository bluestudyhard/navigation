<script setup lang="ts">

</script>

<template>
  <nav>
    <router-link to="/login">
      Login
    </router-link>
    <router-link to="/">
      Home
    </router-link>
    <router-link to="/management">
      后台管理
    </router-link>
  </nav>
  <router-view />
</template>

<style scoped></style>
