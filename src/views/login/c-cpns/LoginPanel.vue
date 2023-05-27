<template>
  <div class="login-panel">
    <h1 class="title">Dylan CMS</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch="true">
        <el-tab-pane label="账号登录">User</el-tab-pane>
        <el-tab-pane label="手机登录">Config</el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRememberPwd" label="记住密码" size="large" />
      <el-link href="http://www.baidu.com" type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" size="large">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isRememberPwd = ref(false)
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    --el-button-size: 45px;
  }
}
</style>
