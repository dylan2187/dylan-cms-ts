<template>
  <div class="common-layout">
    <el-container class="main-content">
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <div class="main">
            <h2>
              main: {{ counterStore.counter }}-{{ counterStore.doubleCounter }}
            </h2>
            <button @click="logout">退出登录</button>
          </div>
        </el-main>
      </el-container>
    </el-container>
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
.common-layout {
  height: 100%;
  .main-content {
    height: 100%;
    .el-aside {
      background-color: greenyellow;
    }
    .el-header {
      background-color: aquamarine;
    }
    .el-main {
      background-color: olivedrab;
    }
  }
}
</style>
