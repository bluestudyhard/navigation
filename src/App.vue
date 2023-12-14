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
  <!-- <nav class=" flex justify-between items-center w-100% h-12 m-t-5">
    <div class="m-10">
      <span class="title font-size-5">Meling Navigation</span>
    </div>
    <div class="routers m-10 ">
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
    </div>
  </nav> -->

  <router-view />
</template>

<style scoped lang="scss">
@import url(https://fonts.googleapis.com/css?family=Work+Sans:400,300,700|Open+Sans:400italic,300italic);

nav {
  background-color: #f9f9f900;
  z-index: 10;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  font-family: 'Work sans', sans-serif;
  font-weight: 600;

  .title {
    letter-spacing: 2px;
    // 文字下划线
    text-decoration: underline;
  }

  .routers {
    a {
      color: rgb(60, 60, 60);
      font-weight: 600;

      &:hover {
        color: rgb(0, 0, 0);
      }
    }

    &:nth-child(1) {
      background-color: antiquewhite;
    }
  }

  .open-overlay {
    position: absolute;
    right: 5rem;
    top: 3.2rem;
    z-index: 100;
    width: 34px;
    display: block;
    cursor: pointer;
  }

  .open-overlay span {
    display: block;
    height: 1px;
    background-color: #fff;
    cursor: pointer;
    margin-top: 8px;
  }

}
</style>
