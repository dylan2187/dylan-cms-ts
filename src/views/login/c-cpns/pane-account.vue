<template>
  <div class="pane-account">
    <el-form
      label-width="60px"
      size="large"
      :model="userInfo"
      :rules="accountRules"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="userInfo.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

import type { FormRules, ElForm } from 'element-plus'
import { accountLoginRequest } from '@/service/login/login'
import useLoginStore from '@/store/login/login'

// 定义数据
const userInfo = reactive({
  account: '',
  password: '',
})

// 校验规则
const accountRules = reactive<FormRules>({
  account: [
    { required: true, message: '必须输入账号信息', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{5,14}$/,
      message: '账号长度在5到14个字符之间',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: '密码长度不小于3位',
      trigger: 'blur',
    },
  ],
})

// 执行账号的登录逻辑
const loginStore = useLoginStore()
const formRef = ref<InstanceType<typeof ElForm>>()
function loginAction() {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      // 1. 获取用户输入的账号密码

      // 2. 向服务器发送网络请求（携带账号密码）
      loginStore.loginAccountAction(userInfo)
      // console.log([account, password])
    } else {
      console.log('验证失败')
      ElMessage({
        showClose: true,
        message: 'Oops, 请输入正确的格式。',
        type: 'error',
      })
    }
  })
}

defineExpose({
  loginAction,
})
</script>

<style lang="less" scoped>
.pane-account {
  color: purple;
}
</style>
