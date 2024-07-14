<!--
 * new page
 * @author: blue
 * @since: 2024-06-02
 * TestCom.vue
-->
<script setup lang="ts">
import { ref } from 'vue'
import secondInput from './secondInput.vue'

const show = ref(false)
</script>

<template>
  <div class="container">
    <secondInput v-model="show">
      <template #title>
        <h1>title</h1>
      </template>
      <template #footer>
        <h1>footer</h1>
      </template>
    </secondInput>
    <button @click="show = !show">
      click
    </button>
  </div>
</template>

<style scoped></style>
