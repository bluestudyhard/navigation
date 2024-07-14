<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ToBottom from '@/components/ToBottom.vue'

gsap.registerPlugin(ScrollTrigger)
// import userStore from '@/stores/user'

// const useStore = userStore()
onMounted(() => {
  // first-word 渐入
  gsap.from('.first-word', {

    opacity: 0,
    duration: 1.5,
    y: -100,
  })
  // first-word-reverse 渐入
  gsap.from('.first-word-reverse', {
    opacity: 0,
    duration: 1.5,
    // x: -200,
    x: 200,
    rotate: 120,
    delay: 0.5,
  })
  // first-word-content 渐入
  gsap.from('.first-word-content', {
    opacity: 0,
    duration: 1.5,
    x: -100,
    delay: 1,
  })
  gsap.to('.open-overlay', {
    scrollTrigger: {
      trigger: '.open-overlay',
      start: '50%',
      end: 'bottom bottom',
      // markers: true,
      scrub: 1,
    },
    opacity: 0,
    y: -200,
    scrollActions: 'restart none reverse none',
  })
  // second mask 渐入
  gsap.to('.overlay-second-mask', {
    scrollTrigger: {
      trigger: '.overlay-second-mask',
      start: 'top 80%',
      end: 'top 50%',
      // markers: true,
      scrub: 1,

    },
    y: -300,
    duration: 1,
    delay: 1,

  })

  // second mask sections 渐入
  // gsap.to('.sections', {
  //   scrollTrigger: {
  //     trigger: '.overlay-second-mask',
  //     start: 'top 80%',
  //     end: 'top 50%',
  //     markers: true,
  //     scrub: 1,

  //   },
  //   scrollActions: 'restart none reverse none',
  //   duration: 2,
  //   y: -200,
  //   opacity: 1,
  // })

  gsap.utils.toArray('.sections > span').forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section as HTMLElement,
      start: 'top top',
      end: '+=100',
      scrub: 0.5,
      pin: true,
      pinSpacing: false,
      markers: true,
      id: `section-${i + 1}`,
      toggleClass: 'active',
      invalidateOnRefresh: true,
    })
  })
})
</script>

