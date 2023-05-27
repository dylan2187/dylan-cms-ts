<template>
  <div class="main">
    <h2>main</h2>
    <h3>{{ countStore.count }} - {{ countStore.doubleCount }}</h3>
    <button @click="changeCount">count++</button>
  </div>
</template>

<script setup lang="ts">
import useCountStore from '@/store/count'
import hyRequest from '@/service'

const countStore = useCountStore()
function changeCount() {
  countStore.countPlusOneAction()
}

hyRequest.get({ url: '/home/multidata' }).then((res) => {
  console.log(res)
})
</script>

<style lang="less" scoped>
.main {
  color: purple;
}
</style>
