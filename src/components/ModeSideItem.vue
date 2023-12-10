<script setup lang="ts">
// import { onMounted, ref } from 'vue'
import type { bookmarkType } from '@/types/website'

defineProps<{
  tabSiteList: bookmarkType[]
}>()
</script>

<template>
  <div class="tab-sites">
    <!-- <div v-for="(bookmark, index) in tabSiteList" :key="index" class="tab-site-card">
      <div class="flex w-full flex-items-center p-0">
        <a target="_blank" class=" text-left">
          <p class="title font-size-3.2 m-b--1 font-size-2.75 font-650 " />
          <div class="border" />
          <p class="title-content font-size-2.5" />
        </a>
      </div>
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.tab-sites {
  display: flex;
  // height: 100vh;
  flex-wrap: wrap;
}
.tab-site-card {
  display: flex;
  padding: 1rem;
  width: 12%;
  height: 6rem;
  // height: 3.5rem;
  flex-direction: column;
  align-items: center;
  border-radius: .5rem;
  // max-width: 10rem;
  margin: .6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  cursor: pointer;
  transition: all .3s;
  border-radius: .3rem;
  // background: #f0efee58;
  // background-image: linear-gradient(to top, #acbeee 0%, #e7f0fd 100%);
  // background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);
  // background: linear-gradient(to right, rgb(137, 104, 255), rgb(175, 152, 255));
  // background: #6fa4f9;

  // box-shadow: 3px 3px 4px 0px rgb(89 89 89 / 4%), 0px 2px 2px 0px #d2dceb9a;
  // box-shadow: 0px 0px 1px 0px #f0efee37;
//   backdrop-filter: blur(3px);
  transform: translateZ(0);
  border-radius: .8rem;
  // 中扁型
  // background: var(--1, linear-gradient(138deg, rgba(203, 206, 212, 0.00) 8.52%, #F2F5FD 115.38%));
  // 按钮型
  background: linear-gradient(138deg, #e1e6ec 8.52%, rgba(203, 206, 212, 0.134) 115.38%);
  /* 拟态阴影模板 */
  box-shadow: -12px -9px 10px 0px rgba(231, 233, 237, 0.9), 9px 6px 10px 0px rgba(214, 220, 233, 0.43), 6px 6px 10px 0px rgba(134, 137, 143, 0.25);

  img {
    background: #f9f9f930;
    // border: 1px solid #ffffff78;
    padding: 0.1rem;
    border-radius: .5rem;
    backdrop-filter: blur(10px);
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
    transform: translateY(-10px);
  }

}
</style>
@/types/website
