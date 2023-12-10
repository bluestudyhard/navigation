<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import type { websiteType } from '@/types/website'

defineProps<{
  website: websiteType
  isCheck: boolean
}>()
const emits = defineEmits(['emitIsCheck'])
// 实现长按功能，长按以后，item会抖动
const check = ref(false)
const isLongPress = ref(false)

const itemZone = ref<HTMLElement | null>(null)

// 计时器
const timer = ref<ReturnType<typeof setTimeout>>()
function longPress(e: EventTarget | null | any) {
  // target.value = e as HTMLElement
  // const currentTarget = document.querySelector('.website-item')
  // console.log(currentTarget?.contains(e as Node))
// 长按1.5s后出现shake动画
  // console.log(timer.value) timer其实是编号
  isLongPress.value = true
  if (isLongPress.value) {
    timer.value = setTimeout(() => {
      e?.classList.add('shake')
      check.value = true
      emits('emitIsCheck', check.value)
    }, 1500)
  }
}
function mouseUp(e: EventTarget | null | any) {
  isLongPress.value = false
  clearTimeout(timer.value)
  console.log(timer.value)
  setTimeout(() => {
    e?.classList.remove('shake')
    check.value = false
  }, 1000)
}
watchEffect(() => {
  // console.log(check.value)

})
</script>

<template>
  <div v-for="(item, index) in website.bookmarks" :key="index" class="w-12%">
    <div
      ref="itemZone" class="website-item" draggable="false" @mousedown="event => longPress(event.currentTarget)"
      @mouseup="event => mouseUp(event.currentTarget) "
    >
      <div class="  flex  flex-items-center w-90%">
        <img :src="item.bookmarkWebsiteIcon" alt="" class="w-5.1 h-5.1 p-t-1 select-none">
        <el-checkbox v-if="isCheck" v-model="item.checked" class="position-absolute right-0 top-0 transition-all-1" />
      </div>
      <div class="flex w-full flex-items-center p-0">
        <a target="_blank" class=" text-left">
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
  transition: all .3s ease-in-out;

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

  &:active {
    // animation: shake 1s cubic-bezier(.36, .07, .19, .97) both infinite;
    // transform: translate3d(0, 0, 0);
    background: #c5c9cb8f;

    // active 2s后出现shake动画

  }

  &:hover {
    transform: translateY(-0.2rem);

  }

}

.shake {
  animation: shake 1.2s cubic-bezier(.36, .07, .19, .97) both ;
  transform: translate3d(0, 0, 0);
  // animation-delay: 1.5s;
}

@keyframes shake {

  /* //表示在百分之10和90时都会往左边抽一下 */
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
    box-shadow: 4px 2px 10px 1px rgb(104 105 105 / 21%);
    transition: box-shadow ease-in-out;
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
    box-shadow: 4px 2px 10px 1px rgb(104 105 105 / 21%);
    transition: box-shadow ease-in-out;
  }

  30%,
  50%,
  70% {
    transform: translate3d(-2px, 0, 0);
    box-shadow: 4px 2px 10px 1px rgb(104 105 105 / 21%);
    transition: box-shadow ease-in-out;
  }

  40%,
  60% {
    transform: translate3d(2px, 0, 0);
  }

}
</style>
