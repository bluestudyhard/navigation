<script setup lang="ts">
// import { onMounted, ref } from 'vue'
import type { bookMarkType } from '@/types/webSite'

defineProps<{
  tabSiteList: bookMarkType[]
}>()
</script>

<template>
  <div v-for="(item, index) in tabSiteList" :key="index" class="tab-site-card">
    <div class="tab-site-card-icon">
      <img :src="item.icon" alt="">
    </div>
    <a :href="item.url" target="_blank">
      <div class="title">{{ item.title.slice(0, 10) }}</div>
    </a>
  </div>
</template>

<style scoped lang="scss">
.tab-site-card {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 10px 0.5px rgba(201, 192, 246, 0.449);

  margin: 0.5rem 0.5rem 0.3rem 0.3rem;
  text-overflow: ellipsis;
  flex-direction: column;
  padding: .5rem;
  flex-basis: 12%;
  img {
    width: 2rem;
    height: 2rem;
  }
  .title{
    font-size: 10px;
  }
}
</style>
