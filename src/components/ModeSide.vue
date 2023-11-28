<script setup lang="ts">
import { ref } from 'vue'
import ModeSideItem from './ModeSideItem.vue'
import type { websiteTitleListType } from '@/types/website'

import websitesStore from '@/stores/websites'

const useStore = websitesStore()
const { websiteTitleList } = useStore
const websiteList = ref<websiteTitleListType[]>([])
websiteList.value = [...websiteTitleList]
</script>

<template>
  <div class="flex  home-site">
    <div v-for="(item, index) in websiteList" :key="index">
      <h5>{{ item.title }}</h5>
      <ModeSideItem :tab-site-list="item.website" />
    </div>
  </div>
</template>

<style scoped>
.total-tabs {
    display: flex;
    flex-direction: column;
}

.home-site {
    display: flex;
    flex-direction: row;
    width: 100vw;

    &:nth-child(odd) {
        flex-wrap: wrap;
    }
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
