<template>
  <div class="crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { mapRouteToBreadcrumbs } from '@/utils/map-menus'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

//思路 根据路径来匹配路由
const route = useRoute()
// watch(route, (newValue) => {
//   route.value = newValue
// })
const userMenus = useLoginStore().userMenus
const breadcrumbs = computed(() => {
  return mapRouteToBreadcrumbs(route.path, userMenus)
})
// 有一个问题：就是页面跳转的时候，此route并不会改变，因为只在setup时加载了一次，
// 所以要使用watch监听route的变化，或者使用计算属性得到breadcrumbs。计算属性里依赖的东西发生改变时，会重新获取新的值
</script>

<style lang="less" scoped>
.crumb {
  color: purple;
}
</style>
