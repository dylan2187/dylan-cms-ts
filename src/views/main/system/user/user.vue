<template>
  <div class="user">
    <user-search></user-search>
    <user-content></user-content>
  </div>
</template>

<script setup lang="ts">
import UserContent from './c-cpns/user-content.vue'
import UserSearch from './c-cpns/user-search.vue'
</script>

<style lang="less" scoped>
.user {
}
</style>
