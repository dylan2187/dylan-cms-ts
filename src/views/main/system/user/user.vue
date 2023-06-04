<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></user-search>
    <user-content ref="contentRef"></user-content>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import UserContent from './c-cpns/user-content.vue'
import UserSearch from './c-cpns/user-search.vue'

const contentRef = ref()
// 接收userQuery事件
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
</script>

<style lang="less" scoped>
.user {
}
</style>
