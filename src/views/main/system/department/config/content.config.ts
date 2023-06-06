const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '添加部门'
  },
  // 动态生成el-column
  propsList: [
    {
      type: 'selection',
      label: '选择',
      width: '80px'
    },
    {
      type: 'index',
      label: '序号',
      width: '80px'
    },
    {
      type: 'normal',
      prop: 'name',
      label: '部门名称',
      width: '150px'
    },
    {
      type: 'normal',
      prop: 'leader',
      label: '部门领导',
      width: '150px'
    },
    {
      type: 'normal',
      prop: 'parentId',
      label: '上级部门',
      width: '150px'
    },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },

    { type: 'handler', label: '操作', width: '150px' }
  ]
}

export default contentConfig
