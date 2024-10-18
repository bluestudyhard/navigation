<!--
 * new page
 * @author: blue
 * @since: 2024-10-16
 * Size.vue
-->
<script setup lang="ts"></script>

<template>
  <div class="container ">
    <div class="size-btns w-full flex flex-wrap">
      <el-button>
        mini
      </el-button>
      <el-button>
        small
      </el-button>
      <el-button>default</el-button>
      <el-button>
        medium
      </el-button>
      <el-button>
        large
      </el-button>
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