<template>
  <nav class=" flex justify-between items-center w-100% h-12 m-t-5">
    <div class="m-10">
      <span class="title font-size-6.3">Meling Navigation</span>
    </div>
    <div class="routers m-10 ">
      <router-link to="/login">
        Login
      </router-link>
      <router-link to="/">
        Home
      </router-link>
      <router-link to="/management">
        management
      </router-link>
      <router-link to="/themes">
        themes
      </router-link>
      <router-link to="/playground">
        test
      </router-link>
      <router-link to="/folder">
        测试书签
      </router-link>
    </div>
  </nav>
  <!-- <h1>Blue navigation</h1> -->

  <div class="open-source-container">
    <div class="open-source">
      <!-- <h1>Blue navigation</h1> -->
      <!-- <img src="/public/shader1.png"> -->
      <div class="mask w-100%  absolute" />
      <video loop="true" autoplay="true" preload="auto" muted class="w-100% h-100vh fixed object-cover top-0 ">
        <source src="/public/shader.mp4" type="video/mp4">
      </video>
      <div class="open-overlay z-100 flex flex-col h-100vh w-full justify-center items-center relative ">
        <span>
          <p class="font-550  font-size-8  first-word-reverse m--4 ">
            Welcome
          </p>
          <p class="font-50  font-size-12 first-word m-0 opacity-0  ">
            Welcome to Meling Navigation
          </p>
          <p class="font-50  font-size-5 text-center first-word-content m-0 decoration-underline ">
            personal knoweldege collections
          </p>
        </span>
        <span class="absolute left-92% top-85% flex">
          <span class="p-0 font-size-3 font-550 flex flex-col justify-center items-center">
            <p class="m-0 rotate-90 ">EXPLORE </p>
            <ToBottom class="m-t-7 " />
          </span>

        </span>
      </div>
      <!-- <div class="open-overlay-second bg-#000  z-100 flex h-100vh w-full relative">
        <div class="absolute overlay-second-mask w-full h-70%   z-90" />
        <div class="sections opacity-1 h-50% z-100 flex flex-col p-2">
          <span class="flex bg-orange">
            <section class="first w-50% p-10 ">
              <h2>Introduction</h2>
              <p>
                This document provides a guide to help with the important task of choosing the correct Apple.This document
                provides a guide to help with the important task of choosing the correct Apple
                This document provides a guide to help with the important task of choosing the correct Apple.This document
                provides a guide to help with the important task of choosing the correct Apple
              </p>
            </section>
            <section class="second w-50% p-10 ">
              介绍一下
              <p>
                This document provides a guide to help with the important task of choosing the correct Apple.This document
                provides a guide to help with the important task of choosing the correct Apple
                This document provides a guide to help with the important task of choosing the correct Apple.This document
                provides a guide to help with the important task of choosing the correct Apple
              </p>
            </section>
          </span>
          <span class="flex bg-purple ">
            <section class="first w-50% p-10 ">
              <h2>Introduction</h2>
              <p>
                This document provides a guide to help with the important task of choosing the correct Apple.This document
                provides a guide to help with the important task of choosing the correct Apple
                This document provides a guide to help with the important task of choosing the correct Apple.This document
                provides a guide to help with the important task of choosing the correct Apple
              </p>
            </section>
            <section class="second w-50% p-10 ">
              介绍一下
              <p>
                This document provides a guide to help with the important task of choosing the correct Apple.This document
                provides a guide to help with the important task of choosing the correct Apple
                This document provides a guide to help with the important task of choosing the correct Apple.This document
                provides a guide to help with the important task of choosing the correct Apple
              </p>
            </section>
          </span>
          <span class="flex bg-blue">
            <section class="first w-50% p-10 ">
              <h2>Introduction</h2>
              <p>
                This document provides a guide to help with the important task of choosing the correct Apple.This document
                provides a guide to help with the important task of choosing the correct Apple
                This document provides a guide to help with the important task of choosing the correct Apple.This document
                provides a guide to help with the important task of choosing the correct Apple
              </p>
            </section>
            <section class="second w-50% p-10 ">
              介绍一下
              <p>
                This document provides a guide to help with the important task of choosing the correct Apple.This document
                provides a guide to help with the important task of choosing the correct Apple
                This document provides a guide to help with the important task of choosing the correct Apple.This document
                provides a guide to help with the important task of choosing the correct Apple
              </p>
            </section>
          </span>
        </div>
      </div> -->
      <!-- <div class="open-overlay-third top-40 z-100 flex h-150vh w-full relative bg-#fff">
        1
      </div> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
nav {
  background-color: #f9f9f900;
  z-index: 120;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  font-family: 'Silkscreen', sans-serif;
  font-weight: 600;

  .title {
    letter-spacing: 1px;
    // 文字下划线
    // text-decoration: underline;
    // font-family: Rubik Doodle Shadow, cursive;
    font-family: 'Silkscreen', sans-serif;
  }

  .routers {
    a {
      color: rgb(60, 60, 60);
      font-weight: 600;

      &:hover {
        color: rgb(0, 0, 0);
      }
    }

    &:nth-child(1) {
      background-color: antiquewhite;
    }
  }

}

.open-source-container {
  height: 1000px;
  // overflow: hidden;
  overflow-x: hidden;
  // height: 100vh;
  position: relative;
  // font-family: Neue Montreal, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif;
  // font-family: 'Montserrat', sans-serif;
  font-family: 'Kalnia', serif;
}

.mask {
  background-color: #d9d9d901;
  backdrop-filter: blur(1px);
  z-index: 50;
  height: 2000px;
  top: 3%;
}

.open-source {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  // height: 2000px;
  flex-direction: column;
  margin: 0 auto;
  // 模糊

  // background: #9c9797 url("/public/shader1.png") no-repeat;
  // background-size: 100% 100%;
  .open-overlay {
    container-type: inline-size;

    .first-word {
      letter-spacing: 1px;
      color: #141414ed;
      font-size: 4cqw;
      text-align: center;
      top: -20%;
      opacity: 1;
    }

    .first-word-reverse {
      transform: rotate(180deg);
      font-size: 2cqw;
    }

    .first-word-content {
      font-size: 1.5cqw;
    }
  }

  .open-overlay-second {

    .overlay-second-mask {
      background-color: #fbfbfb6b;
    }

    .first {
      // background-color: #e2e2e2;
    }

    .second {
      background-color: #e5cffc;
    }
  }
}
</style>
