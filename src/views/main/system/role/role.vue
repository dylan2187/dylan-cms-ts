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
        <el-tree-select
          ref="treeRef"
          multiple
          v-model="value"
          :data="entireMenus"
          show-checkbox
          highlight-current
          node-key="id"
          :props="defaultProps"
          style="width: 100%"
          @check="handleTreeCheck"
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
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { ElTreeSelect } from 'element-plus'

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
function handleTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  console.table(menuList)
  otherInfo.value = { menuList }
}

const treeRef = ref<InstanceType<typeof ElTreeSelect>>()
</script>

<style lang="less" scoped></style>
