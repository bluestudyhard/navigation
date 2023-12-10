<script setup lang="ts">
import { onMounted, ref } from 'vue'

import userStore from '@/stores/user'
import websitesStore from '@/stores/websites'
import HomeSide from '@/components/HomeSide.vue'
import opensource from '@/layouts/opensource.vue'
import Aside from '@/layouts/aside.vue'

// import BookMark from '@/components/BookMark.vue'

const isdark = ref(false)
function changeTheme() {
  if (isdark.value)
    document.documentElement.setAttribute('data-theme', 'dark')
  else
    document.documentElement.setAttribute('data-theme', 'light')
}

const useStore = userStore()
const websiteStore = websitesStore()
// const { websiteTitleList } = storeToRefs(websiteStore)
const { userAvatar } = useStore
onMounted(() => {
  useStore.getAudit()
  useStore.getUser()
  websiteStore.getWebsiteList(1)
})
const isCollapse = ref(false)
</script>

<template>
  <opensource />
  <!-- <el-backtop></el-backtop>一定要写于最外层块级区域的第一行，不可写于代码末尾。 -->
  <el-backtop :bottom="10" :right="10" visibility-height="100" />
  <div class="el-container">
    <el-container>
      <el-aside class="aside" width="auto">
        <Aside />
      </el-aside>
      <el-container>
        <el-header class="header">
          <!-- <h1>sea blue navigation</h1> -->
          <el-button @click="() => (isCollapse = !isCollapse)">
            <el-icon>
              <Expand />
            </el-icon>
          </el-button>
          <el-switch v-model="isdark" @change="changeTheme" />
          <div class="avatar">
            <el-dropdown class="el-dropdown-link">
              <span>
                <el-avatar :size="40" :src="userAvatar" />
              </span>
              <span>
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>登录</el-dropdown-item>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="main">
          <HomeSide />
        </el-main>
        <!-- <el-footer>
          Footer
        </el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<style></style>

<style scoped lang="scss">
.aside {

  height: 100vh;

  background: #f4f4f408;
  backdrop-filter: blur(4px);
  box-shadow: -1px 0px 4px 0px rgb(65 65 65 / 10%);
}

.user-agent {
  text-align: center;
  margin-bottom: 1rem;
}

.el-container {
  width: 99%;
  margin: 0 auto;
  // height: 3000px;
  @include background-color("background_color");
  @include font_color("text_color");
  transition: background-color 1s, color .6s;
  // background: linear-gradient(90deg, #EAF2E7 0.65%, rgba(163, 199, 231, 0.847) 102.06%);

  backdrop-filter: blur(2px);

  .header {
    position: relative;
    display: flex;
    // background-color: #fcfcfc;

    border-bottom: 1px solid #ceccccab;

    &>h1 {
      background-image: linear-gradient(135deg, #396AF1 10%, #A665F6 90%);
      color: transparent;
      -webkit-background-clip: text;
    }

    .avatar {
      position: absolute;
      right: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .main {
    overflow: auto;
    height: 90vh;
    scroll-behavior: smooth;
  }

  // 解决侧边栏折叠卡顿的问题
  // .new-el-menu--sidebar:not(.el-menu--collapse) {
  //   width: 220px;
  // }

  .el-menu {
    transition: width 0.5s ease;
  }

  .main::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;

  &:focus {
    outline: none !important;

  }

  .el-tooltip__trigger {
    outline: none;
  }
}

// swtich
</style>
