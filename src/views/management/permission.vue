<!--
 * new page
 * @author: blue
 * @since: 2024-08-08
 * permission.vue
-->
<script setup lang="ts">
const inputs = ref<HTMLInputElement[]>([])

onMounted(() => {
  inputs.value = Array.from(document.querySelectorAll('input'))
})

function handleSave() {
  inputs.value.forEach(input => input.blur())
}
</script>

<template>
  <div class="container">
    <el-input v-for="(input, index) in 3" :key="index" />
    <el-button>
      save
    </el-button>
  </div>
</template>

<style scoped></style>
