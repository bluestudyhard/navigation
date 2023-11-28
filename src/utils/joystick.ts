// function initCube() {
//     const gameSquareWidth = gameSquare.value?.clientWidth
//     const gameSquareHeight = gameSquare.value?.clientHeight
//     cubePosition.value.x = gameSquareWidth / 2
//     cubePosition.value.y = gameSquareHeight / 2
//     cube.value.style.left = `${cubePosition.value.x}px`
//     cube.value.style.top = `${cubePosition.value.y}px`
//     console.log(cubePosition.value.x, cubePosition.value.y)
//   }

//   function handleCube(x: number, y: number) {
//     cubDistance.value.x = cubePosition.value.x + x
//     cubDistance.value.y = cubePosition.value.y + y
//     // console.log('方块移动距离x轴', cubDistance.value.x, '方块移动距离y轴', cubDistance.value.y)
//     cubePosition.value.x += x / 20
//     cubePosition.value.y += y / 20
//     handleCubeBorder()
//   }
//   // 判断边界碰撞逻辑
//   function handleCubeBorder() {
//     // 计算出gameSquare的左右边界
//     const { left: gameSquareLeft, top: gameSquareTop } = gameSquare.value?.getBoundingClientRect()
//     const gameSquareRight = gameSquareLeft + gameSquare.value?.offsetWidth
//     const gameSquareBottom = gameSquareTop + gameSquare.value?.offsetHeight
//     const { left: cubeLeft, top: cubeTop } = cube.value?.getBoundingClientRect()
//     const cubeRight = cubeLeft + cube.value?.offsetWidth
//     const cubeBottom = cubeTop + cube.value?.offsetHeight
//     console.log('方块的位置', cubeLeft, cubeRight, cubeTop, cubeBottom)
//     console.log('四个边界', gameSquareLeft, gameSquareRight, gameSquareTop, gameSquareBottom)
//     console.log(cube.value?.style.left, cube.value?.style.top)
//     // 如果方块超出了 gameSquare 的边界，则让方块的位置固定在边界不能超过
//     // 判断方块是否超出边界
//     const isCollidingLeft = cubeLeft <= gameSquareLeft
//     const isCollidingRight = cubeRight >= gameSquareRight
//     const isCollidingTop = cubeTop <= gameSquareTop
//     const isCollidingBottom = cubeBottom >= gameSquareBottom
//     cube.value.style.left = `${cubePosition.value.x}px`
//     cube.value.style.top = `${cubePosition.value.y}px`
//     // 修正方块的位置
//     if (isCollidingLeft)
//       cubePosition.value.x = 0

//     if (isCollidingRight)
//       cubePosition.value.x = gameSquareRight - gameSquare.value?.offsetWidth / 1.89

//     if (isCollidingTop)
//       cubePosition.value.y = 0

//     if (isCollidingBottom)
//       cubePosition.value.y = gameSquareBottom - gameSquare.value?.offsetHeight / 2
//   }
//   function handleMouseMove() {
//     if (isDragging.value) {
//       // 摇杆旋转的角度
//       angle.value = Math.atan2((mouse.elementY - center), (mouse.elementX - center))
//       distance.value = Math.sqrt((mouse.elementX - center) * (mouse.elementX - center) + (mouse.elementY - center) * (mouse.elementY - center))
//       position.value.x = mouse.elementX
//       position.value.y = mouse.elementY
//       ball.value.style.left = `${position.value.x}px`
//       ball.value.style.top = `${position.value.y}px`
//       // 如果distance超过半径
//       if (distance.value >= center) {
//         // 那么就让球的位置固定在半径上
//         ball.value.style.left = `${center + Math.cos(angle.value) * center}px`
//         ball.value.style.top = `${center + Math.sin(angle.value) * center}px`
//         // 杆的长度就是半径
//         distance.value = center
//       }

//       // 计算cube的移动距离，先获取初始cube的x和y的坐标，然后计算cubeDistance，然后distancex+=x移动的距离和初始x的距离，distancey+=y移动的距离和初始y的距离
//       // 然后判断distance是否超过gameSquare的宽度和高度，如果超过就让distance等于gameSquare的宽度和高度
//       // 然后让cube的位置等于distance
//       handleCube(mouse.elementX - center, mouse.elementY - center)
//     }
//     // 松手就回到中心
//     else {
//       position.value.x = mouse.elementWidth / 2
//       position.value.y = mouse.elementHeight / 2
//       ball.value.style.left = `${position.value.x}px`
//       ball.value.style.top = `${position.value.y}px`
//       distance.value = 0
//     }
//     // 鼠标控制stick移动，cube跟随移动
//     // cube 不能超过gameSquare的范围
//   }
//   onMounted(() => {
//     initCube()
//   })
