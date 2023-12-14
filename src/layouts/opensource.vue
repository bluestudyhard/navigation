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
  <nav class=" flex justify-between items-center w-100% h-12 m-t-5">
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
    <!-- <div class="open-overlay">
      <span class="bar-top" />
      <span class="bar-middle" />
      <span class="bar-bottom" />
    </div> -->
  </nav>
  <!-- <h1>Blue navigation</h1> -->
  <router-view />
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

.open-source-container {
  height: 3000px;
  // overflow: hidden;
  overflow-x: hidden;
  // height: 100vh;
  position: relative;
}

.mask {
  background-color: #d9d9d901;
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
