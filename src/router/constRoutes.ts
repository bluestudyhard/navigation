const constantRoute = [

  {
    path: '/management/showdata',
    component: () => import('../views/management/showdata.vue'),
    name: '数据展示',
    meta: {
      title: '数据展示',
    },
  },
  {
    path: '/management',
    name: '网站管理',
    children: [
      {
        path: '/management/webside',
        component: () => import('../views/management/manage/webside.vue'),
        name: '数据管理',
        meta: {
          title: '数据管理',
        },
      },
      {
        path: '/management/audit',
        component: () => import('../views/management/manage/audit.vue'),
        name: '审核',
        meta: {
          title: '审核',
        },
      },
    ],
  },
  {
    path: '/management/permission',
    component: () => import('../views/management/permission.vue'),
    name: '权限管理',
    meta: {
      title: '权限管理',
      audit: true, // 是否通过验证
    },
  },

]

export default constantRoute
