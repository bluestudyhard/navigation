<script setup lang="ts">
import { ref } from 'vue'

// import requestIframe from '../utils/iframe'
import type { websiteTempType } from '@/types/website'

defineProps<{
  tabSiteList: websiteTempType[]

}>()

// const targetUrl = ref('')
const isShow = ref(false)
// async function getIframe(url: string) {
//   isShow.value = true
//   targetUrl.value = await requestIframe(url)
//   console.log(targetUrl.value)
// }
</script>

<template>
  <div v-if="isShow" class="website-preview">
    <!-- <iframe :srcdoc="targetUrl" class="fixed right-50% top-0 w-150 h-150 z-100" /> -->
  </div>
  <span v-for="(item, index) in tabSiteList" :key="index">
    <div class="tab-site-card">
      <div class=" flex  flex-items-center  w-100%">
        <img :src="item.websiteIcon" alt="" class="w-5.1 h-5.1 ">
      <!-- <button class="outline-none border-none" @click="getIframe(item.websiteUrl)">
        <el-icon><ZoomIn /></el-icon>
      </button> -->
      </div>
      <div class="flex w-full flex-items-center  p-0">
        <a :href="item.websiteUrl" target="_blank" class=" text-left">
          <p class="title font-size-3.2 m-b--1 font-size-2.75 font-650 "> {{
            item.websiteName.slice(0, 6) }}</p>
          <div class="border" />
          <p class="title-content font-size-2.5">{{ item.websiteDescription?.slice(0,30) }}</p>
        </a>
      </div>
    </div>
  </span>
</template>

<style scoped lang="scss">
.tab-site-card {
  display: flex;
  padding: .5rem;
  width: 11rem;
  height: 6rem;
  flex-direction: column;
  align-items: center;
  border-radius: .5rem;
  max-width: 11rem;
  margin: .8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  cursor: pointer;
  transition: all .3s;
  border-radius: .5rem;
  background: #f0efee4d;

  // background-image: linear-gradient(to top, #acbeee 0%, #e7f0fd 100%);
  // background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);
  // background: linear-gradient(to right, rgb(137, 104, 255), rgb(175, 152, 255));
  // background: #6fa4f9;

  box-shadow: 3px 3px 4px 0px rgb(89 89 89 / 4%), 0px 2px 2px 0px #d2dceb9a;
  // box-shadow: 0px 0px 1px 0px #f0efee37;
  // backdrop-filter: blur(50px);

  img {
    background: #f9f9f930;
    // border: 1px solid #ffffff78;
    padding: 0.1rem;
    border-radius: .5rem;
    // backdrop-filter: blur(10px);
  }

  .title {
    color: #2b265f;
    font-weight: 600;
    // color: rgb(241, 241, 241);
  }

  .title-content {
    color: #2b265fc4;
    // color: rgba(241, 241, 241, 0.863);
    font-weight: 400;
  }

  &:hover {
    // height: 7rem;
    transform: translateY(-5px);
  }

  &::before {
    width: 100px;
    height: 80px;
    content: "";
    background: linear-gradient(to right, #bbc8f8dc, rgba(186, 224, 188, 0.999));
    position: absolute;

    border-radius: 50%;
    right: -41%;
    top: -54%;
    // backdrop-filter: blur(10px);
  }
}
</style>
