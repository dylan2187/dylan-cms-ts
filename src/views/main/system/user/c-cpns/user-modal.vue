<template>
  <div class="modal">
    <el-dialog
      :title="isNewRef ? '新建用户' : '编辑用户'"
      v-model="dialogVisible"
      width="30%"
      center
    >
      <div class="form">
        <el-form
          :model="formData"
          label-width="80px"
          size="large"
          ref="formRef"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="formData.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="isNewRef">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="formData.cellphone"
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select
              v-model="formData.roleId"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select
              v-model="formData.departmentId"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'

const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const editData = ref()

//获取全部roles / departments usersList
const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

// 修改dialogVisible的方法:显示对话框
const formRef = ref()
const dialogVisible = ref(false)
const isNewRef = ref<boolean>(true)
function setDislogVisible(isNew: boolean = true, data?: any) {
  // 清除表格中的数据
  formRef.value?.resetFields()
  dialogVisible.value = true

  isNewRef.value = isNew
  if (!isNew && data) {
    for (const key in formData) {
      formData[key] = data[key]
    }
    editData.value = data
  } else {
    for (const key in formData) formData[key] = ''
    editData.value = null
  }
}

// 暴露属性和方法
defineExpose({ setDislogVisible })

const systemStore = useSystemStore()
function handleConfirmClick() {
  dialogVisible.value = false
  // 根据isNewRef来判断调用新建还是编辑的接口
  if (!isNewRef.value && editData.value) {
    // 编辑用户信息网络请求
    systemStore.editUserDataAction(editData.value.id, formData)
  } else {
    // 新建
    systemStore.newUserDataAction(formData)
  }
}
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
