<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import userStore from '@/stores/user'
import websitesStore from '@/stores/websites'

const useStore = userStore()
const websiteStore = websitesStore()
const { websiteTitleList } = storeToRefs(websiteStore)
const { userAvatar, username } = useStore
onMounted(() => {
  useStore.getAudit()
  useStore.getUser()
  websiteStore.getWebsiteList(1)
})
const isCollapse = ref(false)
</script>

<template>
  <el-aside class="aside" width="auto">
    <div class="user-agent flex justify-center">
      <span class=" flex flex-col justify-center">
        <el-avatar :size="80" :src="userAvatar" />
        {{ username }}
      </span>
    </div>
    <el-menu
      :collapse-transition="true" :collapse="isCollapse" :hide-timeout="500" :show-timeout="500"
      default-openeds="['2']"
    >
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
        <el-menu-item-group v-for="title in websiteTitleList" :key="title.titleName" :title="title.titleName">
          <el-menu-item v-for="tag in title.tags" :key="tag.tagName" :index="tag.tagName" class="flex flex-wrap">
            <a :href="`#${tag.tagName}`" class="font-size-2.22  ">
              <i class="overflow-hidden ">
                {{ tag.tagName }}
              </i>
            </a>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item v-if="useStore.isAdmin" index="3">
        <el-icon>
          <location />
        </el-icon>
        <span>
          <router-link to="/management">
            后台管理
          </router-link>
        </span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.aside {

  height: 100%;
  background: #f4f4f443;
  backdrop-filter: blur(4px);
  box-shadow: -1px 0px 4px 0px rgb(65 65 65 / 10%);
}
</style>
