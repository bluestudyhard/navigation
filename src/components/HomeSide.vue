<script setup lang="ts">
import { ref } from 'vue'
import HomeSideItem from './HomeSideItem.vue'
import type { websiteTitleListType } from '@/types/website'

import websitesStore from '@/stores/websites'

const useStore = websitesStore()
const { websiteTitleList } = useStore
const websiteList = ref<websiteTitleListType[]>([])
websiteList.value = [...websiteTitleList]
</script>

<template>
  <div class="flex w-full flex-col home-site">
    <div v-for="(item, index) in websiteList" :key="index">
      <h3>{{ item.title }}</h3>
      <h3>{{ item.tag }}</h3>
      <div class="tab-site-lists">
        <HomeSideItem :tab-site-list="item.website" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.total-tabs {
  display: flex;
  flex-direction: column;
}

.tab-site-lists {
  display: flex;
  flex-wrap: nowrap;
  flex-wrap: wrap;

}

.tab-site-lists::-webikit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
@/types/website
