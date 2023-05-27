<template>
  <div class="main">
    <h2>main</h2>
    <h3>{{ countStore.count }} - {{ countStore.doubleCount }}</h3>
    <button @click="changeCount">count++</button>
  </div>
</template>

<script setup lang="ts">
import useCountStore from '@/stores/count'

const countStore = useCountStore()
function changeCount() {
  countStore.countPlusOneAction()
}
</script>

<style lang="less" scoped>
.main {
  color: purple;
}
</style>
