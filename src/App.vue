<template>
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const handler = () => {
  store.commit('app/setScreenWidth', window.innerWidth)
}

onMounted(() => {
  store.commit('app/setScreenWidth', window.innerWidth)
  window.addEventListener('resize', handler)
})

onUnmounted(() => {
  window.removeEventListener('resize', handler)
})
</script>

<style>
:root {
  --main-color: #4966DF; /* 主题色 */
}

body {
  background-color: #f0f2f5;
}

.m-block {
  padding: 20px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
}

.m-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.mt-sm {
  margin-top: 10px;
}

.mt-md {
  margin-top: 15px;
}

.mb-md {
  margin-bottom: 15px;
}

.mt-lg {
  margin-top: 20px;
}
</style>
