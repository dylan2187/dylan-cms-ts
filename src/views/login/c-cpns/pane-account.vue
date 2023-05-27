<template>
  <div class="pane-account">
    <el-form label-width="50px" size="large" :model="userInfo">
      <el-form-item label="账号">
        <el-input v-model="userInfo.account" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userInfo.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const userInfo = ref({
  account: '',
  password: '',
})
</script>

<style lang="less" scoped>
.pane-account {
  color: purple;
}
</style>
