<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal
      ref="modalRef"
      :modal-config="modalConfig"
      :other-info="otherInfo"
    >
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'
import useMainStore from '@/store/main/main'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewClick, handleEditClick } = usePageModal(
  newCallback,
  editCallback
)
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { ElTree, ElTreeSelect } from 'element-plus'
import useSystemStore from '@/store/main/system/system'
import { mapMenuListToIds } from '@/utils/map-menus'

const value = ref()

const defaultProps = {
  children: 'children',
  label: 'name'
}

//获取完整的菜单列表
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

//获取到el-tree-select选中的key，需要把这个数组传递到page-modal的formData里一块提交
const otherInfo = ref({})
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
const treeRef = ref<InstanceType<typeof ElTree>>()

const systemStore = useSystemStore()
const { menuIds } = storeToRefs(systemStore)
// nextTick(() => {
//   treeRef.value?.setCheckedKeys([15])
// })

function editCallback(itemData: any) {
  // console.log('treeRef.value1:', treeRef.value)  //此时page-modal还未被挂载，所以treeRef是不存在的
  nextTick(() => {
    // const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds.value)
  })
}
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}

// function handleNewClick() {
//   // 1. 显示modal
//   modalRef.value?.setModalVisible()
//   // 2. 清空树形控件
//   nextTick(() => {
//     treeRef.value?.setCheckedKeys([])
//   })
// }
</script>

<style lang="less" scoped></style>
