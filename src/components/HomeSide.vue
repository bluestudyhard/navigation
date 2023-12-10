<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import HomeSideItem from './HomeSideItem.vue'

// import type { websiteTitleListType } from '@/types/website'

import websitesStore from '@/stores/websites'

const useStore = websitesStore()
const { websiteTitleList } = storeToRefs(useStore)
// const websiteList = ref<websiteTitleListType[]>([])

onMounted(() => {
  useStore.getWebsiteList(1)
})
</script>

<template>
  <div class="flex w-full flex-col home-site">
    <div v-for="(item, index) in websiteTitleList " :key="index">
      <h3>{{ item.titleName }}</h3>
      <span v-for="tag in item.tags" :key="tag.tagName">
        <h4><i :id="tag.tagName">{{ tag.tagName }}</i></h4>
        <div class="tab-site-lists">
          <HomeSideItem :tab-site-list="tag.website" />
        </div>
      </span>
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
