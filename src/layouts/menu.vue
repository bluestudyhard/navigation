<script setup lang="ts">
import { useRouter } from 'vue-router'
import type menuType from '@/types/menutype'
import Menu from '@/layouts/menu.vue'

defineProps({
  menuList: {
    type: Array as () => menuType['menuRouter'],
    required: true,
  },
})
const router = useRouter()
function routerPush(path: string) {
  console.log(path)
  router.push(path)
}
// 公共组件的值最好是由父组件传递过来的，这样可以保证组件的独立性，不会因为组件的值而导致组件的复用性降低
</script>

<template>
  <el-menu>
    <div v-for="(item, index) in menuList" :key="item.path">
      <!-- 单级 -->
      <el-menu-item v-if="!item.children" :index="item.path + index" @click="routerPush(item.path)">
        <el-icon><icon-menu /></el-icon>
        {{ item.name }}
      </el-menu-item>
      <!-- 1子 -->
      <el-sub-menu v-if="item.children && item.children.length === 1" :index="item.path + index">
        <template #title>
          <el-menu-item @click="routerPush(item.path)">
            <el-icon><icon-menu /></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-sub-menu>
      <!-- 2+ -->
      <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path + index">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          <span>{{ item.name }}</span>
        </template>
        <!-- <el-menu-item-group>
          <el-menu-item v-for="(childItem, childIndex) in item.children" :key="childIndex" :index="childItem.path">
            <span>{{ childItem.name }}</span>
          </el-menu-item>
        </el-menu-item-group> -->
        <Menu :menu-list="item.children" />
      </el-sub-menu>
    </div>
  </el-menu>
  <!-- <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>网站管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">
          数据管理
        </el-menu-item>
        <el-menu-item index="1-2">
          审核
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="3">
      <el-icon><icon-menu /></el-icon>
      <span>用户权限</span>
    </el-menu-item> -->
</template>

<style scoped lang="scss">
.el-menu {
  border: none;
  background: $menu-bg-color;
}
</style>
