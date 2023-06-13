import type pageModalVue from '@/components/page-modal/page-modal.vue'
import { ref } from 'vue'
type callbackFnType = (data?: any) => void

function usePageModal(
  newCallback?: callbackFnType,
  editCallback?: callbackFnType
) {
  const modalRef = ref<InstanceType<typeof pageModalVue>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }
  function handleEditClick(itemData: any) {
    // 1.让modal显示出来
    modalRef.value?.setModalVisible(false, itemData)
    // 2.编辑的回调（用于回显，需要使用nextTick）
    if (editCallback) editCallback(itemData)
  }
  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal
