const modalConfig = {
  pageName: 'role',
  header: {
    titleNew: '新建角色',
    titleEdit: '编辑角色'
  },
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称',
      initialValue: '默认角色'
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'custom',
      label: '选择权限',
      slotName: 'menuList'
    }
  ]
}

export default modalConfig
