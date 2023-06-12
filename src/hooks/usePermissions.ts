import useLoginStore from '@/store/login/login'

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore
  const res = permissions.find((item) => item.includes(permissionID))
  return !!res
}

export default usePermissions
