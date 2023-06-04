<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button
        type="primary"
        size="large"
        icon="CirclePlus"
        @click="handleNewUserClick"
        >新建用户</el-button
      >
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />

        <el-table-column
          align="center"
          label="用户名"
          prop="name"
          width="150px"
        />
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="150px"
        />
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="150px"
        />
        <!-- 使用作用域插槽展示状态 -->
        <el-table-column
          align="center"
          label="状态"
          prop="enable"
          width="100px"
        >
          <template #default="scope">
            <el-button
              size="small"
              plain
              :type="scope.row.enable ? 'success' : 'danger'"
              >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            <el-icon><timer /></el-icon>
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            <el-icon><timer /></el-icon>
            {{ formatUTC(scope.row.updateAt) }}</template
          >
        </el-table-column>

        <el-table-column align="center" label="操作" width="200px">
          <template #default="scope">
            <el-button size="small" icon="Edit" type="primary" text>
              编辑
            </el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        small="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import type { IUser } from '@/types/index'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { formatUTC } from '@/utils/format'
// 自定义事件
const emit = defineEmits(['newCilck'])

// 1. 发起system中的action，请求userList的数据
const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
fetchUserListData()

// 2. 获取userList的数据并展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 4. 定义函数，用于发送网络请求

function fetchUserListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size, offset }
  // 合并用户查询表单与页码数据
  const queryInfo = Object.assign(formData, info)

  systemStore.postUsersListAction(queryInfo)
}

// 将发送网络请求的方法暴露给user
defineExpose({
  fetchUserListData
})

// 删除和编辑的操作
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserAction(id)
}

// 新建用户的逻辑
function handleNewUserClick() {
  emit('newCilck', true)
}

function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
