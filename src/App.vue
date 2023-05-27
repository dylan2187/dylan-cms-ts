<template>
  <div class="app">
    <h2>app</h2>
    <router-link to="/main">mian</router-link>
    <router-link to="/login">login</router-link>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
  background-color: skyblue;
}
</style>
