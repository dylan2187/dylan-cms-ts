<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />

    <user-content ref="contentRef" @new-cilck="handleNewClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import UserContent from './c-cpns/user-content.vue'
import UserSearch from './c-cpns/user-search.vue'
import UserModal from './c-cpns/user-modal.vue'

const contentRef = ref<InstanceType<typeof UserContent>>()
const modalRef = ref<InstanceType<typeof UserModal>>()
// 接收userQuery事件
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 接收content中的新建用户事件
function handleNewClick(flag: boolean) {
  modalRef.value?.setDislogVisible()
}
</script>

<style lang="less" scoped>
.user {
}
</style>
