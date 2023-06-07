import type pageModalVue from '@/components/page-modal/page-modal.vue'
import { ref } from 'vue'

function usePageModal() {
  const modalRef = ref<InstanceType<typeof pageModalVue>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
  }
  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal
