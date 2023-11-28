<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, reactive, ref } from 'vue'

import { useMouseInElement } from '@vueuse/core'

const target = ref(null)
const mouse = reactive(useMouseInElement(target))
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const ball = ref() as Ref<HTMLElement>
const cube = ref() as Ref<HTMLElement>
const gameSquare = ref() as Ref<HTMLElement>

const cubePosition = ref({ x: 0, y: 0 })
const angle = ref(0)
const distance = ref(0)
const cubDistance = ref({ x: 0, y: 0 })
const power = ref(0) // 摇杆力度
function handleMouseDown() {
  isDragging.value = true
}
function handleMouseUp() {
  isDragging.value = false
}

// 我们先思考一下球和杆移动所需要的一些条件
/**
 * 首先，球移动x和y的距离，这里可以用mouse.elementX和
 */
const center = 64
function initCube() {
  const gameSquareWidth = gameSquare.value!.clientWidth
  const gameSquareHeight = gameSquare.value!.clientHeight
  cubePosition.value.x = gameSquareWidth / 2
  cubePosition.value.y = gameSquareHeight / 2
  cube.value.style.left = `${cubePosition.value.x}px`
  cube.value.style.top = `${cubePosition.value.y}px`
  console.log(cubePosition.value.x, cubePosition.value.y)
}

function handleCube(x: number, y: number) {
  cubDistance.value.x = cubePosition.value.x + x
  cubDistance.value.y = cubePosition.value.y + y
  // console.log('方块移动距离x轴', cubDistance.value.x, '方块移动距离y轴', cubDistance.value.y)
  cubePosition.value.x += x / 50
  cubePosition.value.y += y / 50
  console.log('方块移动距离x轴', cubePosition.value.x, '方块移动距离y轴', cubePosition.value.y)
  handleCubeBorder()
}

function handleCubeBorder() {
  const { left: gameSquareLeft, top: gameSquareTop } = gameSquare.value?.getBoundingClientRect()
  const gameSquareRight = gameSquareLeft + gameSquare.value?.offsetWidth
  const gameSquareBottom = gameSquareTop + gameSquare.value?.offsetHeight
  const { left: cubeLeft, top: cubeTop } = cube.value?.getBoundingClientRect()
  const cubeRight = cubeLeft + cube.value?.offsetWidth
  const cubeBottom = cubeTop + cube.value?.offsetHeight

  // 如果方块超出了 gameSquare 的边界，则让方块的位置固定在边界不能超过
  const isCollidingLeft = cubeLeft <= gameSquareLeft
  const isCollidingRight = cubeRight >= gameSquareRight
  const isCollidingTop = cubeTop <= gameSquareTop
  const isCollidingBottom = cubeBottom >= gameSquareBottom

  cube.value.style.left = `${cubePosition.value.x}px`
  cube.value.style.top = `${cubePosition.value.y}px`

  // 修正方块的位置
  if (isCollidingLeft)
    cubePosition.value.x = 0

  else if (isCollidingRight)
    cubePosition.value.x = gameSquareRight - gameSquare.value?.offsetWidth / 1.89

  if (isCollidingTop)
    cubePosition.value.y = 0

  else if (isCollidingBottom)
    cubePosition.value.y = gameSquareBottom - gameSquare.value?.offsetHeight / 2
}

function handleMouseMove() {
  if (!isDragging.value) {
    position.value.x = mouse.elementWidth / 2
    position.value.y = mouse.elementHeight / 2
    ball.value.style.left = `${position.value.x}px`
    ball.value.style.top = `${position.value.y}px`
    distance.value = 0
    return
  }
  // 摇杆力度

  angle.value = Math.atan2((mouse.elementY - center), (mouse.elementX - center))
  distance.value = Math.sqrt((mouse.elementX - center) ** 2 + (mouse.elementY - center) ** 2)
  power.value = distance.value / center
  position.value.x = mouse.elementX
  position.value.y = mouse.elementY
  ball.value.style.left = `${position.value.x}px`
  ball.value.style.top = `${position.value.y}px`

  if (distance.value >= center) {
    ball.value.style.left = `${center + Math.cos(angle.value) * center}px`
    ball.value.style.top = `${center + Math.sin(angle.value) * center}px`
    distance.value = center
  }
  const moveVectorX = Math.cos(angle.value) * distance.value * (power.value * 10)
  const moveVectorY = Math.sin(angle.value) * distance.value * (power.value * 10)
  handleCube(moveVectorX, moveVectorY)
}

