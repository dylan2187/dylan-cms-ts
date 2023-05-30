<template>
  <div class="main">
    <h2>main: {{ counterStore.counter }}-{{ counterStore.doubleCounter }}</h2>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import useCounterStore from '@/store/counter'
import { localCache } from '@/utils/cache1'

const counterStore = useCounterStore()

function changeCounter() {
  counterStore.changeCounterAction(999)
}
function logout() {
  //清除localstorge
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main {
  color: red;
}
</style>
