<script setup lang="ts">
import type { websiteType } from '@/types/website'

defineProps<{
  website: websiteType
  isCheck: boolean
}>()
</script>

<template>
  <div v-for="(item, index) in website.bookmarks" :key="index" class="w-12%">
    <div class="website-item">
      <div class="  flex  flex-items-center w-90%">
        <img :src="item.bookmarkWebsiteIcon" alt="" class="w-5.1 h-5.1 p-t-1">
        <el-checkbox v-if="isCheck" v-model="item.checked" class="position-absolute right-0 top-0 transition-all-1" />
      </div>
      <div class="flex w-full flex-items-center p-0">
        <a :href="item.bookmarkWebsiteUrl" target="_blank" class=" text-left">
          <p class="title font-size-3.2 m-b--1 font-size-2.75 font-650 ">{{ index + 1 }}. {{
            item.bookmarkWebsiteTitle.slice(0, 6) }}</p>
          <div class="border" />
          <p class="title-content font-size-2.5">{{ item.bookmarkWebsiteTitle }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 解构并赋值为局部变量

.website-item {
  display: flex;
  padding: .3rem;
  flex-direction: column;
  align-items: center;
  border-radius: .5rem;
  max-width: 10rem;
  margin: .4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  box-shadow: map-get($map: $theme-manage, $key: website-item-boxshadow);
  transition: all .3s;

  // height: 4rem;
  // background: linear-gradient(145deg, #f6fafd66, #d8d7d746);
  a {
    color: map-get($map: $theme-manage, $key: website-item-text-title);
  }

  .border {
    height: .18rem;
    background-color: map-get($map: $theme-manage, $key: website-item-border-bg);
    width: 1rem;
    margin-top: .4rem;
    border-radius: 1rem;
  }

  .title-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
    color: map-get($map: $theme-manage, $key: website-item-text-desc);
  }

  &:hover {
    transform: translateY(-.2rem);
  }
}
</style>
