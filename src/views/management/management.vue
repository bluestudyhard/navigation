<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { onMounted, ref } from 'vue'
import userStore from '@/stores/user'
import Menu from '@/layouts/menu.vue'
import Main from '@/layouts/main.vue'

const useStore = userStore()
const { userAvatar, username, userId } = storeToRefs(useStore)
onMounted(() => {
  useStore.getUser()
})
const isCollapse = ref(false)
function logout() {
  useStore.logout()
}
</script>

<template>
  <div class="el-container m-t-1">
    <el-container>
      <el-aside class="h-full" width="auto">
        <div class="user-agent">
          <span class="flex flex-col">
            <el-avatar :size="60" :src="userAvatar" />
            {{ username }}
          </span>
        </div>
        <Menu :menu-list="useStore.constanRoutes" :collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="header">
          <!-- <h1>sea blue navigation</h1> -->
          <el-button @click="() => (isCollapse = !isCollapse)">
            <el-icon>
              <Expand />
            </el-icon>
          </el-button>

          <div class="avatar">
            <el-dropdown class="el-dropdown-link">
              <span>
                <el-avatar :size="40" :src="userAvatar" />
                {{ userId }}    {{ username }}
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
                  <el-dropdown-item @click="logout">
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <Transition>
            <Main />
          </Transition>
        </el-main>
        <el-footer class="h-1">
          Footer
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 100vh;
  background-color: rgb(246, 250, 253);

}

.user-agent {
  text-align: center;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

}

.el-container {
  .header {
    position: relative;
    display: flex;
    background-color: #fcfcfc;

    height: 3rem;
    border-bottom: 1px solid #767676ab;

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
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;

  &:focus {
    outline: none !important;

  }

  >span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }

  .el-tooltip__trigger {
    outline: none;
  }

}
</style>
