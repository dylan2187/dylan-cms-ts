<template>
  <div class="main-menu">
    <!-- logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!isFold">Dylan-CMS</h2>
    </div>
    <!-- menu -->

    <el-menu
      :default-active="defaultActive"
      :collapse="isFold"
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
    >
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon>
              <!-- 动态组件 -->
              <component :is="item.icon.split('-icon-')[1]" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subItem in item.children" :key="subItem.id">
            <el-menu-item
              :index="subItem.id + ''"
              @click="handleItemClick(subItem)"
            >
              {{ subItem.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import useLoginStore from '@/store/login/login'
import router from '@/router'
import { mapRouteToMenu } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
// 定义props接收属性
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 用户菜单的数据
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// menu item点击 路由跳转
function handleItemClick(item: any) {
  // console.log(item)
  router.push(item.url)
}

// ElMenu默认选中的菜单item
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapRouteToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
