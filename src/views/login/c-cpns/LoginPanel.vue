<template>
  <div class="login-panel">
    <h1 class="title">Dylan CMS</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="tabStatus">
        <!-- 账号登录的pane -->
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <div class="text">账号登录</div>
            </div>
          </template>
          <pane-account></pane-account>
        </el-tab-pane>
        <!-- 手机登录的pane -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <div class="text">手机登录</div>
            </div>
          </template>
          <div>mobile login</div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRememberPwd" label="记住密码" size="large" />
      <el-link href="http://www.baidu.com" type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" size="large" @click="printTabStatus"
      >立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PaneAccount from './pane-account.vue'

const isRememberPwd = ref(false)
const tabStatus = ref<string>('account')

function printTabStatus() {
  if (tabStatus.value == 'account') console.log('账号登录')
  else console.log('手机登录')
}
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
      margin-left: 8px;
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