onMounted(() => {
  initCube()
})
</script>

<template>
  <!-- <el-backtop></el-backtop>一定要写于最外层块级区域的第一行，不可写于代码末尾。 -->
  <div class="el-mode-container">
    <el-backtop :bottom="10" :right="10" visibility-height="100" />
    <div>
      <el-container class="el-main-container">
        <el-container>
          <el-header class="header">
            <!-- <h1>sea blue navigation</h1> -->
            1
          </el-header>
          <el-main class="main">
            <div ref="gameSquare" class="game-area">
              <p>Game start</p>
              {{ mouse }}
              <p>angle: {{ angle / (3.14159 / 180) - 90 }}</p>
              <p>distance:{{ distance }}</p>

              <div ref="cube" class="moving-cube" />
            </div>
          </el-main>
        </el-container>
        <div class="game-controllers">
          <!-- {{ mouse }} -->
          <button class="game-select1">
            A
          </button>
          <button class="game-select2">
            B
          </button>
          <div class="joystick-base">
            <div
              class="joystick-outline" @mousemove="handleMouseMove" @mousedown="handleMouseDown"
              @mouseup="handleMouseUp"
            >
              <div ref="target" class="joystick">
                <!-- 球 -->
                <div ref="ball" class="ball" />
                <div
                  class="stick"
                  :style="{ height: `${distance}px`, transform: `rotate(${angle / (3.14159 / 180) - 90}deg) translateY(50%)` }"
                />
                <div class="stick-base" />
              </div>
            </div>
          </div>
        </div>
      </el-container>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-mode-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  //   @include get-background-image("main-background-image");
  background-color: #d1cfdd;
  background: url("../../../public/mode.webp") no-repeat;
  backdrop-filter: blur(10px);
  background-blend-mode: color-burn;
}

