<script setup lang="ts">
import { onMounted, ref } from 'vue'

// import BookMark from '@/components/BookMark.vue'
import ModeSide from '@/components/ModeSide.vue'
import type { websiteTitleListType } from '@/types/website'

import websitesStore from '@/stores/websites'

const useStore = websitesStore()
const { websiteTitleList } = useStore
const websiteList = ref<websiteTitleListType[]>([])
websiteList.value = [...websiteTitleList]
const isdark = ref(false)
function changeTheme() {
  if (!isdark.value)
    document.documentElement.setAttribute('data-theme', 'blue-theme')
  else
    document.documentElement.setAttribute('data-theme', 'green-theme')
}
onMounted(() => {
  changeTheme()
})
const isCollapse = ref(false)
</script>

<template>
  <!-- <el-backtop></el-backtop>一定要写于最外层块级区域的第一行，不可写于代码末尾。 -->
  <div class="el-mode-container">
    <el-backtop :bottom="10" :right="10" visibility-height="100" />
    <div>
      <el-container class="el-main-container">
        <el-aside class="aside" width="auto">
          <div class="user-agent flex justify-center">
            <span class=" flex flex-col justify-center">11</span>
          </div>
          <el-menu :collapse-transition="true" :collapse="isCollapse" :hide-timeout="500" :show-timeout="500">
            <el-menu-item index="1">
              <el-icon>
                <location />
              </el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>网站类别</span>
              </template>
              <el-menu-item-group title="编程学习">
                <el-menu-item index="1-1">
                  item one
                </el-menu-item>
                <el-menu-item index="1-2">
                  item two
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="好用工具合集">
                <el-menu-item index="1-3">
                  item 3
                </el-menu-item>
                <el-menu-item index="1-4">
                  item 4
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header class="header">
            <!-- <h1>sea blue navigation</h1> -->

            <el-button @click="() => (isCollapse = !isCollapse)">
              <el-icon>
                <Expand />
              </el-icon>
            </el-button>
          </el-header>
          <el-main class="main">
            <ModeSide />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped lang="scss">
.aside {
  height: 100%;
  background: #f4f4f443;
  backdrop-filter: blur(4px);
  box-shadow: -1px 0px 4px 0px rgb(65 65 65 / 10%);

  .el-menu {
    background-color: transparent !important;
    border: none !important;

  }
}

.user-agent {
  text-align: center;
  margin-bottom: 1rem;
}

.open-source {
  width: 100%;
  height: 100vh;
  //   @include get-background-image("main-background-image");
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-size: 100% 100%;

}

.el-mode-container {
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  //   @include get-background-image("main-background-image");
  background-color: #d1cfdd;
  background: url("../../../public/mode.webp") no-repeat;
  backdrop-filter: blur(10px);
  background-blend-mode: color-burn;
}

.el-main-container {
  width: 80%;
  height: 80vh;
  margin: 0 auto;
  border-radius: 1rem;
  overflow-y: hidden;
  //   @include get-background-color("main-background-color");
  transition: background-color 1s, color .6s;
  // background: linear-gradient(90deg, #EAF2E7 0.65%, rgba(163, 199, 231, 0.847) 102.06%);
  background: var(--neumorphism_BG1, #e2e5ece8);
  backdrop-filter: blur(5px);

  .header {
    position: relative;
    display: flex;
    // background-color: #fcfcfc;

    border-bottom: 1px solid #ceccccab;

  }

  .main {
    // overflow: initial;
    height: 100%;
    width: 100%;
    // @include get-font-color("text-title-color");

  }

}
</style>
@/types/website
