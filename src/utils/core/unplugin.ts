// 创建 Context 对象，用于后续 钩子函数使用
// 调用 transform 钩子对 渲染函数code 进行转换并返回
// 调用 configResolved 钩子，用于更新按需导入组件对象信息
// 调用 configureServer 钩子，对指定文件夹进行监听如：新增或删除

export default createUnplugin(() => {
  const filter = createFilter(
    options.include || [/\.vue$/, /\.vue\?vue/, /\.vue\?v=/],
    options.exclude || [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
  )
  const ctx = new Context()
  return {
    name: 'unplugin-vue-components',
    async transform(code, id) {
      if (!id.endsWith('.vue'))
        return null
      try {
        // todo
      }
      catch (e) {
        console.log(e)
      }
    },
    vite: {
      configResolved(config) {},

    },
    configServer: {
      // todo 观察项目所有目录的变化
    },
  }
})
