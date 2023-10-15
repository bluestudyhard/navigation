<script setup lang="ts">
import { ref } from 'vue'
import HomeSideItem from './HomeSideItem.vue'
import type { webSiteTitleListType } from '@/types/webSite'

import webSitesStore from '@/stores/websites'

const useStore = webSitesStore()
const { webSiteTitleList } = useStore
const webSiteList = ref<webSiteTitleListType[]>([])
webSiteList.value = [...webSiteTitleList]
</script>

<template>
  <div class="flex w-full flex-col">
    <div v-for="(item, index) in webSiteList" :key="index">
      <h3>{{ item.title }}</h3>
      <div class="tab-site-lists">
        <HomeSideItem :tab-site-list="item.website" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.total-tabs{
  display: flex;
  flex-direction: column;
}
.tab-site-lists{
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  flex-wrap: wrap;
}
</style>