.el-main-container {
  width: 76rem;
  height: 38rem;
  margin: 0 auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  //   @include get-background-color("main-background-color");
  transition: background-color 1s, color .6s;
  // background: linear-gradient(90deg, #EAF2E7 0.65%, rgba(163, 199, 231, 0.847) 102.06%);
  background: var(--neumorphism_BG1, #E2E5EC);
  backdrop-filter: blur(5px);

  .header {
    position: relative;
    display: flex;
    // background-color: #fcfcfc;
    height: 1rem;
    border-bottom: 1px solid #ceccccab;

  }

  user-select: none;

  .main {

    // overflow: initial;
    height: 100%;
    width: 100%;
    // @include get-font-color("text-title-color");
    display: flex;
    justify-content: center;
    align-items: start;
    position: relative;
    .game-area {
      border-radius: 2.5rem;
      display: flex;
      justify-content: center;
      background: var(--1, linear-gradient(138deg, rgba(203, 206, 212, 0.00) 8.52%, #F2F5FD 115.38%));
      width: 70%;
      position: relative;
      height: 23rem;
      /* 拟态阴影模板 */
      // box-shadow: -4px -9px 20px 0px rgba(231, 233, 237, 0.9), 7px 5px 12px 0px rgba(214, 220, 233, 0.43), 7px 4px 8px 0px rgba(134, 137, 143, 0.25);
      box-shadow: -12px -9px 10px 0px rgba(231, 233, 237, 0.9), 4px 5px 5px 0px rgba(214, 220, 233, 0.43), 3px 5px 10px 0px rgba(116, 119, 125, 0.25);

      flex-shrink: 0;
      color: #000;
      text-align: center;
      font-family: Source Serif Pro;
      font-size: 1rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;

      .moving-cube {
        width: 5rem;
        height: 5rem;
        background-color: #7172720c;
        backdrop-filter: blur(7px);
        position: absolute;
        transition: all .1s;
      }
    }
  }

}

.game-controllers {
  height: 6rem;
  width: 100%;
  // background-color: #fff;
  position: relative;

  .game-select1 {
    transition: all 0.3s;
    width: 3.7rem;
    height: 3.7rem;
    flex-shrink: 0;
    border-radius: 50%;
    outline: none;
    background: linear-gradient(138deg, #F2F5FD 8.52%, rgba(203, 206, 212, 0.00) 115.38%);
    // 去除button原本的样式
    border: none;

    box-shadow: -4px -9px 20px 0px rgba(231, 233, 237, 0.9), 7px 5px 12px 0px rgba(214, 220, 233, 0.43), 7px 4px 8px 0px rgba(134, 137, 143, 0.25);
    position: absolute;
    right: 20%;

    // focus和hover一起
    &:hover,
    &:focus {
      box-shadow: -8px -7px 14px 0px rgba(255, 255, 255, 0.655), -6px -1px 10px 0px rgba(214, 220, 233, 0.43), 5px 3px 7px 0px rgba(134, 137, 143, 0.25);
      background: var(--1, linear-gradient(138deg, rgba(203, 206, 212, 0.011) 8.52%, #ebeef5 115.38%));
    }
  }

  .game-select2 {
    transition: all 0.3s ease-in-out;
    width: 3.7rem;
    height: 3.7rem;
    flex-shrink: 0;
    border-radius: 50%;
    outline: none;
    background: linear-gradient(138deg, #F2F5FD 8.52%, rgba(203, 206, 212, 0.00) 115.38%);
    // 去除button原本的样式
    border: none;

    box-shadow: -4px -9px 20px 0px rgba(231, 233, 237, 0.9), 7px 5px 12px 0px rgba(214, 220, 233, 0.43), 7px 4px 8px 0px rgba(134, 137, 143, 0.25);
    position: absolute;
    right: 10%;

    // focus和hover一起
    &:hover,
    &:focus {
      box-shadow: -8px -7px 14px 0px rgba(255, 255, 255, 0.655), -6px -1px 10px 0px rgba(214, 220, 233, 0.43), 5px 3px 7px 0px rgba(134, 137, 143, 0.25);
      background: var(--1, linear-gradient(138deg, rgba(203, 206, 212, 0.011) 8.52%, #ebeef5 115.38%));
    }

  }

  .joystick-base {
    width: 15rem;
    height: 15rem;
    background-color: transparent;
    position: relative;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    bottom: 7rem;
    left: .3rem;

    .joystick-outline {
      width: 14rem;
      height: 14rem;
      // background: #d578786c;

      border-radius: 50%;
      // bottom: 2rem;
      // left: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      position: absolute;
    }

    .joystick {
      width: 8rem;
      height: 8rem;
      background: #bab9b96c;

      border-radius: 50%;
      // bottom: 2rem;
      // left: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      position: absolute;

      .ball {
        width: 2rem;
        height: 2rem;
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(138deg, #F2F5FD 8.52%, rgba(203, 206, 212, 0.00) 115.38%);
        box-shadow: -4px -9px 20px 0px rgba(231, 233, 237, 0.9), 7px 5px 12px 0px rgba(214, 220, 233, 0.43), 7px 4px 8px 0px rgba(134, 137, 143, 0.25);
        position: absolute;
        right: 20%;

        // focus和hover一起
        &:hover,
        &:focus {
          box-shadow: -8px -7px 14px 0px rgba(255, 255, 255, 0.655), -6px -1px 10px 0px rgba(214, 220, 233, 0.43), 5px 3px 7px 0px rgba(134, 137, 143, 0.25);
          background: var(--1, linear-gradient(138deg, rgba(203, 206, 212, 0.011) 8.52%, #ebeef5 115.38%));
        }

        left: 50%;
        top: 50%;
        transition: left 0.2s ease-in-out top 0.2s ease-in-out;
        transform: translate(-50%, -50%);
        z-index: 10;
      }

      .stick {
        width: 1rem;
        // height: 1rem;
        background: #ffffff60;
        position: absolute;
        // 从圆心开始旋转，所以要减去自身的一半
        // transform: translate(-100%);
        // transform: translateX(-50%);
        // transform-origin: 50% 0%;
        border-radius: 0.5rem;
        transition: height 0.1s ease-out;
        z-index: 1;
      }

      .stick-base {
        width: 2rem;
        height: 2rem;
        background: rgba(17, 18, 18, 0);
        position: absolute;
        // transform: rotate(45deg);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        border-radius: 50%;
      }
    }
  }

}
</style>
