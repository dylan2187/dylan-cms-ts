<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <span>
        It should be noted that the content will not be aligned in center by
        default
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            新建
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(false)

// 修改dialogVisible的方法
function setDislogVisible() {
  dialogVisible.value = true
}

// 暴露属性和方法
defineExpose({ setDislogVisible })
</script>

<style lang="less" scoped>
.modal {
  color: purple;
}
</style>
