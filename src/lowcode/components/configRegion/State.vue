<!--
 * new page
 * @author: blue
 * @since: 2024-10-16
 * State.vue
-->
<script setup lang="ts"></script>

<template>
  <div class="container  w-full ">
    <div class="state-btns w-full flex flex-wrap gap-0">
      <el-button>error</el-button>
      <el-button>warning</el-button>
      <el-button>success</el-button>
      <el-button>loading</el-button>
      <el-button>default</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
::v-deep{
 &.el-button{
    margin: 0;
  }
}
</style>
