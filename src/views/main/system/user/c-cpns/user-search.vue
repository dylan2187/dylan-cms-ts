<template>
  <!-- 1. 输入搜索关键字的表单 -->
  <div class="search">
    <el-form size="large" label-width="80px" ref="formRef" :model="searchForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              placeholder="请输入查询的用户名"
              v-model="searchForm.name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              placeholder="请输入查询的真实姓名"
              v-model="searchForm.realname"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号" prop="cellphone">
            <el-input
              placeholder="请输入查询的手机号"
              v-model="searchForm.cellphone"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 多出的col自动另起一行 -->
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              placeholder="请选择查询的状态"
              style="width: 100%"
              v-model="searchForm.enable"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 2. 重置和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" size="large" @click="handleResetClick"
        >重置
      </el-button>
      <el-button
        type="primary"
        icon="Search"
        size="large"
        @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: []
})

// 重置表单操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}

// 表单查询操作
// 思路：user-search和user-content是兄弟组件，将查询的事件发送到父组件user，
// 把user-content发送网络请求的方法暴露给user，通过user调用
const emit = defineEmits(['queryClick', 'resetClick'])
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  :deep(.el-form-item) {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
