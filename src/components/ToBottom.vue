<!--
 * new page
 * @author: blue
 * @since: 2023-12-16
 * ToBottom.vue
-->
<script setup lang="ts"></script>

<template>
  <button class="button">
    <svg class="svgIcon " viewBox="0 0 384 512">
      <path
        d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
      />
    </svg>
  </button>
</template>

<style scoped>
.button {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgb(19, 40, 101);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 4px rgba(43, 55, 88, 0.253);
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: relative;
  animation: breathe 2s ease-in-out infinite ;
}

.svgIcon {
  width: 12px;
  transition-duration: 0.3s;
  transform: rotate(180deg);
  animation: moveIcon 3s ease-in-out infinite ;
}

.svgIcon path {
  fill: white;
}

.button:hover .svgIcon {
  /* width: 20px; */
  transition-duration: 0.3s;
  transform: translateY(50%) rotate(180deg);

}

@keyframes breathe {
  0% {
    box-shadow: 0 0 0 0 rgba(19, 40, 101, 0.7);
  }

  40% {
    box-shadow: 0 0 0 10px rgba(19, 40, 101, 0);
  }

  60% {
    box-shadow: 0 0 0 10px rgba(19, 40, 101, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(19, 40, 101, 0);
  }

}
@keyframes moveIcon {
  0%{
    transform: translateY(0%) rotate(180deg);
  }
  50%{
    transform: translateY(30%) rotate(180deg);
  }
  100%{
    transform: translateY(0%) rotate(180deg);
  }
}
</style>
