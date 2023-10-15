<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userStore from '@/stores/user'
import HomeSide from '@/components/HomeSide.vue'

// import BookMark from '@/components/BookMark.vue'

const isdark = ref(false)
function changeTheme() {
  if (isdark.value)
    document.documentElement.setAttribute('data-theme', 'dark')
  else
    document.documentElement.setAttribute('data-theme', 'light')
}
const useStore = userStore()
const { userAvator, username } = useStore
onMounted(() => {
  useStore.getAudit()
  useStore.getUser()
})
</script>

<template>
  <div class="el-container">
    <el-container>
      <el-aside class="aside" width="200px">
        <div class="user-agent">
          <span>
            <el-avatar :size="80" :src="userAvator" />
            {{ username }}
          </span>
        </div>
        <el-menu>
          <el-menu-item index="1">
            <el-icon><icon-menu /></el-icon>
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
          <el-menu-item v-if="useStore.isAdmin" index="3">
            <el-icon><icon-menu /></el-icon>
            <router-link to="/management">
              后台管理
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <h1>sea blue navigation</h1>
          <div class="toggle-switch">
            <el-switch v-model="isdark" @change="changeTheme" />
          </div>
          <div class="avator">
            <el-dropdown class="el-dropdown-link">
              <span>
                <el-avatar :size="40" :src="userAvator" />
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
        <el-main>
          mainaaa
          <HomeSide />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.aside {
  border: 1px solid #f8f8f87f;
  height: 100vh;
}

.user-agent {
  text-align: center;
  margin-bottom: 1rem;
}

.el-container {
  width: 100%;
  height: 3000px;
  @include background-color("background_color");
  @include font_color("text_color");
  transition: background-color 1s, color .6s;

  .header {
    position: relative;
    display: flex;
    // background-color: #fcfcfc;

    height: 10rem;
    border-bottom: 1px solid #767676ab;

    &>h1 {
      background-image: linear-gradient(135deg, #396AF1 10%, #A665F6 90%);
      color: transparent;
      -webkit-background-clip: text;

    }

    .avator {
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

  .el-tooltip__trigger {
    outline: none;
  }
}

// swtich
.toggle-switch {
  position: relative;
  width: 2.5rem;
  height: .8rem;
  --light: #d8dbe0;
  --dark: #28292c;
  --link: rgb(27, 129, 112);
  --link-hover: rgb(24, 94, 82);
  left: 40%;

  .switch-label {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--dark);
    border-radius: 25px;
    cursor: pointer;
    border: 3px solid var(--dark);
  }

  .checkbox {
    position: absolute;
    display: none;
  }

  .slider {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }

  .checkbox:checked~.slider {
    background-color: var(--light);
  }

  .slider::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0px;
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    -webkit-box-shadow: inset 12px -4px 0px 0px var(--light);
    box-shadow: inset 12px -4px 0px 0px var(--light);
    background-color: var(--dark);
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }

  .checkbox:checked~.slider::before {

    transform: translateX(1.7rem);
    background-color: var(--dark);
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}
</style>
